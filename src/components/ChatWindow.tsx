import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { 
  Speaker, 
  type ActiveEvent, 
  type DialogueChoice, 
  type DialogueImage, 
  type DialogueMessage, 
  type DialogueNode 
} from "../types/dialogue";
import type { Character } from "../types/character";

type Props = {

  history: DialogueMessage[];
  
  current: DialogueNode | null;

  next(): void;

  isTyping: boolean;

  activeEvent: ActiveEvent | null;

  openActiveEvent(): void;

  choices: DialogueChoice[] | null;

  selectChoice(index: number): void;

  openImage(image: DialogueImage): void;

  npc: Character;

  user: Character;

  title: string;

};

export default function ChatWindow({

  history,

  current,

  next,

  isTyping,

  activeEvent,

  openActiveEvent,

  choices,

  selectChoice,

  openImage,
  
  npc,

  user,
  
  title

}: Props) {

  const [input, setInput] = useState("");

  const [typingDots, setTypingDots] = useState(".");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isWaitingForUser = 
    current?.type === "MESSAGE" &&
    current.speaker === Speaker.User;

  const isWaitingChoice = 
    current?.type === "CHOICE";

  const targetText = 
    isWaitingForUser 
      ? current.text
      : "";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    
    e.preventDefault();

    if (isTyping || !isWaitingForUser || isWaitingChoice) return;

    if (e.key === "Enter") {

      if (input !== targetText) return;
      
      next();

      setInput("");

      return;

    }

    if (e.key.length !== 1) return;

    setInput(prev => 

      targetText.slice(0, prev.length + 1)

    );

  } 

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  }, [history, isTyping, activeEvent]);

  useEffect(() => {

    if (!isTyping) {

      setTypingDots(".");

      return;

    }

    const interval = setInterval(() => {

      setTypingDots((prev) => (prev.length >= 3 ? "." : prev + "."));

    }, 500);

    return () => clearInterval(interval);

  }, [isTyping]); 

  return (

    <div className="flex flex-col h-full w-full bg-[#313338] text-white">

      <div className="p-3 pl-5 bg-[#1e1f22]">{title}</div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">

        {history.map(message => (

          <Message
            key={message.id}
            avatar={message.speaker === Speaker.Bot ? npc.avatar : user.avatar}
            name={message.speaker === Speaker.Bot ? npc.name : user.name}
            text={message.text}
            image={message.image}
            openImage={openImage}
          />

        ))}

        {activeEvent && (

          <Message
            avatar={npc.avatar}
            name={npc.name}
            text="Ожидается выполнение события."
            action={{

              text: "Открыть загадку",

              onclick: openActiveEvent

            }}
          />

        )}

        {isTyping && (

          <Message
            avatar={npc.avatar}
            name={npc.name}
            text={`печатает${typingDots}`}
          />

        )}

        <div ref={messagesEndRef} />

      </div>

      <div className="p-4 border-t-3 border-[#2b2d31]">

        <input
          value={input}
          onKeyDown={handleKeyDown}
          placeholder={
            isWaitingChoice 
              ? "Выберите вариант" 
              : isWaitingForUser 
                ? "Напишите сообщение..." 
                : "Ожидание"
          }
          className="w-full p-3 rounded bg-[#1e1f22] text-white outline-none"
          maxLength={4000}
        />

        {choices && (

          <div className="mt-3 flex flex-col gap-2">

            {choices.map((choice, index) => (


              <button
                key={index}
                onClick={() => selectChoice(index)}
                className="rounded bg-[#404249] hover:bg-[#50535c] p-3 text-left"
              >

                {index + 1}. {choice.text}
                
              </button>

            ))}
            
          </div>

        )}

      </div>

    </div>

  );

}