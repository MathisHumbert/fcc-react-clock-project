import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let coutdown;

const App = () => {
  // session time
  const [time, setTime] = useState(1500);
  const [timeLength, setTimeLength] = useState(25);

  // break time
  const [breakTime, setBreakTime] = useState(300);
  const [breakTimeLength, setBreakTimeLength] = useState(5);

  // flags
  const [start, setStart] = useState(false);
  const [flagTime, setFlagTime] = useState(true);
  const mounted = useRef(false);

  // timer function
  const timer = (seconds) => {
    // clear any interval
    clearInterval(coutdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    coutdown = setInterval(() => {
      // pause
      if (!start) {
        clearInterval(coutdown);
        return;
      }

      const secondsLeft = Math.round((then - Date.now()) / 1000);

      // if time is zero
      if (secondsLeft < 0) {
        clearInterval(coutdown);
        // set session time back to start and launch break time
        if (flagTime) {
          setTime(timeLength * 60);
          setFlagTime(false);
        }
        // set break time back to start and launch session time
        else {
          setBreakTime(breakTimeLength * 60);
          setFlagTime(true);
        }
        return;
      }

      // toggle the time
      if (flagTime) {
        setTime(secondsLeft);
      } else {
        setBreakTime(secondsLeft);
      }
    }, 1000);
  };

  const displayTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? `0${minutes}` : minutes}:${
      remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds
    }`;
    return display;
  };

  const handelStart = () => {
    setStart((oldValue) => !oldValue);
  };

  const resetTime = () => {
    setTime(1500);
    setTimeLength(25);
    setBreakTime(300);
    setBreakTimeLength(5);
    setStart(false);
    setFlagTime(true);
  };

  const toggleTime = (value) => {
    if (value === 'inc') {
      setTimeLength((oldValue) => {
        let newValue = oldValue + 1;
        if (oldValue >= 60) {
          newValue = 60;
        }
        setTime(newValue * 60);
        return newValue;
      });
    } else {
      setTimeLength((oldValue) => {
        let newValue = oldValue - 1;
        if (oldValue <= 1) {
          newValue = 1;
        }
        setTime(newValue * 60);
        return newValue;
      });
    }
  };

  const toggleBreakTime = (value) => {
    if (value === 'inc') {
      setBreakTimeLength((oldValue) => {
        let newValue = oldValue + 1;
        if (oldValue >= 60) {
          newValue = 60;
        }
        setBreakTime(newValue * 60);
        return newValue;
      });
    } else {
      setBreakTimeLength((oldValue) => {
        let newValue = oldValue - 1;
        if (oldValue <= 1) {
          newValue = 1;
        }
        setBreakTime(newValue * 60);
        return newValue;
      });
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (flagTime) {
      timer(time);
    } else {
      timer(breakTime);
    }
  }, [start, flagTime]);

  return (
    <main>
      <h1 className="title">FCC podomoro</h1>
      <Controlers
        toggleTime={toggleTime}
        timeLength={timeLength}
        toggleBreakTime={toggleBreakTime}
        breakTimeLength={breakTimeLength}
      />
      <Clock
        handelStart={handelStart}
        start={start}
        time={time}
        breakTime={breakTime}
        displayTimeLeft={displayTimeLeft}
        resetTime={resetTime}
        flagTime={flagTime}
      />
    </main>
  );
};

const Controlers = ({
  toggleTime,
  timeLength,
  toggleBreakTime,
  breakTimeLength,
}) => {
  return (
    <header className="controlers">
      <div className="controlers-break">
        <h2 id="break-label">Break Length</h2>
        <div className="time-btn-container">
          <button
            id="break-decrement"
            className="time-btn"
            onClick={() => toggleBreakTime('dec')}
          >
            -
          </button>
          <h3 id="break-length" className="controlers-time">
            {breakTimeLength}
          </h3>
          <button
            id="break-increment"
            className="time-btn"
            onClick={() => toggleBreakTime('inc')}
          >
            +
          </button>
        </div>
      </div>
      <div className="controlers-session">
        <h2 id="session-label">Session Length</h2>
        <div className="time-btn-container">
          <button
            id="session-decrement"
            className="time-btn"
            onClick={() => toggleTime('dec')}
          >
            -
          </button>
          <h3 id="session-length" className="controlers-time">
            {timeLength}
          </h3>
          <button
            id="session-increment"
            className="time-btn"
            onClick={() => toggleTime('inc')}
          >
            +
          </button>
        </div>
      </div>
    </header>
  );
};

const Clock = ({
  handelStart,
  start,
  time,
  displayTimeLeft,
  resetTime,
  breakTime,
  flagTime,
}) => {
  return (
    <section className="clock">
      <div className="clock-container">
        <h2 id="timer-label" className="clock-title">
          {flagTime ? 'Session' : 'Break'}
        </h2>
        <div className="clock-container">
          <h1
            id="time-left"
            className={`clock-container-time ${
              flagTime
                ? time < 60
                  ? 'active'
                  : null
                : breakTime < 60
                ? 'active'
                : null
            }`}
          >
            {flagTime ? displayTimeLeft(time) : displayTimeLeft(breakTime)}
          </h1>
        </div>
        <div className="clock-btn-container">
          <button
            id="start_stop"
            className="start-stop-btn"
            onClick={handelStart}
          >
            {start ? 'pause' : 'start'}
          </button>
          <button id="reset" className="reset-btn" onClick={resetTime}>
            reset
          </button>
        </div>
      </div>
    </section>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
