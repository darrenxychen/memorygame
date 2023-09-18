import { useEffect, useState, useRef } from 'react';

export default function Timer({ startTimer }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  const timer = useRef();

  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer.current);
  }, [running]);

  // Call the startTimer function when the component mounts to start the timer.
  useEffect(() => {
    if (startTimer) {
      startTimer(() => setRunning(true));
    }
  }, [startTimer]);

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
        <button className="button" onClick={() => setTime(0)}>
          Restart
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
