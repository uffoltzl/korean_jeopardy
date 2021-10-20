import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import Header from "./Header/header";
import Board from "./board";
import Gameover from "./gameover";
import Error from "./error";
import { Colors } from "../SharedStyles";

const useStyles = makeStyles({
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
});

const Game = () => {
    const classes = useStyles();
    var tmp = window.location.href.indexOf("gameId=?")+8;
    var gameId = window.location.href.slice(tmp, window.location.href.length);

    const [pageRefresh, setPageRefresh] = React.useState<boolean>(true);

    const [themeColor, setThemeColor] = React.useState<string>(Colors.Red);
    const [round, setRound] = React.useState<number>(-2);
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

        if(round === -2){
            getStopGame();
            getRound();
        }
        else if(round !== -1){
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
            {round === -1 && <Error/>}

            {round !== -1 && round !== -2 && <div>
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

            </div>}
        </div>
    );
}

export default Game;