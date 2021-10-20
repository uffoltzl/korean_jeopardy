import * as React from "react";
import axios from "axios";

export const useHome = () => {
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

    return {
        alignment,
        handleAlignment,
        onSubmit,
        nameIds,
        alreadyClickSend,
        onChange,
        names,
    }
}