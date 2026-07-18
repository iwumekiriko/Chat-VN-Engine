import { type DialogueScenario, Speaker, DialogueNodeType, Emotion } from "../../types/dialogue";

import defaultAvatar from "../../assets/default-avatar.jpg";

export const prologue: DialogueScenario = {

    id: "prologue",

    title: "Пример сценария - пролог",

    characterId: "testCharacter",

    nodes: [

        {
            id: 101,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Привет, это пример работы сценария. (../scenario/chapters/prologue.ts)",
        },

        {
            id: 102,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Здесь ты можешь продумывать сюжет и прописывать диалоги.",
        },

        {
            id: 103,
            type: DialogueNodeType.Message,
            speaker: Speaker.User,
            text: "Как мне разделять сообщения от пользователя и от NPC?",
        },

        {
            id: 104,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Очень просто, надо указать от кого пойдет сообщение: Speaker.User или Speaker.Bot",
        },

        {
            id: 105,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Так же ты можешь настраивать время печати сообщения через delay, например это сообщение пишется намного дольше.",
            delay: 6000
        },

        {
            id: 106,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Визуально задать эмоцию NPC ты можешь через emotion (обрати внимание на аватар профиля NPC)",
            emotion: Emotion.Shocked
        },

        {
            id: 107,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Еще ты можешь добавлять картинки в сообщение, которые после можно открыть в модальном окне для детального рассмотрения.",
            emotion: Emotion.Neutral
        },

        {
            id: 108,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Сообщение с картинкой",
            image: {
                alt: "название картинки",
                image: defaultAvatar
            }
        },

        {
            id: 109,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "На этом разнообразие DialogueNodeType.Message заканчивается.",
        },

        {
            id: 110,
            type: DialogueNodeType.Message,
            speaker: Speaker.User,
            text: "Перейдем в 1 главу.",
        },

        {
            id: 111,
            type: DialogueNodeType.Pause,
            delay: 3000
        },

        {
            id: 112,
            type: DialogueNodeType.JumpScenario,
            scenario: "chapter1"
        }

    ]

};