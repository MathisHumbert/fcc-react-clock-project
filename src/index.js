import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const [time, setTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [start, setStart] = useState(false);

  return (
    <main>
      <h1 className="title">FCC podomoro</h1>
      <Controlers />
      <Clock />
    </main>
  );
};

const Controlers = () => {
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
          <button id="session-decrement" className="time-btn">
            -
          </button>
          <h3 id="session-length" className="controlers-time">
            25
          </h3>
          <button id="session-increment" className="time-btn">
            +
          </button>
        </div>
      </div>
    </header>
  );
};

const Clock = () => {
  return (
    <section className="clock">
      <div className="clock-container">
        <h2 id="time-left" className="clock-title">
          Session
        </h2>
        <div className="clock-container">
          <h1 id="time-left" className="clock-container-time">
            25:00
          </h1>
        </div>
        <div className="clock-btn-container">
          <button id="start_stop" className="start-stop-btn">
            start
          </button>
          <button id="reset" className="reset-btn">
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
