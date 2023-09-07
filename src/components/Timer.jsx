import { useEffect, useState } from 'react';

export default function Timer() {

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);

  const timer = useRef();

  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        setTime(pre => pre + 1)
      }, 1000)
    }
  }, [running]);

  return (
    <div className="stopwatch">
      <p className="timer">{format(time)}</p>
      <div className="actions">
        <button onClick={() => {
          if (running) clearInterval(timer.current);
          setRunning(!running);
        }}>{running ? 'Stop' : 'Resume'}</button>
        <button className="button" onClick={() => setTime(0)}>Restart</button>
      </div>

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
