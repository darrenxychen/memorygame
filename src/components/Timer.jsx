import { useState } from 'react';

export default function Timer() {

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);

  return (
    <div className="stopwatch">
      <p className="timer">
        <div className="actions">
          <button className="button" id="start">Start</button>
          <button className="button" id="stop">Stop</button>
          <button className="button" id="reset">Reset</button>
        </div>
      </p>
    </div>
  )
}

const format = (time) => {
  let hours = Math.floor(time / 60 / 60 % 24);
  let minutes = Math.floor(time / 60 % 60);
  let seconds = Math.floor(time % 60);
  let milliseconds = Math.floor(time * 1000 % 1000);

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  milliseconds = milliseconds < 10 ? `0${milliseconds}` : milliseconds;

  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
