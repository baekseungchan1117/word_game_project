import React from 'react';

const Leaderboard = ({ rankings }) => {
    return (
      <div className="leaderboard">
        <h2 className='leader__title'>백과사전 왕</h2>
        <ul className='leader__ul'>
          {Array.isArray(rankings) && rankings.length > 0 ? (
            rankings.map((ranking, index) => (
              <li key={index}>{index + 1}. {ranking.name}: {ranking.score} 점</li>
            ))
          ) : (
            <li>No rankings available.</li>
          )}
        </ul>
      </div>
    );
  };
  

export default Leaderboard;
