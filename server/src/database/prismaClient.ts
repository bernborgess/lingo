import { PrismaClient } from '@prisma/client';
import { Question } from '../utils/questionUtil';

export const prisma = new PrismaClient();

//? Se precisar limpar o BD
const CLEAN_ALL = false;

async function main() {

    if (CLEAN_ALL) {
        const deleteUser = prisma.user.deleteMany();
        const deleteQuestion = prisma.question.deleteMany();
        const deleteLevel = prisma.level.deleteMany();
        await prisma.$transaction([deleteUser, deleteQuestion, deleteLevel]);
        console.log("Cleaned all users, levels and questions.");
        return;
    }

    // Hardcoded Levels
    const { _count: { id: levelCount } } = await prisma.level.aggregate({ _count: { id: true } });

    if (levelCount !== 0) {
        console.log("Levels already defined.");
        return;
    }

    console.log("Creating default Levels and Questions");

    const levelsData: { sequence: number, questions: (Question & { sequence: number })[] }[] = [
        {
            sequence: 1,
            questions: [
                {
                    sequence: 1,
                    type: 'Ordering',
                    phrase: 'Você é um gato?',
                    options: ['Are', 'you', 'a', 'cat', 'horse', 'girl'],
                    answer: ['Are', 'you', 'a', 'cat']
                },
                {
                    sequence: 2,
                    type: 'MultipleChoice',
                    phrase: 'Como você diz "cat" em inglês?',
                    options: ['cat', 'man', 'and'],
                    answerId: 0
                }
            ]
        },
        {
            sequence: 2,
            questions: [
                {
                    sequence: 1,
                    type: 'MultipleChoice',
                    phrase: 'Qual a tradução de "dog"?',
                    options: ['gato', 'cachorro', 'pássaro'],
                    answerId: 2
                },
                {
                    sequence: 2,
                    type: 'MultipleChoice',
                    phrase: 'Escolha a tradução correta para "I eat an apple"',
                    options: ['Eu como uma maçã', 'Eu bebo uma maçã', 'Eu sou uma maçã'],
                    answerId: 0
                }
            ]
        },
        {
            sequence: 3,
            questions: [
                {
                    sequence: 1,
                    type: 'MultipleChoice',
                    phrase: 'O que significa "book"?',
                    options: ['Livro', 'Caderno', 'Mesa'],
                    answerId: 0
                }
            ]
        }
    ];

    const levelCreationPromises = levelsData.map(level =>
        prisma.level.create({
            data: {
                sequence: level.sequence,
                questions: {
                    create: level.questions
                }
            }
        }));

    await Promise.all(levelCreationPromises);
    console.log('All levels and questions have been created successfully.');
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })