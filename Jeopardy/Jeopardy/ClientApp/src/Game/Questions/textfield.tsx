import * as React from "react";
import axios from "axios";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";

import { TextfieldQuestion } from "../../Models/question";

interface TextfieldQuestionComponentProps {
    question: TextfieldQuestion;
    handleExplanation: () => void;
    gameId: string;
}

const TextfieldQuestionComponent = (props: TextfieldQuestionComponentProps) => {
    const { question, handleExplanation, gameId } = props;

    const [alreadyAnswered, setAlreadyAnswered] = React.useState<boolean>(false);
    const [response, setResponse] = React.useState<string>("");

    const handleResponse = () => {
        axios.post("verifyAnswer/verifyTextfield", { gameId, response });
        setAlreadyAnswered(true);
        handleExplanation();
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setResponse((event.target as HTMLInputElement).value);
    };
    
    return (
        <div>
            <div>
                <Typography>
                    {question.questionText}
                </Typography>
            </div>
            <div style={{margin: "10px"}}>
            <TextField 
                onChange={handleChange} 
                disabled={alreadyAnswered || question.alreadyAnswered}
            />
            </div>
            <div>
            <Button onClick={handleResponse} disabled={alreadyAnswered || question.alreadyAnswered} variant="contained">Send</Button>
            </div>
        </div>
    );
}

export default TextfieldQuestionComponent;
