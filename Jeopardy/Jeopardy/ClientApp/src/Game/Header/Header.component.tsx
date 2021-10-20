import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Badge, Grid } from "@material-ui/core";

import { Team } from "../../Models/team";
import Help from "./Help.component";
import { Colors } from "../../SharedStyles";

const useStyles = makeStyles((theme) => ({
    teamName: {
        textAlign: "center",
    },
    isTurn: {
        fontWeight: "bold",
        fontStyle: "italic",
    },
    isNotTurn: {
        color: Colors.Grey
    }
}));

interface HeaderProps {
    round: number;
    gameId: string;
    step: number;
}

const Header = (props: HeaderProps) => {
    const classes = useStyles();
    const { round, gameId, step } = props;
    
    const [teams, setTeams] = React.useState<Team[]>([]);
    const [calculatedRound, setCaluldatedRound] = React.useState<number>(0);
    React.useEffect(() => {
        const getTeams = async () => {
            const result = await axios.get<Team[]>("/game/getTeams", { params: { gameId }});
            setTeams(result.data);
            setCaluldatedRound(Math.floor((round-1)/result.data.length) + 1);
        };

        getTeams();
    }, [round]);
    
    return (
        <AppBar style={{background: "black"}}>
            <Toolbar>
                
                <Help 
                    round={calculatedRound}
                    step={step}
                />

                <Grid container>
                    {teams.map((team) => {
                        return (
                            <Grid item xs={3} className={classes.teamName}>
                                <Typography variant="h6" className={team.isTurn ? classes.isTurn : classes.isNotTurn}>
                                    <Badge badgeContent={team.points} color="secondary">
                                        {team.name}
                                    </Badge>
                                </Typography>
                            </Grid>
                    )})}
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;