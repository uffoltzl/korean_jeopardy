import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import { MultipleChoiceQuestion } from "../../Models/question";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
}));

interface MultipleChoiceQuestionComponentProps {
    question: MultipleChoiceQuestion;
    handleExplanation: () => void;
    gameId: string;
}

const MultipleChoiceQuestionComponent = (props: MultipleChoiceQuestionComponentProps) => {
    const classes = useStyles();
    const { question, handleExplanation, gameId } = props;

    const [alreadyAnswered, setAlreadyAnswered] = React.useState<boolean>(false);

    const [response, setResponse] = React.useState<string[]>([]);

    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        var inter = response;
        if(checked){
            inter.push((event.target as HTMLInputElement).value);
        }
        else {
            const i = inter.indexOf((event.target as HTMLInputElement).value);
            if(i > -1){
                inter.slice(i, 1);
            }
        }
        setResponse(inter);
    };

    const handleResponse = () => {
        axios.post("verifyAnswer/verifyMultipleChoice", { gameId, response });
        setAlreadyAnswered(true);
        handleExplanation();
    }
    
    return (
        <div>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{question.questionText}</FormLabel>
                <FormGroup>
                    {question.possibleAnswers.length === 0 && 
                        <FormControlLabel
                        control={<Checkbox onChange={() => {}} />}
                        label="Error, no answer available for this question"
                        disabled
                    />}

                    {question.possibleAnswers.map(answer =>                     
                        <FormControlLabel
                            key={answer.answerId}
                            control={<Checkbox onChange={handleChecked} />}
                            label={answer.textAnswer}
                            disabled={alreadyAnswered || question.alreadyAnswered}
                            value={answer.answerId}
                        />)}
                </FormGroup>
                <Button onClick={handleResponse} disabled={alreadyAnswered || question.alreadyAnswered} variant="contained">Send</Button>
            </FormControl>
        </div>
    );
}

export default MultipleChoiceQuestionComponent;
