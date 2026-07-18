import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { DialogueContext } from "./DialogueContext";
import { DialogueEngine } from "./DialogueEngine";
import { DialogueCampaign } from "../scenario/campaign";
import { 
    type ActiveEvent,
    DialogueNodeType, 
    Emotion, 
    Speaker, 
    type DialogueMessage, 
    type DialogueChoice 
} from "../types/dialogue";

import { clearDialogue, loadDialogue, saveDialogue } from "../utils/storage";
import { FlagStore } from "../scenario/flags";
import { puzzles } from "../scenario/puzzles";

const campaign = new DialogueCampaign();
const flags = new FlagStore();

// Измените версию сохранения, чтобы удалить все сохраненные данные
const SAVE_VERSION = 1;

export function DialogueProvider({

    children

}:{

    children: ReactNode

}){

    const engine = useMemo(
        () => new DialogueEngine(campaign.first()),
        []
    );

    const saveState = useMemo(() => {
        
        const data = loadDialogue();

        if (!data) {

            return {
            
                save: null,

                reset: true
                
            };

        }

        const scenario = campaign.get(data.scenarioId);

        if (!scenario) {

            clearDialogue();

            return {
            
                save: null,

                reset: true
                
            };

        }

        if (data.version !== SAVE_VERSION) {

            clearDialogue();

            return {
            
                save: null,

                reset: true
                
            };

        }

        return {
            
            save: data,

            reset: false

        };
        
    }, []);

    const save = saveState.save;

    useEffect(() => {

        if (saveState.reset) {

            reset();

            window.location.reload();

        }

    }, [engine, saveState.reset]);

    useEffect(() => {

        if (!save) return;

        engine.loadScenario(

            campaign.get(save.scenarioId) ?? campaign.first()

        );

        engine.jump(save.nodeId);

        if (save.flags) {

            flags.load(save.flags);

        }

        setHistory(prev => [...prev]);

        execute();

    }, [engine, saveState.reset]);

    const [isTyping, setIsTyping] = useState(false);

    const [history, setHistory] = useState<DialogueMessage[]>(

        save?.history ?? []

    );

    const [currentEmotion, setCurrentEmotion] = useState<Emotion>(
        
        save?.currentEmotion ?? Emotion.Neutral
    
    );

    const [activeEvent, setActiveEvent] = useState<ActiveEvent | null>(
        
        save?.activeEvent ?? null
        
    );

    const [isEventOpened, setIsEventOpened] = useState(false);

    const [choices, setChoices] = useState<DialogueChoice[] | null>(
        
        save?.choices ?? null
        
    );

    const execute = useCallback(() => {

        while (engine.hasNext()) {

            const node = engine.current();

            if (!node) return;

            switch (node.type) {

                case DialogueNodeType.Message: {

                    const message = node as DialogueMessage;

                    if (message.speaker === Speaker.User) {

                        setIsTyping(false);

                        return;

                    }   

                    engine.next();

                    setIsTyping(true);

                    setTimeout(() => {

                        if (message.emotion) setCurrentEmotion(message.emotion);

                        setHistory(prev => [

                            ...prev,

                            message

                        ]);

                        execute();

                    }, message.delay ?? 2500);

                    return;

                }

                case DialogueNodeType.Puzzle: {

                    setIsTyping(false);

                    engine.next();

                    engine.pause();

                    const event: ActiveEvent = {

                        type: "Puzzle",

                        id: node.puzzleId,

                        title: puzzles[node.puzzleId].title

                    };

                    setActiveEvent(event);

                    setIsEventOpened(true);

                    return;

                }

                case DialogueNodeType.Pause: {

                    setIsTyping(false);

                    engine.pause();

                    setTimeout(() => {

                        engine.resume();

                        engine.next();

                        execute();

                    }, node.delay)

                    return;

                }

                case DialogueNodeType.WaitFlag: {

                    if (flags.has(node.flag)) {

                        engine.next();

                        execute();

                    }
                    else {

                        setIsTyping(false);

                        engine.pause();

                    }

                    return;

                }

                case DialogueNodeType.SetFlag: {

                    setIsTyping(false);

                    flags.set(

                        node.flag,

                        node.value

                    );

                    engine.next();

                    continue;

                }

                case DialogueNodeType.JumpScenario: {

                    setIsTyping(false);

                    campaign.set(node.scenario);

                    setHistory([]);

                    engine.loadScenario(campaign.current());

                    execute();

                    return;

                }

                case DialogueNodeType.Choice: {

                    setIsTyping(false);

                    setChoices(node.choices.filter(
                            (choice): choice is DialogueChoice => choice !== undefined
                        ));

                    return;

                }

                case DialogueNodeType.JumpNode: {

                    setIsTyping(false);

                    engine.jump(node.node);

                    execute();

                    return;

                }

            }

        }

        setIsTyping(false);

    }, [engine]);

    const next = () => {

        if (isTyping)
            return;

        const node = engine.next();

        if (!node) return;

        if (node.type !== DialogueNodeType.Message) return;

        const message = node as DialogueMessage;

        setHistory(prev => [

            ...prev,

            message

        ]);

        execute();

    }

    const finishEvent = () => {

        if (!activeEvent) return;

        flags.set(`puzzle.${activeEvent.id}`);

        setActiveEvent(null);

        setIsEventOpened(false);

        engine.resume();

        execute();

    }

    const resumeActiveEvent = () => {

        setIsEventOpened(true);

    }

    const pauseActiveEvent = () => {

        setIsEventOpened(false);
    }

    const selectChoice = (index: number) => {

        const node = engine.current();

        if (!node) return;

        if (node.type !== DialogueNodeType.Choice) return;

        const choice = node.choices[index];

        if (!choice) return;

        setHistory(prev => [

            ...prev,

            {

                id: Date.now(),

                type: DialogueNodeType.Message,

                speaker: Speaker.User,

                text: choice.text

            }

        ]);

        engine.jump(choice.jump);

        setChoices(null);

        execute();

    }

    useEffect(() => {

        if (!engine.startsWithBot()) {

            return;

        }

        if (history.length > 0) {

            return;

        }

        execute();

    }, [engine, execute]);

    useEffect(() => {

        saveDialogue({

            version: SAVE_VERSION,

            scenarioId: campaign.current().id,

            history,

            currentEmotion,

            nodeId: engine.peek()?.id ?? 0,

            activeEvent,

            choices,

            flags: flags.getAll()

        })

    }, [
    
        history,

        currentEmotion,

        activeEvent,

        choices,

        engine.peek()?.id,

        campaign.current().id,

        flags.getAll()

    ])

    const reset = () => {

        clearDialogue();

        engine.reset();

        flags.clear();

        campaign.reset();

        setHistory([]);

        setChoices(null);

        setActiveEvent(null);

        setCurrentEmotion(Emotion.Neutral);

    }

    return (

        <DialogueContext.Provider
            value={{

                    scenario: campaign.current(),

                    history,

                    current: engine.current(),

                    currentEmotion: currentEmotion,

                    isTyping,

                    activeEvent: activeEvent,

                    isEventOpened,

                    resumeActiveEvent: resumeActiveEvent,

                    pauseActiveEvent: pauseActiveEvent,

                    finishEvent,

                    choices,
                    
                    selectChoice,

                    next
            }}
        >

            {children}
            
        </DialogueContext.Provider>

    )

}