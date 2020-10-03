import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

import Rules from "./rules";

import Background from './korea.jpg';

const useStyles = makeStyles((theme) => ({
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
}));

const Home = () => {
  const classes = useStyles();

  const [alignment, setAlignment] = React.useState<string | null>('2');
  const [nameIds, setNameIds] = React.useState<number[]>([1, 2]);
  const [names, setNames] = React.useState<string[]>(["", "", "", ""]);
  const [launchGame, setLaunchGame] = React.useState<boolean>(false);
  const [alreadyClickSend, setAlreadyClickSend] = React.useState<boolean>(false);

  React.useEffect(() => {
      const callBeginGame = async () => {
          const result = await axios.post<string>("/home/beginGame", names.slice(0, nameIds.length));
       window.location.href = "/game/gameId=?" + result.data;
    }

    if (launchGame) {
        callBeginGame();
    }
  }, [launchGame]);

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);

    if(newAlignment != null){
      var tab: number[] = [];
      for(var i = 1; i <= +newAlignment; i++){
        tab.push(i);
      }
      setNameIds(tab);
    }
  };

  const isComplete = () => {
    if(alignment == null) return false;

    for(var i = 0; i < +alignment; i++){
      if(names[i] === ""){
        return false;
      }
    }
    return true;
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(isComplete()){
        setLaunchGame(true);
    }
    else {
        setAlreadyClickSend(true);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newNames = names;
    newNames[+event.target.id] = event.target.value;
    setNames(newNames);
  }

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
