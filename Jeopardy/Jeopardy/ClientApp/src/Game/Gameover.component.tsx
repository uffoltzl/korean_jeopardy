import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import { Paper, Typography } from "@material-ui/core";
import EmojiEmotionsRoundedIcon from '@material-ui/icons/EmojiEmotionsRounded';

import { Team } from "../Models/team";

const useStyles = makeStyles({
    center: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    card: {
        textAlign: "center",
        padding: "20px",
    },
});

interface GameoverProps {
    gameId: string;
}

const Gameover = (props: GameoverProps) => {
    const classes = useStyles();
    const { gameId } = props;
    const [winners, setWinners] = React.useState<Team[]>();

    React.useEffect(() => {
        const getWinners = async () => {
            const result = await axios.get<Team[]>("/game/getWinner", { params: { gameId }});
            setWinners(result.data);
        }

        getWinners();
    }, []);

    return (
        <div className={classes.center} >
            <Paper className={classes.card} elevation={3}>
                <Typography>End of the game</Typography>
                {winners && winners.length === 1 && 
                    <Typography variant="h5">
                        The winner is {winners[0].name}
                    </Typography>
                }
                {winners && winners.length > 1 &&
                    <Typography variant="h5">
                        The winners are {winners.map((winner, index) => 
                            (index !== 0 ? " and " : "") + winner.name
                        )}
                    </Typography>
                }
                <EmojiEmotionsRoundedIcon />
            </Paper>
        </div>
    );
}

export default Gameover;