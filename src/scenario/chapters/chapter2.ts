import { DialogueNodeType, type DialogueScenario, Speaker } from "../../types/dialogue";

export const chapter2: DialogueScenario = {

    id: "chapter2",

    title: "Пример сценария - глава 2",

    characterId: "testCharacter",
    
    nodes: [

        {
            id: 301,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Для добавления различных загадок можно использовать DialogueNodeType.Puzzle"
        },

        {
            id: 302,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Все пазлы нужно прописывать в ../puzzles.ts и после ссылаться по айди"
        },

        {
            id: 303,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "После начала пазла перед игроком откроется модальное окно, которое потребует ввести пароль."
        },

        {
            id: 304,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Если игрок хочет больше подумать надо ответом, читая диалог - он может закрыть диалоговое окно, и тогда появится кнопка 'Открыть загадку', которая его вернет."
        },

        {
            id: 305,
            type: DialogueNodeType.Puzzle,
            puzzleId: "password"
        },

        {
            id: 306,
            type: DialogueNodeType.WaitFlag,
            flag: "puzzle.password"
        },

        {
            id: 307,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Создав загадку, так же нужно указать ожидание специального флага ('puzzle.{puzzleId}'), который устанавливается после завершения паззла."
        },

        {
            id: 308,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Это нужно для того, чтобы диалог не двигался с места, пока загадка не будет завершена."
        },

        {
            id: 309,
            type: DialogueNodeType.Message,
            speaker: Speaker.Bot,
            text: "Через DialogueNodeType.SetFlag можно также установить флаг вручную."
        },

        {
            id: 310,
            type: DialogueNodeType.SetFlag,
            flag: "test.flag",
            value: false
        },

        {
            id: 311,
            type: DialogueNodeType.Message,
            speaker: Speaker.User,
            text: "Перейдем в 3 главу.",
        },

        {
            id: 312,
            type: DialogueNodeType.Pause,
            delay: 3000
        },

        {
            id: 313,
            type: DialogueNodeType.JumpScenario,
            scenario: "chapter3"
        }

    ]

}