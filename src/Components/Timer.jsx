import { useEffect, useState } from "react";

function pad(d) {
  return d < 10 ? "0" + d.toString() : d.toString();
}

function Timer({ dispatch, secondsRemaining }) {
  const [seconds, setSeconds] = useState(secondsRemaining);
  const min = pad(Math.trunc(seconds / 60));
  const secs = pad(seconds % 60);

  useEffect(
    function () {
      if (seconds <= 0) {
        dispatch({ type: "finished" });
      }

      const intervalId = setInterval(function () {
        setSeconds((sec) => (sec -= 1));
      }, 1000);

      return function effectCleaner() {
        clearInterval(intervalId);
      };
    },

    [dispatch, seconds]
  );
  return <div className="timer">{`${min}:${secs}`}</div>;
}

export default Timer;
