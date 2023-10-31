import './Leaderboard.css'
import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([
    { id: 1, name: 'Alice', time: '02:15', turns: 10 },
    { id: 2, name: 'Bob', time: '01:30', turns: 8 },
    { id: 3, name: 'Charlie', time: '03:00', turns: 12 },
    // ... more data
  ]);
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
            <th>Turns</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.time}</td>
              <td>{player.turns}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
