import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Navigation from './components/Navigation';
import About from './pages/About';

const App = () => {
  return (
    <><Navigation /><BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1>Not Found</h1>} /> {/* 404 page */}
        </Routes>
      </div>
    </BrowserRouter></>

  )


}

export default App;
