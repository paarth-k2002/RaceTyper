import { useCallback, useEffect, useRef, useState } from 'react';

const useCountdownTimer = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const hasTimerEnded = timeLeft <= 0;
  const isRunning = intervalRef.current != null;

  const startCountdown = useCallback(() => {
    if (!hasTimerEnded && !isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
  }, [setTimeLeft, hasTimerEnded, isRunning]);

  const resetCountdown = useCallback(() => {
    clearInterval(intervalRef.current! as unknown as number);
    intervalRef.current = null;
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (hasTimerEnded) {
      clearInterval(intervalRef.current! as unknown as number);
      intervalRef.current = null;
    }
  }, [hasTimerEnded]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current! as unknown as number);
  }, []);

  return { timeLeft, startCountdown, resetCountdown };
};

export default useCountdownTimer;
