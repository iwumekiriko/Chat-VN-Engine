import ChatWindow from "./components/ChatWindow";
import Profile from "./components/Profile";
import SettingsContent from "./components/SettingsContent";
import PuzzleContent from "./components/PuzzleContent";
import { useDialogue } from "./hooks/useDialogue";  
import { useProfile } from "./hooks/useProfile";
import { useModal } from "./context/ModalProvider";
import { characters } from "./scenario/characters";
import { useEffect } from "react";
import type { DialogueImage } from "./types/dialogue";

export default function App() {
  const { showModal } = useModal();

  const dialogue = useDialogue();

  const profile = useProfile();

  const npc = characters[dialogue.scenario.characterId];

  useEffect(() => {

    if (!dialogue.activeEvent) return;

    if (!dialogue.isEventOpened) return;

    switch (dialogue.activeEvent.type) {

      case "Puzzle":
        
        showModal({

          title: dialogue.activeEvent.title,
          
          onClose() { dialogue.pauseActiveEvent() },
          
          children: (

            <PuzzleContent
              puzzleId={dialogue.activeEvent.id}
              onSuccess={dialogue.finishEvent}
            />

          )

        });

        break;

    }

  }, [

    dialogue.activeEvent,

    dialogue.isEventOpened

  ]);

  return (

    <div className="flex h-screen w-screen bg-black overflow-hidden">

      <div className="flex-1 min-w-0">

        <ChatWindow
          history={dialogue.history}
          current={dialogue.current}
          next={dialogue.next}
          isTyping={dialogue.isTyping}
          activeEvent={dialogue.activeEvent}
          openActiveEvent={dialogue.resumeActiveEvent}
          choices={dialogue.choices}
          selectChoice={dialogue.selectChoice}
          npc={npc}
          user={profile.user}
          title={dialogue.scenario.title}
          openImage={(image: DialogueImage) => {

            showModal({

              title: image.alt,

              children: (

                <img
                  src={image.image}
                  alt={image.alt}
                />

              )

            })

          }}
        />

      </div>

      <Profile
        character={npc}
        emotion={dialogue.currentEmotion}
        onOpenSettings={() => 

          showModal({

            title: "Настройки профиля",

            children: (
              <SettingsContent
                userName={profile.user.name}
                userAvatar={profile.user.avatar}
                setUserName={profile.setUserName}
                setUserAvatar={profile.setUserAvatar}
              />

            )

          })

        }
        
      />

    </div>
  );
}