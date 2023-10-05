import React, { useEffect, useState } from "react";

const TimerCheck = ({ score, setScore, count, setCount, rankings, setRankings }) => {
  const [gameOver, setGameOver] = useState(false); 

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (count === 0 && !gameOver) {
      setGameOver(true);  
      clearInterval(id);
      const userName = prompt("게임이 끝났습니다! 이름을 입력해주세요.");

      if (userName && Array.isArray(rankings)) {
        const newRankings = [...rankings, { name: userName, score }];
        newRankings.sort((a, b) => b.score - a.score);
        const top5Rankings = newRankings.slice(0, 10);  // 상위 5명만 선택
        localStorage.setItem('rankings', JSON.stringify(top5Rankings));
        setRankings(top5Rankings);
      }

      alert("게임 종료");

      // 여기서 게임을 재시작하게 만들기
      setScore(0);  
      setCount(20);  
      setGameOver(false);  
    }

    return () => clearInterval(id);
  }, [count, score, setScore, rankings, setRankings, setCount, gameOver]);  

  return (
      <>
          <div className="timeZone">{count}</div>
          <div className="point">
              <span>점수 : </span>
              <span className="point__num">{score}점</span>
          </div>
      </>
  );
};

export default TimerCheck;
