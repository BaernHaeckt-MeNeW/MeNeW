export type PathStep = {
    questionId: string;
    questionText: string;
    answerText: string;
};

export type Path = PathStep[];

export type TraceResult = {
    result: string;
    path: Path;
};

export type Session = {
    currentId: string;
    path: Path;
    finished: boolean;
    result?: string;
};