import './Leaderboard.css';
import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState({
    easy: [
      { id: 1, name: 'Alice', time: '02:15', turns: 10 },
      { id: 2, name: 'Bob', time: '01:30', turns: 8 },

    ],
    medium: [
      { id: 3, name: 'Charlie', time: '03:00', turns: 12 },

    ],
    hard: [
      { id: 4, name: 'David', time: '04:00', turns: 15 },

    ],
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');

  const itemsPerPage = 10;

  const filteredData = leaderboardData[selectedDifficulty].filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleDifficultyChange = event => {
    setSelectedDifficulty(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select value={selectedDifficulty} onChange={handleDifficultyChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th className="rank-title">Rank</th>
            <th className="name">Name</th>
            <th>Turns</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((player, index) => (
            <tr key={player.id}>
              <td className="rank">{index + 1}</td>
              <td className="name">{player.name}</td>
              <td className="turns">{player.turns}</td>
              <td>{player.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;