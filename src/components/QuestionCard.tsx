import React, { useEffect, useState } from 'react'
//Styles
import { Box, Button, Grid, Typography } from '@material-ui/core'
//Type
import { QuestionCardPropType } from '../Types'


const QuestionCard: React.FC<QuestionCardPropType> = ({ question,
    options,
    noOfQuestions,
    currentQuestion,
    score,
    checkAnswer,
    handleNext
}) => {

    const [userAnswer, setUserAnswer] = useState<string>('')


    useEffect(() => {
        checkAnswer(userAnswer)
    }, [userAnswer])

    const handleAnswer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setUserAnswer(e.currentTarget.innerText)
    }

    return (
        <div>
            <Grid container justify='center'>
                <Grid item xs={12} sm={10}>
                    <Typography align='center' variant='h4' gutterBottom>Score: {score}</Typography>
                    <Typography align='center' gutterBottom>Question: {currentQuestion}/{noOfQuestions}</Typography>
                    <Typography gutterBottom>{question}</Typography>
                </Grid>
                <Grid container item xs={12} sm={10} spacing={3} justify='center'>
                    {options.map((option) => (
                        <Grid item xs={12} sm={6} key={Math.random()}>
                            <Button variant='outlined'
                                disabled={!!userAnswer}
                                color='primary'
                                size='large'
                                children={option}
                                fullWidth
                                onClick={handleAnswer} />
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={10} style={{ marginTop: 20 }}>
                    <Box textAlign='right'>
                        <Button
                            disabled={!userAnswer}
                            variant='contained'
                            color='primary'
                            onClick={() => { handleNext(setUserAnswer) }}>
                            {noOfQuestions === currentQuestion ? "Try Again" : "Next"}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default QuestionCard
