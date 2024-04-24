

interface Statement {
    phrase: string;
    options: string[];
}

interface AnswerMultipleChoice {
    type: "MultipleChoice";
    answerId: number;
}

interface AnswerOrdering {
    type: "Ordering";
    answer: string[];
}

export type Answer = AnswerMultipleChoice | AnswerOrdering;

export type QuestionMultipleChoice = Statement & AnswerMultipleChoice;

export type QuestionOrdering = Statement & AnswerOrdering;

export type Question = QuestionMultipleChoice | QuestionOrdering

const q1: Question = {
    type: "Ordering",
    phrase: "Você é um gato?",
    options: ["Are", "you", "a", "cat", "horse", "girl"],
    answer: ["Are", "you", "a", "cat"]
}

const q2: Question = {
    type: "MultipleChoice",
    phrase: "Como você diz \"cat\"?",
    options: ["cat", "man", "and"],
    answerId: 0
}

export function shuffle(arr: any[]): any[] {
    let i = arr.length;
    while (i > 0) {
        let j = Math.floor(Math.random() * i);
        i--;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


export function grade(q: Question, a: Answer): boolean {
    switch (q.type) {
        case "MultipleChoice":
            if (q.type !== a.type) return false;
            return q.answerId === a.answerId;

        case "Ordering":
            if (q.type !== a.type) return false;
            if (q.answer.length !== a.answer.length) return false;
            return q.answer.every((x, i) => x === a.answer[i]);

        default:
            const check: never = q;
    }
    return false;
}