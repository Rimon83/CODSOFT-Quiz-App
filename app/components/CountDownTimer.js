"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CountdownTimer = ({quiz, setShowResult, result, setResult}) => {
  const { correctAnswer, wrongAnswer } = result;
  const requiredMinutes = quiz.length * 1;
  const [timeLeft, setTimeLeft] = useState({
    minutes: requiredMinutes,
    seconds: 0,
  });
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);


  useEffect(() => {
    const countdown = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft((prevState) => ({
          ...prevState,
          seconds: prevState.seconds - 1,
        }));
      } else if (timeLeft.minutes > 0) {
        setTimeLeft((prevState) => ({
          minutes: prevState.minutes - 1,
          seconds: 59,
        }));
      } else {
        clearInterval(countdown);
        if (correctAnswer + wrongAnswer !== quiz.length) {
          const missing = quiz.length - (correctAnswer + wrongAnswer);
          setResult((prev) => ({
            ...prev,
            wrongAnswer: prev.wrongAnswer + missing,
          }));
        }

        setShowResult(true);

        // Timer has ended, you can trigger an event or update the UI as needed
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft.minutes === 1 && timeLeft.seconds === 0) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 5000); // Show warning for 5 second
    
   }
  }, [timeLeft]);

  return (
    <div className="flex flex-col -mb-[2rem]">
      <div className="self-end mr-4 text-2xl bg-gray-100 p-2 rounded-md">
        <p>
          {timeLeft.minutes.toString().padStart(2, "0")}:
          {timeLeft.seconds.toString().padStart(2, "0")}
        </p>
      </div>
      <div>
        {showWarning && (
          <div className="text-red-500 text-center mt-5 text-2xl">Warning: Last minute of the timer!</div>
         )} 
      </div>
    </div>
  );
    
};

export default CountdownTimer;
