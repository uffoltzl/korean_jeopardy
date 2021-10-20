import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';

import { Paper, Typography } from "@material-ui/core";
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

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

const Error = () => {
    const classes = useStyles();

    return (
        <div className={classes.center} >
            <Paper className={classes.card} elevation={3}>
                <Typography>Game not found</Typography>
                <WarningRoundedIcon />
            </Paper>
        </div>
    );
}

export default Error;