import { APIQuestionType, DIFFICULTY, QuestionCategoryType, TYPE } from './Types';

export const fetchQuestionCategories = async (): Promise<QuestionCategoryType[]> => {
    const questionCategoryURL = 'https://opentdb.com/api_category.php';

    const questionCategoryData = await (await fetch(questionCategoryURL)).json();

    return questionCategoryData.trivia_categories;
}

export const fetchQuestions = async (noOfQuestions: number | number[], categoryId: string, difficulty: DIFFICULTY, type: TYPE): Promise<{response_code: number, results: APIQuestionType[]}> => {
    const URL = `https://opentdb.com/api.php?amount=${noOfQuestions}`
    let modifiedURL = URL

    if (categoryId !== 'anyCategory') {
        modifiedURL = `${modifiedURL}&category=${categoryId}`
    }
    if (difficulty !== 'any') {
        modifiedURL = `${modifiedURL}&difficulty=${difficulty}`
    }
    if (type !== 'any') {
        modifiedURL = `${modifiedURL}&type=${type}`
    }

    const response = await (await fetch(modifiedURL)).json()

    return response
}