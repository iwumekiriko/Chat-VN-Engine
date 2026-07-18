import { Status, type Character } from "../types/character";

export function createUserCharacter(

    name: string,

    avatar: string

): Character {

    return {

        id: "user",

        name,
        
        avatar,

        portraits: {},

        status: Status.Online,

        description: ""

    }
}