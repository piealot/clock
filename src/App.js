import { useEffect, useRef, useState } from "react";
import "./App.css";
import ChangeButtons from "./ChangeButtons.js";
import Timer from "./Timer.js";
import Button from "@mui/joy/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faRotate, faPause } from "@fortawesome/free-solid-svg-icons";
import beep from "./beep.mp3";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [appState, setAppState] = useState({
    running: false,
    remainingTime: 1500,
    current: "Session",
  });

  const audioRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (appState.running) {
        if (appState.remainingTime > 0) {
          setAppState({
            ...appState,
            remainingTime: appState.remainingTime - 1,
          });
        } else if (appState.current === "Session") {
          audioRef.current.play();
          setAppState({
            ...appState,
            current: "Break",
            remainingTime: breakLength * 60,
          });
        } else {
          setAppState({
            ...appState,
            current: "Session",
            remainingTime: sessionLength * 60,
          });
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [appState, breakLength, sessionLength]);

  useEffect(() => {
    if (appState.running === false) {
      setAppState({
        ...appState,
        remainingTime: sessionLength * 60,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionLength]);

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="control">
        <div className="break">
          <p id="break-label">Break Length</p>
          <ChangeButtons
            id={"break"}
            value={breakLength}
            setValue={setBreakLength}
            state={appState}
          />
        </div>
        <div className="session">
          <p id="session-label">Session Length</p>
          <ChangeButtons
            id={"session"}
            value={sessionLength}
            setValue={setSessionLength}
            state={appState}
          />
        </div>
      </div>

      <Timer
        timeLeft={appState.remainingTime}
        totalTime={appState.current === "Session" ? sessionLength : breakLength}
        text={appState.current}
      />
      <div className="buttons">
        <Button
          onClick={() => {
            console.log("aaa");
            setAppState({
              ...appState,
              running: !appState.running,
            });
          }}
          id="start_stop"
        >
          <FontAwesomeIcon icon={appState.running ? faPause : faPlay} />
        </Button>
        <Button
          onClick={() => {
            setBreakLength(5);
            setSessionLength(25);
            setAppState({
              ...appState,
              remainingTime: 1500,
              running: false,
              current: "Session",
            });
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }}
          id="reset"
        >
          <FontAwesomeIcon icon={faRotate} />
        </Button>
      </div>
      <audio id="beep" src={beep} ref={audioRef} />
    </div>
  );
}

export default App;
