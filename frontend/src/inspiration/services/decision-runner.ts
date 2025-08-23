import { QUESTIONS } from "../data/questions";
import type {Question} from "../model/decision-tree.ts";

export function runTree(
    startId: string,
    choose: (q: Question) => number
): string {
    let current = QUESTIONS[startId];
    if (!current) throw new Error("Unknown start question: " + startId);

    for (;;) {
        const idx = choose(current);
        const a = current.answers[idx];
        if (!a) throw new Error("Invalid answer index for " + current.id);

        if (a.kind === "leaf") {
            return a.result;
        }

        const next = QUESTIONS[a.nextId];
        if (!next) throw new Error("Broken nextId: " + a.nextId);
        current = next;
    }
}