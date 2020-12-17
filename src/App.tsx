import React, { useState } from 'react';
//Styles
import { Card, CardContent, Grid, LinearProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './App.css'
//Components
import QuizCategory from './components/QuizCategory';
//Types
import { DIFFICULTY, QuestionsType, TYPE } from './Types';
//API
import { fetchQuestions } from './API';
import { shuffleArray } from './utils';
import QuestionCard from './components/QuestionCard';

import firebase from './firebase'

function App() {
  const messaging = firebase.messaging()
  messaging.requestPermission().then(() => {
    return messaging.getToken()
  }).then((token) => {
    console.log('token', token)
  })


  const [noOfQuestions, setNoOfQuestions] = useState<number | number[]>(10)
  const [categoryId, setCategoryId] = useState<string>('anyCategory')
  const [difficulty, setDifficulty] = useState<DIFFICULTY>(DIFFICULTY.ANY)
  const [type, setType] = useState<TYPE>(TYPE.ANY)

  const [quizOver, setQuizOver] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [responseCode, setReponseCode] = useState<number | null>(null)

  const [questions, setQuestions] = useState<QuestionsType[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [score, setScore] = useState<number>(0)

  const startQuiz = async () => {
    setQuizOver(false)
    setLoading(true)
    setScore(0)
    setCurrentQuestion(0)

    const response = await fetchQuestions(noOfQuestions, categoryId, difficulty, type)

    if (response.response_code === 0) {
      setQuestions(response.results.map((question) => {
        return {
          question: question.question,
          correctAnswer: question.correct_answer,
          options: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
      }))
    }
    setLoading(false)
    setReponseCode(response.response_code)
  }

  const checkAnswer = (userAnswer: string) => {
    if (questions[currentQuestion].correctAnswer.toUpperCase() === userAnswer.toUpperCase()) {
      setScore(score + 1)

    }
  }

  const handleNext = (setUserAnswer: (userAnswer: string) => void) => {
    setCurrentQuestion(currentQuestion + 1)

    if (currentQuestion + 1 === questions.length) {
      setQuizOver(true)
    }
    else {
      setUserAnswer('')
    }
  }

  return (
    <div className='App'>
      <Grid container justify='center'>
        <Grid item xs={12}>
          <h1>Quiz App</h1>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              {quizOver ?
                <QuizCategory
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                  noOfQuestions={noOfQuestions}
                  setNoOfQuestions={setNoOfQuestions}
                  type={type}
                  setType={setType}
                  startQuiz={startQuiz}
                />
                :
                loading ?
                  <LinearProgress />
                  :
                  // !navigator.onLine ?
                  //   <Alert severity='error'>
                  //     Please make sure your internet connection is working to start the quiz
                  //   </Alert>
                  //   :
                    responseCode === 0 ?
                      <QuestionCard
                        question={questions[currentQuestion].question}
                        correctAnswer={questions[currentQuestion].correctAnswer}
                        options={questions[currentQuestion].options}
                        noOfQuestions={noOfQuestions}
                        currentQuestion={currentQuestion + 1}
                        score={score}
                        checkAnswer={checkAnswer}
                        handleNext={handleNext}
                      />
                      :
                      responseCode === 1 ?
                        <Alert severity='error'>
                          Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
                      </Alert>
                        :
                        <Alert severity='error'>
                          Error Please Reload The Page.
                      </Alert>
              }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
