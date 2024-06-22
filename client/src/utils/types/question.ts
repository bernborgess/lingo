export interface Statement {
    type: "MultipleChoice" | "Ordering"
    phrase: string;
    options: string[];
}

export interface AnswerMultipleChoice {
    type: "MultipleChoice";
    answerId: number;
}

export interface AnswerOrdering {
    type: "Ordering";
    answer: string[];
}

export type Answer = AnswerMultipleChoice | AnswerOrdering;

export type QuestionMultipleChoice = Statement & AnswerMultipleChoice;

export type QuestionOrdering = Statement & AnswerOrdering;

export type Question = QuestionMultipleChoice | QuestionOrdering