export interface Question {
    text: string,
    answers: Answer[]
}

export interface Answer {
    text: string,
    followUp?: Question
    manual?: boolean;
}