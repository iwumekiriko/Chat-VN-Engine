export interface Puzzle {

    id: string;

    title: string;

    description: string;

    answer: string;

}


export const puzzles: Record<string, Puzzle> = {

    "password": {

        id: "password",

        title: "ОТВЕТ: ПАРОЛЬ",

        description: "Введите пароль",

        answer: "ПАРОЛЬ",

    }

};