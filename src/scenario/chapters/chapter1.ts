import { type DialogueScenario, Speaker, DialogueNodeType } from "../../types/dialogue";

export const chapter1: DialogueScenario = {

    id: "chapter1",

    title: "Пример сценария - глава 1",

    characterId: "testCharacter",

    nodes: [

        {
            id: 201,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Создать выбор в диалогах можно через DialogueNodeType.Choice",
        },

        {
            id: 202,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Прописывая варианты, тебе так же нужно указать на какую ноду они ведут, чтобы после выбора диалог пошел дальше. (до 4 вариантов)"
        },

        {
            id: 203,
            type: DialogueNodeType.Choice,
            choices: [

                {
                    text: "Круто!",
                    jump: 204
                },

                {
                    text: "Отпад!",
                    jump: 208
                }

            ]
        },

        {
            id: 204,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Пример ответа на выбор 'Круто'"
        },

        {
            id: 205,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Так же диалог идет линейно, и если оставить сообщение дальше оно так же проиграется, хотя должно быть только после другого выбора."
        },

        {
            id: 206,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Чтобы это исправить мы используем DialogueNodeType.JumpNode, который позволит нам скипнуть эти сообщения."
        },

        {
            id: 207,
            type: DialogueNodeType.JumpNode,
            node: 209
        },

        {
            id: 208,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Пример ответа на выбор 'Отпад'"
        },

        {
            id: 209,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "На этом разнообразие DialogueNodeType.Choice заканчивается."
        },

        {
            id: 210,
            type: DialogueNodeType.Message,
            speaker: Speaker.User,
            text: "Перейдем во 2 главу.",
        },

        {
            id: 211,
            type: DialogueNodeType.Pause,
            delay: 3000
        },

        {
            id: 212,
            type: DialogueNodeType.JumpScenario,
            scenario: "chapter2"
        }
    
    ]

};