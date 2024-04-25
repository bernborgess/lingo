import { Answer, Question, grade, shuffle } from "../../src/utils/questionUtil";

describe("Shuffle keeps the array intact", () => {
    it("Works on an empty array", () => {
        const arr: any[] = [];
        const shuf = shuffle(arr);
        expect(shuf).toBe(arr);
    })
    it("Works on a singleton array", () => {
        const arr = [1];
        const shuf = shuffle(arr);
        expect(shuf).toBe(arr);
    })
    it("Maintains array length", () => {
        const arr = [1, 2, 3, 4, 5, 6];
        const shuf = shuffle(arr);
        expect(shuf.length).toBe(arr.length);
    })
    it("Keeps all elements", () => {
        const arr = [1, 2, 3, 4, 5, 6];
        const shuf = shuffle(arr);
        arr.forEach(x => expect(shuf).toContain(x));
        shuf.forEach(x => expect(arr).toContain(x));
    })
    it("Returns the same array when Math.random returns 0", () => {
        jest.spyOn(Math, "random").mockReturnValue(0);
        const arr = [1, 2, 3, 4, 5, 6];
        const shuf = shuffle(arr);
        expect(arr).toBe(shuf)
        jest.restoreAllMocks();
    })
})

describe("Grade is correct for all attempts", () => {
    it("Is true with equal MultipleChoice answers", () => {
        const q: Question = {
            type: "MultipleChoice",
            phrase: "Como se diz \"Oi\"?",
            options: ["bye", "Duo", "hello"],
            answerId: 2
        };
        const a: Answer = {
            type: "MultipleChoice",
            answerId: 2
        };
        expect(grade(q, a)).toBe(true);
    })


    it("Is true with equal Ordering answers", () => {
        const q: Question = {
            type: "Ordering",
            phrase: "Eu sou o Duo",
            options: ["I", "am", "Duo", "hello", "bye"],
            answer: ["I", "am", "Duo"]
        };
        const a: Answer = {
            type: "Ordering",
            answer: ["I", "am", "Duo"]
        };
        expect(grade(q, a)).toBe(true);
    })


    it("Is false on empty Ordering answer", () => {
        const q: Question = {
            type: "Ordering",
            phrase: "Em sou o Duo",
            options: ["I", "am", "Duo", "hello", "bye"],
            answer: ["I", "am", "Duo"]
        };
        const a: Answer = {
            type: "Ordering",
            answer: []
        };
        expect(grade(q, a)).toBe(false);
    })

    it("Is false on wrong index", () => {
        const q: Question = {
            type: "MultipleChoice",
            phrase: "Como se diz \"gato\"?",
            options: ["dog", "cat", "horse"],
            answerId: 1
        };
        const a: Answer = {
            type: "MultipleChoice",
            answerId: 2
        };
        expect(grade(q, a)).toBe(false);
    })

    it("Is false on broken question", () => {
        const q = {} as Question;
        const a = {} as Answer;
        expect(grade(q, a)).toBe(false);
    })

    it("Is false on MultipleChoice question and Ordering answer", () => {
        const q: Question = {
            type: "MultipleChoice",
            phrase: "",
            options: [],
            answerId: 0
        };
        const a: Answer = {
            type: "Ordering",
            answer: []
        };
        expect(grade(q, a)).toBe(false);
    })

    it("Is false on Ordering question and MultipeChoice answer", () => {
        const q: Question = {
            type: "Ordering",
            phrase: "",
            options: [],
            answer: []
        };
        const a: Answer = {
            type: "MultipleChoice",
            answerId: 0
        };
        expect(grade(q, a)).toBe(false);
    })

});