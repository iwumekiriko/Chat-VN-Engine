import { type DialogueScenario, Speaker, DialogueNodeType } from "../../types/dialogue";

export const chapter3: DialogueScenario = {

    id: "chapter3",

    title: "Пример сценария - глава 3",

    characterId: "testCharacter",

    nodes: [

        {
            id: 401,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Ну и напоследок стоит показать DialogueNodeType.Pause и DialogueNodeType.JumpScenario"
        },

        {
            id: 402,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "DialogueNodeType.Pause позволяет делать паузы в выходе сообщений."
        },

        {
            id: 403,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Это можно использовать для того, чтобы выразить задумчивость или что-то типа того.."
        },

        {
            id: 404,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "*думаю*"
        },

        {
            id: 405,
            type: DialogueNodeType.Pause,
            delay: 5000
        },

        {
            id: 406,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "DialogueNodeType.JumpScenario умеет перебрасывать через главы."
        },

        {
            id: 407,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Обычно используется для перехода на следующую главу."
        },

        {
            id: 408,
            type: DialogueNodeType.Message,
            speaker: Speaker.User,
            text: "Перейдем в начало."
        },

        {
            id: 409,
            type: DialogueNodeType.Pause,
            delay: 3000
        },

        {
            id: 410,
            type: DialogueNodeType.JumpScenario,
            scenario: "prologue"
        }

    ]
}