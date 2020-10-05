import * as React from "react";
import axios from "axios";

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

import { SliderQuestion } from "../../Models/question";

interface SliderQuestionComponentProps {
    question: SliderQuestion;
    handleExplanation: () => void;
    gameId: string;
}

const SliderQuestionComponent = (props: SliderQuestionComponentProps) => {
    const { question, handleExplanation, gameId } = props;

    const [alreadyAnswered, setAlreadyAnswered] = React.useState<boolean>(false);

    const [response, setResponse] = React.useState<number>(0);
    React.useEffect(() => {
        setResponse(question.beginAnswer);
    }, []);

    const handleResponse = () => {
        axios.post("verifyAnswer/verifySlider", { gameId, response });
        setAlreadyAnswered(true);
        handleExplanation();
    }

    const handleChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        if(typeof value == "number"){
            setResponse(value);
        }
    };
    
    return (
        <div>
            <Typography gutterBottom>
                {question.questionText}
            </Typography>
            <Slider
                defaultValue={question.beginAnswer}
                marks
                min={question.beginAnswer}
                max={question.endAnswer}
                step={question.step}
                valueLabelDisplay="auto"
                style={{width: "95%"}}
                disabled={alreadyAnswered || question.alreadyAnswered}
                onChange={handleChange}
            />
            <Button onClick={handleResponse} disabled={alreadyAnswered || question.alreadyAnswered} variant="contained">Send</Button>
        </div>
    );
}

export default SliderQuestionComponent;
