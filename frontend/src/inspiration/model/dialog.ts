export interface Question {
    text: string,
    answers: Answer[],
    userEcho?: boolean
}

export interface Answer {
    text: string,
    followUp?: Question
    manual?: boolean;
}