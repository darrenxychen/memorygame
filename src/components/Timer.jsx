import { useEffect, useState, useRef } from 'react';

export default function Timer({ isRunning, timerReset }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(isRunning);
  const timer = useRef();

  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer.current);
  }, [running]);

  useEffect(() => {
    if (timerReset) {
      setTime(0);
      setRunning(false);
    } else {
      setRunning(true);
    }


  }, [timerReset]);


  return (
    <div className="stopwatch">
      <p className="timer">{format(time)}</p>
      <div className="actions">
        <button
          onClick={() => {
            if (running) {
              clearInterval(timer.current);
              setRunning(false); // Stop the timer
            } else {
              setRunning(true); // Resume the timer
            }
          }}
        >
          {running ? 'Stop' : 'Resume'}
        </button>
      </div>
    </div>
  );
}

const format = (time) => {
  let minutes = Math.floor((time / 60) % 60);
  let seconds = Math.floor(time % 60);

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return minutes + ':' + seconds;
};
