export type QuestionType = {
    id: number;
    question: string;
    placeholder: string;
}

export type AnswerType = {
    questionId: number;
    // userId: number;
    answer: string;
}

