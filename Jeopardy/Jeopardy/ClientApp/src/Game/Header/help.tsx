import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';

import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import { IconButton, Dialog, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    helpButton: {
        color: "white",
    },
    dialogTitle: {
        margin: "10px",
        marginBottom: "0",
    },
    dialogPlayer: {
        margin: "10px",
        marginTop: "0",
        fontWeight: "bold",
        fontStyle: "italic"
    },
    dialogInfo: {
        marginLeft: "10px",
        marginRight: "10px",
        marginBottom: "15px"
    },
}));

interface HelpProps {
    round: number;
    step: number;
}

const Help = (props: HelpProps) => {
    const classes = useStyles();
    const { round, step } = props;

    const [openDialog, setOpenDialog] = React.useState<boolean>(false);

    const handleOpen = () => {
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
    }

    return (
        <div>
            <IconButton className={classes.helpButton} onClick={handleOpen} >
                <HelpOutlineRoundedIcon fontSize="large"/>
            </IconButton >
            <Dialog open={openDialog} onClose={handleClose} >
                <Typography variant="h5" className={classes.dialogTitle}>Round {round}/5</Typography>
                <Typography variant="body2" className={classes.dialogPlayer}>
                    The current player is in bold and italic.
                </Typography>
                <Typography variant="body2" className={classes.dialogInfo} >The theme of the question is stated by a logo and name.</Typography>
                {step == 0 && 
                    <Typography variant="body2" className={classes.dialogInfo} >
                        The current player has to choose the difficulty of the question he wants to answer in the given topic. The difficulty of the question is the number of points the player can win if they answer correctly.
                    </Typography>
                }
                {step == 1 && 
                    <Typography variant="body2" className={classes.dialogInfo} >
                        The question has appeared, the current player needs to answer it. To validate the answer, click on 'Send'.
                    </Typography>
                }
                {step == 2 && 
                    <Typography variant="body2" className={classes.dialogInfo} >
                        The explanation of the answer has appeared. Once read, click on 'Next'.
                    </Typography>
                }
            </Dialog>
        </div>
    )
}

export default Help;