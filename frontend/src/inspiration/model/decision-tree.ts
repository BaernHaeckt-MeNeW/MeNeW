export type Answer =
    | { kind: "leaf"; text: string; result: string }
    | { kind: "next"; text: string; nextId: string };

export interface Question {
    id: string;
    text: string;
    answers: Answer[];
}