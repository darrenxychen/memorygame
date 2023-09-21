import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <><Navigation /><BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<h1>Not Found</h1>} /> {/* 404 page */}
        </Routes>
      </div>
    </BrowserRouter></>

  )


}

export default App;
