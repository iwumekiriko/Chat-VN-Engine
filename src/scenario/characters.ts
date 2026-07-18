import { Emotion } from "../types/dialogue";
import { Status, type Character, type CharacterId } from "../types/character";

import defaultAvatar from "../assets/default-avatar.jpg";
import shockedAvatar from "../assets/shocked-avatar.jpg";


// Для добавления нового айди персонажа: перейти в ../types/character.ts


export const testCharacter: Character = {

    id: "testCharacter",

    name: "Тестовый персонаж",

    avatar: defaultAvatar,

    portraits: {
        [Emotion.Shocked]: shockedAvatar,
    },

    status: Status.Online,

    description: "Тестовый статус"

};

export const testCharacter2: Character = {

    id: "testCharacter2",

    name: "Тестовый персонаж 2",

    avatar: defaultAvatar,

    portraits: {
        [Emotion.Shocked]: shockedAvatar,
    },

    status: Status.Away,

    description: "Тестовый статус"

};


export const characters = {

    testCharacter,

    testCharacter2
    
} satisfies Record<CharacterId, Character>