import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';

import { Typography } from "@material-ui/core";

import All from "./all.jpg"
import { Colors } from "../SharedStyles";

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: "center",
        fontWeight: "bold"
    },
    step: {
        display: "flex"
    }
}));

const Rules = () => {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h6" className={classes.title}>Rules</Typography>
            <div>
                <div style={{textAlign: "center"}} >
                    <img src={All} width="95%" />
                </div>
                <ul>
                    <li><Typography variant="body2">The current player is in bold and italic.</Typography></li>
                    <li><Typography variant="body2">In total, each player has 5 rounds.</Typography></li>
                    <li><Typography variant="body2">The theme of the question is stated by a logo and name.</Typography></li>
                    <li><Typography variant="body2">The current player has to choose the difficulty of the question he wants to answer in the given topic.</Typography></li>
                    <li><Typography variant="body2">The difficulty of the question is the number of points the player can win if they answer correctly.</Typography></li>
                    <li><Typography variant="body2">After selecting the difficulty, the question appears and the player needs to answer it. Then click on 'Send' to validate your answer.</Typography></li>
                    <li><Typography variant="body2">Finally the explanation and the answer appears. Once read, click on 'Next'.</Typography></li>
                </ul>
            </div>
        </div>
    );
};

export default Rules;