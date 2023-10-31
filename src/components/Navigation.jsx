import './Navigation.css';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className='navigation'>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
      </ul>

    </nav>
  )


};
