import type { CharacterId } from "./character";


export const Speaker = {
    User: "USER",
    Bot: "BOT"
} as const;


export const Emotion = {
    Neutral: "NEUTRAL",
    Cute: "CUTE",
    Curious: "CURIOUS",
    Angry: "ANGRY",
    Shocked: "SHOCKED",
    Worry: "WORRY",
    Shy: "Shy",
    Confident: "CONFIDENT",
    Happy: "Happy",
    Thinking: "Thinking"
} as const;


export const DialogueNodeType = {
    Message: "MESSAGE",
    Puzzle: "PUZZLE",
    Pause: "PAUSE",
    WaitFlag: "WAIT_FLAG",
    SetFlag: "SET_FLAG",
    JumpScenario: "JUMP_SCENARIO",
    JumpNode: "JUMP_NODE",
    Choice: "CHOICE"
} as const;


export type Speaker = typeof Speaker[keyof typeof Speaker];
export type Emotion = typeof Emotion[keyof typeof Emotion];
export type DialogueNodeType = typeof DialogueNodeType[keyof typeof DialogueNodeType];


interface DialogueBase {
    id: number;
    type: DialogueNodeType;
}


export interface DialogueMessage extends DialogueBase {
    type: typeof DialogueNodeType.Message;
    speaker: Speaker;
    text: string;
    image?: DialogueImage;
    emotion?: Emotion;
    delay?: number;
}


export interface PuzzleNode extends DialogueBase {
    type: typeof DialogueNodeType.Puzzle;
    puzzleId: string;
}


export interface PauseNode extends DialogueBase {
    type: typeof DialogueNodeType.Pause;
    delay: number;
}


export interface WaitFlagNode extends DialogueBase {
    type: typeof DialogueNodeType.WaitFlag;
    flag: string;
}


export interface SetFlagNode extends DialogueBase {
    type: typeof DialogueNodeType.SetFlag;
    flag: string;
    value: boolean;
}


export interface JumpScenarioNode extends DialogueBase {
    type: typeof DialogueNodeType.JumpScenario;
    scenario: string;
}


export interface JumpNodeNode extends DialogueBase {
    type: typeof DialogueNodeType.JumpNode;
    node: number    
}


export interface DialogueChoice {
    text: string;
    jump: number;
}


export interface DialogueImage {
    alt: string;
    image: string;
}


export interface ChoiceNode extends DialogueBase {
    type: typeof DialogueNodeType.Choice;
    choices: [
        DialogueChoice,
        DialogueChoice,
        DialogueChoice?,
        DialogueChoice?
    ];
}


export type DialogueNode =
    | DialogueMessage
    | PuzzleNode
    | PauseNode
    | WaitFlagNode
    | SetFlagNode
    | JumpScenarioNode
    | JumpNodeNode
    | ChoiceNode;


export interface DialogueScenario {
    id: string;
    title: string;
    characterId: CharacterId;
    nodes: DialogueNode[];
}


export interface ActiveEvent {
    type: "Puzzle";
    id: string;
    title: string;
}


export interface ScenarioFlags {
    [key: string]: boolean;
}


export interface DialogueSave {
    version: number;
    scenarioId: string;
    history: DialogueMessage[];
    nodeId: number;
    currentEmotion: Emotion;
    flags?: ScenarioFlags | null;
    activeEvent?: ActiveEvent | null;
    choices?: DialogueChoice[] | null;
}