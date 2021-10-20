import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

import Rules from "./Rules.component";
import { useHome } from "./useHome.hook";

import Background from '../assets/korea.jpg';

const useStyles = makeStyles({
  page: {
    height: '100vh',
  },
  centerV: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  logIn: {
    height: "52%",
    width: "60%",
    textAlign: "center",
    padding: "20px",
  },
});

const Home = () => {
  const classes = useStyles();
  const {
    alignment,
    handleAlignment,
    onSubmit,
    nameIds,
    alreadyClickSend,
    onChange,
    names,
  } = useHome();


  return (
    <Grid container spacing={2} className={classes.page}>
      <Grid item xs={12} sm={8} md={5}>
        <Rules/>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.centerV}>
        <Paper className={classes.logIn} elevation={3}>
          <Typography>
            Number of participants/teams
          </Typography>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="2" aria-label="left aligned">
              2
            </ToggleButton>
            <ToggleButton value="3" aria-label="centered">
              3
            </ToggleButton>
            <ToggleButton value="4" aria-label="right aligned">
              4
            </ToggleButton>
          </ToggleButtonGroup>
          <br /> <br />
          <Typography>
            Names of the participants/teams
          </Typography>
          <form onSubmit={onSubmit} noValidate autoComplete="off">
            <Grid container>
            {nameIds.map((nameId, index) =>
              <Grid item xs={6}>
                <TextField 
                    error={names[index] == "" && alreadyClickSend}
                    key={nameId.toString()} 
                    onChange={onChange} 
                    id={(nameId - 1).toString()} 
                    label={"Name" + nameId.toString()} 
                    inputProps={{ maxLength: 18 }}
                />
              </Grid>
            )}
            </Grid>
            <br /> <br />
            <Fab color="secondary" type="submit" >
              <PlayArrowRoundedIcon />
            </Fab>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Home;
