import React, { useState } from "react";
import TextBox from "./TextBox";
import TimerCheck from "./TimerCheck";
import Leaderboard from "./Leaderboard";


const Game = () => {
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(20);
  const [rankings, setRankings] = useState(() => {
    const savedRankings = localStorage.getItem("rankings");
    if (savedRankings) {
      try {
        const parsed = JSON.parse(savedRankings);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error("Error parsing rankings from localStorage", error);
        return [];
      }
    } else {
      return [];
    }
  });

  const resetTimer = () => setCount(20);
  const incrementScore = () => setScore(score + 10);

  return (
    <>
      <div>
        <TextBox
          incrementScore={incrementScore}
          resetTimer={resetTimer}
          score={score}
        />
        <TimerCheck
          score={score}
          setScore={setScore}
          count={count}
          setCount={setCount}
          rankings={rankings}
          setRankings={setRankings}
        />
      </div>
      <div>
        <Leaderboard rankings={rankings} />
      </div>
    </>
  );
};

export default Game;
