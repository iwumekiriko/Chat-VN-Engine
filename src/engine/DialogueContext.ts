import { createContext } from "react";
import type { ActiveEvent, DialogueChoice, DialogueMessage, DialogueNode, DialogueScenario, Emotion } from "../types/dialogue";

export interface DialogueContextType {

    scenario: DialogueScenario;

    history: DialogueMessage[];

    current: DialogueNode | null;

    currentEmotion: Emotion;

    isTyping: boolean;

    activeEvent: ActiveEvent | null;

    isEventOpened: boolean;

    resumeActiveEvent(): void;

    pauseActiveEvent(): void;

    finishEvent(): void;

    choices: DialogueChoice[] | null;

    selectChoice(index: number): void;

    next(): void;

}

export const DialogueContext = createContext<DialogueContextType | null>(null);
