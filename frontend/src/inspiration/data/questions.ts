import type {Question} from "../model/dialog.ts";


export const QUESTIONS_TREE: Question = {
    text: "Was möchten Sie tun?",
    answers: [
        {
            text: "Essen planen",
            followUp: {
                text: "Für wen möchten Sie das Essen planen?",
                answers: [
                    {
                        text: "Für mich",
                        followUp: {
                            text: "Welche Art von Mahlzeit möchten Sie planen?",
                            answers: [
                                {text: "Frühstück"},
                                {text: "Mittagessen"},
                                {text: "Abendessen"},
                                {text: "Snack"},
                            ]
                        }
                    },
                    {
                        text: "Für jemand anderen",
                        followUp: {
                            text: "Welche Art von Mahlzeit möchten Sie planen?",
                            answers: [
                                {text: "Frühstück"},
                                {text: "Mittagessen"},
                                {text: "Abendessen"},
                                {text: "Snack"},
                            ]
                        }
                    },
                    {
                        text: "Für eine Gruppe",
                        followUp: {
                            text: "Wie viele Personen sind in der Gruppe?",
                            answers: [
                                {text: "2-4 Personen"},
                                {text: "5-10 Personen"},
                                {text: "Mehr als 10 Personen"},
                            ]
                        }
                    },
                ]
            }
        },
        {
            text: "Einkaufsliste erstellen",
            followUp: {
                text: "Möchten Sie eine neue Einkaufsliste erstellen oder eine vorhandene bearbeiten?",
                answers: [
                    {text: "Neue Einkaufsliste erstellen"},
                    {text: "Vorhandene Einkaufsliste bearbeiten"},
                ]
            }
        },
        {
            text: "Rezepte suchen",
            followUp: {
                text: "Nach welchen Kriterien möchten Sie Rezepte suchen?",
                answers: [
                    {text: "Nach Zutaten"},
                    {text: "Nach Mahlzeittyp (z.B. Frühstück, Mittagessen)"},
                    {text: "Nach Diätpräferenzen (z.B. vegetarisch, vegan)"},
                ]
            }
        },
        {
            text: "Einstellungen anpassen",
            followUp: {
                text: "Nach welchen Kriterien möchten Sie Rezepte suchen?",
                answers: [
                    {text: "Nach Zutaten"},
                    {text: "Nach Mahlzeittyp (z.B. Frühstück, Mittagessen)"},
                    {text: "Nach Diätpräferenzen (z.B. vegetarisch, vegan)"},
                ]
            }
        },
    ]
}