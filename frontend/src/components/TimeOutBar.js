import { useEffect, useState } from "react";

function TimeOutBar({ onComplete, color }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft < 100) {
      setTimeout(() => {
        setTimeLeft(timeLeft + 0.5);
      }, 50);
    } else {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  return (
    <progress
      className={`progress ${color} w-full h-1`}
      value={timeLeft}
      max="100"
    ></progress>
  );
}

export default TimeOutBar;
