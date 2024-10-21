import React, { useEffect, useRef, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

const Clock = () => {
  const [session, setSession] = useState("25:00");
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [time, setTime] = useState(sessionLength * 60); // Total time in seconds
  const [isRunning, setIsRunning] = useState(false);
  let [isItUnderTow, setisItUnderTow] = useState(false);
  let [isBreakTime, setisBreakTime] = useState(false);
  const audioRef = useRef(new Audio());

  const handeBreackLenghtIcrement = () => {
    if (isRunning || breakLength > 59) {
      return;
    }

    setBreakLength((breakLength) => breakLength + 1);
  };
  const handeBreackLenghtDecrement = () => {
    if (isRunning || breakLength < 2) {
      return;
    }
    setBreakLength((BreakLength) => BreakLength - 1);
  };
  const handeSessnioIcrement = () => {
    if (isRunning || sessionLength > 59) {
      return;
    }
    setSessionLength((sessionLength) => sessionLength + 1);
  };
  const handeSessnioDecrement = () => {
    if (isRunning || sessionLength < 2) {
      return;
    }
    setSessionLength((sessionLength) => sessionLength - 1);
  };

  useEffect(() => {
    setTime(sessionLength * 60);
  }, [sessionLength]);

  // Function to start the timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning((Prev) => (Prev = true));
    } else {
      setIsRunning((Prev) => (Prev = false));
    }
  };

  // Timer logic
  useEffect(() => {
    let interval = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1); // Decrement time by 1
        if (time < 61) {
          setisItUnderTow(true);
        }
      }, 1000);
    } else if (time === 0 && !isBreakTime) {
      audioRef.current.src =
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav";
      audioRef.current.play();
      setTime(breakLength * 60);
      setisBreakTime(true);
      setisItUnderTow(false);
    } else if (time === 0 && isBreakTime) {
      // When the break time ends, play the audio again and stop the timer
      audioRef.current.play();

      // Optionally, reset to the original session time or stop the timer
      setIsRunning(false); // Stop the timer
      setisBreakTime(false); // Reset break mode
    }
    return () => clearInterval(interval);
  }, [isRunning, time, breakLength, isBreakTime]);

  // Format time function (convert seconds to MM:SS format)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const restart = () => {
    setTime(25 * 60);
    setSessionLength(25);
    setisItUnderTow(false);
    setIsRunning(false);
  };

  return (
    <div className="container">
      <div id="app">
        <div className="clock_container">
          <div className="main-title">25 + 5 Clock</div>
          {/* brak leangth and seasion conatiner */}
          <div className="lenght-container ">
            <div className="length-control one">
              <div id="break-label">Break Length</div>

              <div className="flex">
                <button
                  onClick={handeBreackLenghtDecrement}
                  className="btn-level"
                  id="break-decrement"
                  value="-"
                >
                  <i className="fa fa-arrow-down fa-2x"></i>
                </button>

                <div className="btn-level" id="break-length">
                  {breakLength}
                </div>

                <button
                  onClick={handeBreackLenghtIcrement}
                  className="btn-level"
                  id="break-increment"
                  value="+"
                >
                  <i className="fa fa-arrow-up fa-2x"></i>
                </button>
              </div>
            </div>

            <div className="length-control tow">
              <div id="break-label">Session Length</div>

              <div className="flex">
                <button
                  onClick={handeSessnioDecrement}
                  className="btn-level"
                  id="break-decrement"
                  value="-"
                >
                  <i className="fa fa-arrow-down fa-2x"></i>
                </button>

                <div className="btn-level" id="break-length">
                  {sessionLength}
                </div>

                <button
                  onClick={handeSessnioIcrement}
                  className="btn-level"
                  id="break-increment"
                  value="+"
                >
                  <i className="fa fa-arrow-up fa-2x"></i>
                </button>
              </div>
            </div>
          </div>
          {/* timer conatainer */}
          <div className="timer">
            <div className="timer_wrapper">
              <div className="timer_lable">Session</div>
              <div
                className="timer_left"
                style={{ color: isItUnderTow ? "red" : "white" }}
              >
                {formatTime(time)}
              </div>
            </div>
          </div>

          {/* timer controller conatainer */}
          <div className="timer_controller">
            <button className="start_stop">
              <i onClick={startTimer} className="fa fa-play fa-2x"></i>
              <i className="fa fa-pause fa-2x"></i>
            </button>
            <button className="reset">
              <i onClick={restart} className="fa fa-refresh fa-2x"></i>
            </button>
          </div>

          {/*  aothor pages */}
          <div className="author">Coded by Teklu Abayneh</div>
          {/* <audio
            id="beep"
            preload="auto"
            src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
          ></audio> */}
        </div>
      </div>
    </div>
  );
};

export default Clock;
