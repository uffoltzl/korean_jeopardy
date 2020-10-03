import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';

import { OrderedListQuestion, Answer } from "../Models/question";
import { Colors } from "../SharedStyles";

const useStyles = makeStyles((theme) => ({
    orderList: {
        display: "flex",
    },
    clicked: {
        backgroundColor: Colors.Blue,
    }
}));

interface OrderedListQuestionComponentProps {
    question: OrderedListQuestion;
    handleExplanation: () => void;
    gameId: string;
}

const OrderedListQuestionComponent = (props: OrderedListQuestionComponentProps) => {
    const classes = useStyles();
    const { question, handleExplanation, gameId } = props;

    const [alreadyAnswered, setAlreadyAnswered] = React.useState<boolean>(false);

    const [orderedAnswers, setOrderedAnswers] = React.useState<Answer[]>(question.possibleAnswers);
    const [answerClicked, setAnswerClicked] = React.useState<string>("");

    const handleResponse = () => {
        var response : string[] = orderedAnswers.map(answer => answer.answerId);
        axios.post("verifyAnswer/verifyOrderedList", { gameId, response });
        setAlreadyAnswered(true);
        handleExplanation();
    }

    const listItemClicked = (answerId: string) => {
        setAnswerClicked(answerId);
    };

    const findIndex = (answerId: string) => {
        for(var i = 0; i < orderedAnswers.length; i++){
            if(orderedAnswers[i].answerId == answerId){
                return i;
            }
        }
        return -1;
    }

    const handleClickUp = () => {
        if(answerClicked != ""){
            var i = findIndex(answerClicked);
            if(i > 0){
                var inter: Answer[] = orderedAnswers;
                var interItem: Answer = inter[i];
                inter[i] = inter[i-1];
                inter[i-1] = interItem;
                setOrderedAnswers(inter);
            }
            setAnswerClicked("");
        }
    };

    const handleClickDown = () => {
        if(answerClicked != ""){
            var i = findIndex(answerClicked);
            if(i < orderedAnswers.length-1){
                var inter: Answer[] = orderedAnswers;
                var interItem: Answer = inter[i];
                inter[i] = inter[i+1];
                inter[i+1] = interItem;
                setOrderedAnswers(inter);
            }
            setAnswerClicked("");
        }
    };
    
    return (
        <div>
            <Typography gutterBottom>
                {question.questionText}
            </Typography>
            <div className={classes.orderList}>
                <List dense component="div" role="list">
                    {orderedAnswers.map((value: Answer) =>
                        <ListItem 
                            key={value.answerId} 
                            role="listitem" 
                            button 
                            disabled={alreadyAnswered || question.alreadyAnswered} 
                            onClick={(event) => listItemClicked(value.answerId)}
                            className={value.answerId == answerClicked ? classes.clicked : ""}
                        >
                            <ListItemText primary={value.textAnswer} />
                        </ListItem>
                    )}
                </List>
                <Button onClick={handleClickUp} disabled={alreadyAnswered || question.alreadyAnswered}><ArrowDropUpRoundedIcon/></Button>
                <Button onClick={handleClickDown} disabled={alreadyAnswered || question.alreadyAnswered}><ArrowDropDownRoundedIcon/></Button>
            </div>
            <Button onClick={handleResponse} disabled={alreadyAnswered} variant="contained">Send</Button>
        </div>
    );
}

export default OrderedListQuestionComponent;
