import type { Emotion } from "./dialogue";


export const Status = {
    Online: "ONLINE",
    Idle: "IDLE",
    Away: "AWAY"
} as const;


export type CharacterId = 
    | "testCharacter"
    | "testCharacter2"


export interface Character {

    id: AnyCharacterId,

    name: string,

    avatar: string,

    portraits: Partial<Record<Emotion, string>>;

    status: Status,

    description: string

}

export type UserId = "user";

export type AnyCharacterId = CharacterId | UserId;

export type Status = typeof Status[keyof typeof Status]