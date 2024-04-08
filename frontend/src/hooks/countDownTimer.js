import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CountdownTimer({ targetDate, productName }) {
  const calculateTimeRemaining = (targetDate) => Math.max(new Date(targetDate) - new Date(), 0);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetDate));
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimeRemaining = calculateTimeRemaining(targetDate);
      setTimeRemaining(newTimeRemaining);

      // Check if the timer has reached 0 and not already deleted => send a requeset to change the status to the producs plus
      // move the ownership to the highest bid user
      if (newTimeRemaining === 0 && !deleted) {

        setDeleted(true);

      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate, productName, deleted]);

  const days = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

  return (
    <div className="countdown mt--15">
      <div className="countdown-container days">
        <span className="countdown-value">{days} D</span>
      </div>
      <div className="countdown-container hours">
        <span className="countdown-value">{hours} H</span>
      </div>
      <div className="countdown-container minutes">
        <span className="countdown-value">{minutes} M</span>
      </div>
      <div className="countdown-container seconds">
        <span className="countdown-value">{seconds} S</span>
      </div>
    </div>
  );
}

export default CountdownTimer;
