import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let coutdown;

const App = () => {
  const [time, setTime] = useState(1500);
  const [timeLength, setTimeLength] = useState(25);
  const [breakTime, setBreakTime] = useState(300);
  const [displayBreakTime, setDiplayBreakTime] = useState(5);
  const [start, setStart] = useState(false);
  const mounted = useRef(false);

  const timer = (seconds) => {
    clearInterval(coutdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    coutdown = setInterval(() => {
      if (!start) {
        clearInterval(coutdown);
        return;
      }
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft < 0) {
        clearInterval(coutdown);
        // call break time
        return;
      }
      setTime(secondsLeft);
    }, 1000);
  };

  const displayTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? `0${minutes}` : minutes} : ${
      remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds
    }`;
    return display;
  };

  const handelStart = () => {
    setStart((oldValue) => !oldValue);
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

  const resetTime = () => {
    setTime(1500);
    setTimeLength(25);
    setStart(false);
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    timer(time);
  }, [start]);

  return (
    <main>
      <h1 className="title">FCC podomoro</h1>
      <Controlers toggleTime={toggleTime} timeLength={timeLength} />
      <Clock
        handelStart={handelStart}
        start={start}
        time={time}
        displayTimeLeft={displayTimeLeft}
        resetTime={resetTime}
      />
    </main>
  );
};

const Controlers = ({ toggleTime, timeLength }) => {
  return (
    <header className="controlers">
      <div className="controlers-break">
        <h2 id="break-label">Break Length</h2>
        <div className="time-btn-container">
          <button id="break-decrement" className="time-btn">
            -
          </button>
          <h3 id="break-length" className="controlers-time">
            5
          </h3>
          <button id="break-increment" className="time-btn">
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

const Clock = ({ handelStart, start, time, displayTimeLeft, resetTime }) => {
  return (
    <section className="clock">
      <div className="clock-container">
        <h2 id="time-left" className="clock-title">
          Session
        </h2>
        <div className="clock-container">
          <h1 id="time-left" className="clock-container-time">
            {displayTimeLeft(time)}
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
