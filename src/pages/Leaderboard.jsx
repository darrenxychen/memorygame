import './Leaderboard.css'
import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([
    { id: 1, name: 'Alice', time: '02:15', turns: 10 },
    { id: 2, name: 'Bob', time: '01:30', turns: 8 },
    { id: 3, name: 'Charlie', time: '03:00', turns: 12 },
    // ... more data
  ]);

  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = leaderboardData.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <div className='search-bar'>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th className='rank-title'>Rank</th>
            <th className='name'>Name</th>
            <th>Turns</th>
            <th>Time</th>

          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player, index) => (
            <tr key={player.id}>
              <td className='rank'>{index + 1}</td>
              <td className='name'>{player.name}</td>
              <td className='turns'>{player.turns}</td>
              <td>{player.time}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
