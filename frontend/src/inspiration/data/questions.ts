import type {Question} from "../model/decision-tree.ts";

export const QUESTIONS: Record<string, Question> = {
    q1: {
        id: "q1",
        text: "Was ist der Plan?",
        answers: [
            {kind: "next", text: "Heute darf's was besonderes sein", nextId: "q2"},
            {kind: "next", text: "Ich habe null Plan", nextId: "q2"},
            {kind: "leaf", text: "Hauptsache schnell & easy", result: "VORSCHLÄGE"},
            {kind: "leaf", text: "Ich hab was bestimmtes vor", result: "INPUT"}
        ],
    },
    q2: {
        id: "q2",
        text: "Was spricht dich gerade an?",
        answers: [
            {kind: "next", text: "Knusprig", nextId: "q3"},
            {kind: "next", text: "Saftig", nextId: "q3"},
            {kind: "leaf", text: "Gehobenes Feeling", result: "VORSCHLÄGE"},
            {kind: "next", text: "Kreativ", nextId: "q3"}
        ],
    },
    q3: {
        id: "q3",
        text: "Lust auf eine bestimmte Region?",
        answers: [
            {kind: "leaf", text: "Asiatisch", result: "VORSCHLÄGE"},
            {kind: "leaf", text: "Italienisch", result: "VORSCHLÄGE"},
            {kind: "leaf", text: "Amerikanisch", result: "VORSCHLÄGE"},
            {kind: "leaf", text: "Orientalisch", result: "VORSCHLÄGE"},
            {kind: "leaf", text: "Egal", result: "VORSCHLÄGE"}
        ],
    },
};