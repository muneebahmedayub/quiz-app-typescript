export type QuestionCategoryType = {
    id: number,
    name: string
}

export enum DIFFICULTY {
    ANY = "any",
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export enum TYPE {
    ANY = 'any',
    MULTIPLE = 'multiple',
    BOOLEAN = 'boolean' 
}

export type CategoryPropType = {
    categoryId: string
    setCategoryId: (category: string) => void,
    difficulty: DIFFICULTY,
    setDifficulty: (difficulty: DIFFICULTY) => void
    noOfQuestions: number | number[],
    setNoOfQuestions: (noOfQuestions: number | number[]) => void,
    type: TYPE,
    setType: (type: TYPE) => void,
    startQuiz: () => void
}

export type APIQuestionType = {
    category: string,
    type: TYPE,
    difficulty: DIFFICULTY,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export type QuestionsType = {
    correctAnswer: string
    options: string[],
    question: string,
}

export type QuestionCardPropType = {
    question: string,
    correctAnswer: string,
    options: string[],
    noOfQuestions: number | number[],
    currentQuestion: number,
    score: number
    checkAnswer: (userAnswer: string) => void
    handleNext: (setUserAnswer: (userAnswer: string) => void) => void
}