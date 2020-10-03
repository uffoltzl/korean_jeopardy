import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import { CategoryType } from "../Models/category";
import Header from "./Header/header";
import Board from "./board";
import Gameover from "./gameover";
import { Colors } from "../SharedStyles";
import { UpdateRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    page: {
        position: "absolute",
        height: '100vh',
        width: "100%",
        top: "0",
        left: "0",
    },
    icon: {
        color: "black"
    }
}));

const Game = () => {
    const classes = useStyles();
    var tmp = window.location.href.indexOf("gameId=?")+8;
    var gameId = window.location.href.slice(tmp, window.location.href.length);

    const [pageRefresh, setPageRefresh] = React.useState<boolean>(true);

    const [themeColor, setThemeColor] = React.useState<string>(Colors.Red);
    const [round, setRound] = React.useState<number>(0);
    const [stopGame, setStopGame] = React.useState<number>(0);
    const [step, setStep] = React.useState<number>(0);
    const [nextCat, setNextCat] = React.useState<number>(0);

    React.useEffect(() => {
        const getStopGame = async () => {
            const result = await axios.get<number>("/game/getStopGame", { params: { gameId }});
            setStopGame(result.data);
        }

        const getRound = async () => {
            const result = await axios.get<number>("/game/getRound", { params: { gameId }});
            setRound(result.data);
        }

        const updateRound = async () => {
            axios.post("/game/nextRound", { gameId }).then(() => setNextCat(nextCat+1))
        }

        if(round == 0){
            getStopGame();
            getRound();
        }
        else {
            if(!pageRefresh){
                updateRound();
            }
            else {
                setPageRefresh(false);
            }
        }
    }, [round]);

    const newRound = () => {
        setRound(round+1);
        setStep(0);
    };

    const nextStep = () => {
        setStep(step+1);
    }

    return (
        <div className={classes.page} style={{backgroundColor: themeColor}}>
            <Header
                round={round}
                gameId={gameId}
                step={step}
            />

            {round < stopGame && 
                <Board
                    gameId={gameId}
                    themeColor={themeColor}
                    next={nextCat}
                    newRound={newRound}
                    nextStep={nextStep}        
                />
            }

            {round >= stopGame && 
                <Gameover
                    gameId={gameId}
                />
            }
        </div>
    );
}

export default Game;