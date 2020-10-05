import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import { Question, QuestionType, MultipleChoiceQuestion, RadioQuestion, TextfieldQuestion, SliderQuestion, OrderedListQuestion } from "../Models/question";
import MultipleChoiceQuestionComponent from "./Questions/multipleChoice";
import SliderQuestionComponent from "./Questions/slider";
import RadioQuestionComponent from "./Questions/radio";
import TextfieldQuestionComponent from "./Questions/textfield";
import OrderedListQuestionComponent from "./Questions/orderedList";

import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import TranslateRoundedIcon from '@material-ui/icons/TranslateRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import AccessibilityNewRoundedIcon from '@material-ui/icons/AccessibilityNewRounded';
import TvRoundedIcon from '@material-ui/icons/TvRounded';


import { List, ListItem, ListSubheader, ListItemText, Grid, Typography, Paper, Button } from "@material-ui/core";
import { CategoryType } from "../Models/category";


const useStyles = makeStyles((theme) => ({
    center: {
        position: "absolute",
        top:"10%",
        width: "95%",
        margin: "10px"
    },
    card: {
        textAlign: "center",
        padding: "10px",
    },
    title: {
        display: "flex"
    }
}));

interface BoardProps {
    gameId: string;
    themeColor: string;
    next: number;
    newRound: () => void;
    nextStep: () => void;
}

const Board = (props: BoardProps) => {
    const classes = useStyles();
    const { gameId, themeColor, next, newRound, nextStep } = props;
    const [currentCategory, setCurrentCategory] = React.useState<CategoryType>();
    const [availableQuestions, setAvailableQuestions] = React.useState<boolean[]>([]);
    const [question, setQuestion] = React.useState<Question | null>(null);
    const [printExplanation, setPrintExplanation] = React.useState<boolean>(false);
    const [diff, setDiff] = React.useState<number>(0);

    React.useEffect(() => {
        const getAvailableQuestions = async () => {
            const result = await axios.get<boolean[]>("/game/getAvailableQuestions", { params: { gameId }});
            setAvailableQuestions(result.data);
        };

        const getCurrentQuestion = async () => {
            const result = await axios.get<Question>("/game/getCurrentQuestion", { params: { gameId }});
            if(result.data) {
                nextStep();
                setQuestion(result.data);
                setDiff(result.data.difficulty);
                setPrintExplanation(result.data.alreadyAnswered);
                if(result.data.alreadyAnswered){
                    nextStep();
                }
                setAvailableQuestions([false, false, false, false, false]);
            }
            else {
                getAvailableQuestions();
            }
        };

        if(currentCategory === undefined){
            getCurrentQuestion();
        }
    }, [currentCategory]);

    React.useEffect(() => {
        setDiff(0);
        setPrintExplanation(false);
        setQuestion(null);
        setAvailableQuestions([]);
        setCurrentCategory(undefined);

        const getCategory = async () => {
            const result = await axios.get<CategoryType>("/game/getCategory", { params: { gameId }});
            setCurrentCategory(result.data);
        };

        getCategory();
    }, [next]);

    const handleClick = async (difficulty: number) => {
        nextStep();
        const result = await axios.get<Question>("/game/getQuestion", { params: { gameId, difficulty }});
        setQuestion(result.data);
        setDiff(difficulty);
    };

    const handleExplanation = () => {
        nextStep();
        setPrintExplanation(true);
    }

    return (
        <Grid container spacing={2} className={classes.center}>
            <Grid item xs={12}>
            {currentCategory === CategoryType.Food && <div className={classes.title}><FastfoodRoundedIcon /> <Typography>Food</Typography></div>}
            {currentCategory === CategoryType.Language && <div className={classes.title}><TranslateRoundedIcon /><Typography>Language</Typography></div>}
            {currentCategory === CategoryType.History && <div className={classes.title}><ScheduleRoundedIcon /><Typography>History</Typography></div>}
            {currentCategory === CategoryType.Education && <div className={classes.title}><MenuBookRoundedIcon /><Typography>Education</Typography></div>}
            {currentCategory === CategoryType.Society && <div className={classes.title}><AccessibilityNewRoundedIcon /><Typography>Society</Typography></div>}
            {currentCategory === CategoryType.Tv && <div className={classes.title}><TvRoundedIcon /><Typography>Tv</Typography></div>}
            </Grid>
            <Grid item xs={2}>
                <Paper className={classes.card} elevation={3}>
                <List
                    component="nav"
                    subheader={
                        <ListSubheader component="div">
                            Difficulty
                        </ListSubheader>
                    }
                >
                {
                    availableQuestions.map((availableQuestion, index) => 
                        <ListItem 
                            button 
                            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => 
                                handleClick(5-index)} 
                            disabled={diff == 0 ? availableQuestion : true} 
                            key={index}
                            style={diff == 0 ? {} : diff == 5-index ? {backgroundColor: themeColor} : {}}
                        >
                            <ListItemText>{5-index}</ListItemText>
                        </ListItem>
                    )
                }
                </List>
                </Paper>
            </Grid>
            <Grid item xs={5}>
                {question && 
                    <Paper className={classes.card} elevation={3}>
                        {question.questionType === QuestionType.MultipleChoice && (
                            <MultipleChoiceQuestionComponent
                                question={question as MultipleChoiceQuestion}
                                handleExplanation={handleExplanation}
                                gameId={gameId}
                            />
                        )}
                        {question.questionType === QuestionType.Radio && (
                            <RadioQuestionComponent
                                question={question as RadioQuestion}
                                handleExplanation={handleExplanation}
                                gameId={gameId}
                            />
                        )}
                        {question.questionType === QuestionType.Textfield && (
                            <TextfieldQuestionComponent
                                question={question as TextfieldQuestion}
                                handleExplanation={handleExplanation}
                                gameId={gameId}
                            />
                        )}
                        {question.questionType === QuestionType.Slider && (
                            <SliderQuestionComponent
                               question={question as SliderQuestion}
                                handleExplanation={handleExplanation}
                                gameId={gameId}
                            />
                        )}
                        {question.questionType === QuestionType.OrderedList && (
                            <OrderedListQuestionComponent
                               question={question as OrderedListQuestion}
                                handleExplanation={handleExplanation}
                                gameId={gameId}
                            />
                        )}
                    </Paper>
                }
            </Grid>
            <Grid item xs={5}>
                {printExplanation && question && 
                    <Paper className={classes.card} elevation={3}>
                        <Typography>{question.explanation}</Typography>
                        <Button onClick={newRound} variant="contained">Next</Button>
                    </Paper>
                }
            </Grid>
        </Grid>
    );
}

export default Board;