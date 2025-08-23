import type { Path } from "../model/trace";

export type PathStepDTO = {
    questionText: string;
    answerText: string;
};

export function buildPathPayload(path: Path): PathStepDTO[] {
    return path.map(s => ({ questionText: s.questionText, answerText: s.answerText }));
}