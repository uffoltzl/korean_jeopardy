import * as React from "react";
import axios from "axios";

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

import { RadioQuestion } from "../../Models/question";

interface RadioQuestionComponentProps {
    question: RadioQuestion;
    handleExplanation: () => void;
    gameId: string;
}

const RadioQuestionComponent = (props: RadioQuestionComponentProps) => {
    const { question, handleExplanation, gameId } = props;

    const [alreadyAnswered, setAlreadyAnswered] = React.useState<boolean>(false);
    
    const [response, setResponse] = React.useState<string>("");
    React.useEffect(() => {
        if(question.possibleAnswers.length > 0){
            setResponse(question.possibleAnswers[0].answerId);
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setResponse((event.target as HTMLInputElement).value);
    };

    const handleResponse = () => {
        axios.post("verifyAnswer/verifyRadio", { gameId, response });
        setAlreadyAnswered(true);
        handleExplanation();
    };

    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">{question.questionText}</FormLabel>
                <RadioGroup value={response} onChange={handleChange}>
                    {question.possibleAnswers.length == 0 && 
                        <FormControlLabel
                            control={<Radio />}
                            value="error"
                            label="Error, no answer available for this question"
                            disabled
                    />}

                    {question.possibleAnswers.map(answer =>      
                        <FormControlLabel 
                            key={answer.answerId}
                            value={answer.answerId} 
                            control={<Radio />} 
                            label={answer.textAnswer} 
                            disabled={alreadyAnswered || question.alreadyAnswered}              
                        />)}
                </RadioGroup>
                <Button onClick={handleResponse} disabled={alreadyAnswered || question.alreadyAnswered} variant="contained">Send</Button>
            </FormControl>
        </div>
    );
}

export default RadioQuestionComponent;
