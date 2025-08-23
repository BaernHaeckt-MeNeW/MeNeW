import type {Question} from "../model/dialog.ts";


export const QUESTIONS_TREE: Question = {
    text: "Wie bist du drauf?",
    answers: [
        {
            text: "Heute was besonderes",
            followUp: {
                text: "Was spricht dich gerade an?",
                answers: [
                    {text: "Knusprig"},
                    {text: "Saftig"},
                    {text: "Gehobenes Feeling"},
                    {text: "Kreativ"}
                ]
            }
        },
        {
            text: "Ich habe null Plan",
            followUp: {
                text: "Was spricht dich gerade an?",
                answers: [
                    {
                        text: "Knusprig",
                        followUp: {
                            text: "Soll's eine bestimmte Region sein?",
                            answers: [
                                {text: "Asiatisch"},
                                {text: "Mediterran"},
                                {text: "Orientalisch"},
                                {text: "Amerikanisch"},
                                {text: "Egal"}
                            ]
                        }
                    },
                    {
                        text: "Saftig",
                        followUp: {
                            text: "Soll's eine bestimmte Region sein?",
                            answers: [
                                {text: "Asiatisch"},
                                {text: "Mediterran"},
                                {text: "Orientalisch"},
                                {text: "Amerikanisch"},
                                {text: "Egal"}
                            ]
                        }
                    },

                    {
                        text: "Gehobenes Feeling",
                        followUp: {
                            text: "Soll's eine bestimmte Region sein?",
                            answers: [
                                {text: "Asiatisch"},
                                {text: "Mediterran"},
                                {text: "Orientalisch"},
                                {text: "Amerikanisch"},
                                {text: "Egal"}
                            ]
                        }
                    },

                    {
                        text: "Kreativ",
                        followUp: {
                            text: "Soll's eine bestimmte Region sein?",
                            answers: [
                                {text: "Asiatisch"},
                                {text: "Mediterran"},
                                {text: "Orientalisch"},
                                {text: "Amerikanisch"},
                                {text: "Egal"}
                            ]
                        }
                    }
                ]
            }
        },
        {
            text: "Hauptsache schnell & easy"
        },
        {
            text: "Ich hab was bestimmtes vor"
        }
    ]
}