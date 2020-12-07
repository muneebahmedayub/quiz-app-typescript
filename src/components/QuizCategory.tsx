import React, { useEffect, useState } from 'react'
//Styles
import { Box, Button, createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Slider, Typography } from '@material-ui/core'
//API
import { fetchQuestionCategories } from '../API';
//Types
import { QuestionCategoryType, DIFFICULTY, CategoryPropType, TYPE } from '../Types'

const useStyles = makeStyles(() =>
    createStyles({
        formControl: {
            margin: '20px 0px',
            minWidth: '100%',
        },
    }),
);

const QuizCategory: React.FC<CategoryPropType> = ({
    categoryId,
    setCategoryId,
    difficulty,
    setDifficulty,
    noOfQuestions,
    setNoOfQuestions,
    type,
    setType,
    startQuiz
}) => {
    const classes = useStyles();

    const [category, setCategory] = useState<QuestionCategoryType[]>([])

    useEffect(() => {
        async function categoryHandler() {
            const categoryData = await fetchQuestionCategories();

            setCategory(categoryData)
        }
        categoryHandler()
    }, [])

    return (
        <div className='QuizCategory'>
            <Grid container justify='center'>
                <Grid item xs={12} sm={10}>
                    <div className={classes.formControl}>
                        <Typography id="discrete-slider-small-steps" gutterBottom>
                            Number of Questions
                                </Typography>
                        <Slider
                            defaultValue={noOfQuestions}
                            name='setNoOfQuestions'
                            step={1}
                            marks
                            min={1}
                            max={50}
                            valueLabelDisplay="auto"
                            onChange={(event: React.ChangeEvent<{}>, value: number | number[]) => { setNoOfQuestions(value) }}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            value={categoryId}
                            onChange={(e: React.ChangeEvent<{ value: unknown }>) => { setCategoryId(e.target.value as string) }}
                            label="Category"
                        >
                            <MenuItem value='anyCategory'>Any Category</MenuItem>
                            {category.map((cat: QuestionCategoryType) => (
                                < MenuItem key={cat.id} value={`${cat.id}`} > {cat.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="difficulty">Difficulty</InputLabel>
                        <Select
                            labelId="difficulty"
                            value={difficulty}
                            onChange={(e: React.ChangeEvent<{ value: unknown }>) => { setDifficulty(e.target.value as DIFFICULTY) }}
                            label="Difficulty"
                        >
                            <MenuItem value={DIFFICULTY.ANY}>Any Difficulty</MenuItem>
                            <MenuItem value={DIFFICULTY.EASY}>Easy</MenuItem>
                            <MenuItem value={DIFFICULTY.MEDIUM}>Medium</MenuItem>
                            <MenuItem value={DIFFICULTY.HARD}>Hard</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="type">Type</InputLabel>
                        <Select
                            labelId="type"
                            value={type}
                            onChange={(e: React.ChangeEvent<{ value: unknown }>) => { setType(e.target.value as TYPE) }}
                            label="Type"
                        >
                            <MenuItem value={TYPE.ANY}>Any Type</MenuItem>
                            <MenuItem value={TYPE.MULTIPLE}>Multiple Choice</MenuItem>
                            <MenuItem value={TYPE.BOOLEAN}>True / False</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <Box textAlign="right">
                        <Button variant='contained' color='primary' onClick={() => startQuiz()}>Start Quiz</Button>
                    </Box>
                </Grid>
            </Grid>
        </div >
    )
}

export default QuizCategory
