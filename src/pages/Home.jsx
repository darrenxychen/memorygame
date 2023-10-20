import { useEffect, useState } from 'react';
import SingleCard from '../components/SingleCard';
import Modal from '../components/Modal';
import './Home.css';

const easyCards = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

const mediumCards = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
  { "src": "/img/axe-1.jpeg", matched: false },
  { "src": "/img/fortnite-1.jpg", matched: false }
]

const hardCards = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
  { "src": "/img/axe-1.jpeg", matched: false },
  { "src": "/img/fortnite-1.jpg", matched: false },
  { "src": "/img/beach-1.jpg", matched: false },
  { "src": "/img/creeper-1.jpg", matched: false }
]

const testCards = [
  { "src": "/img/fortnite-1.jpg", matched: false }
]

let cardImages = [];



function Home() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [difficulty, setDifficulty] = useState("Easy");
  const [difficultyActive, setDifficultyActive] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [gameOverFlag, setGameOverFlag] = useState(false);

  // for the timer
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  //changing colors
  const [color, setColor] = useState("lime");

  //starting timer when first card clicked
  const [hasStarted, setHasStarted] = useState(false);


  let gameOverTimeout;


  //set the card images based on difficulty
  if (difficulty === "Easy") {
    cardImages = easyCards;

  } else if (difficulty === "Medium") {
    cardImages = mediumCards;

  } else if (difficulty === "Test") {
    cardImages = testCards;
  } else {
    cardImages = hardCards;
  }





  //shuffle cards
  const shuffleCards = () => {
    document.getElementById('tutorial').style.display = 'block';

    setMatchedCount(0);

    clearTimeout(gameOverTimeout);

    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setOpenModal(false);
    setChoiceOne(null);
    setDifficultyActive(false);
    setIsShuffling(false);
    setGameOverFlag(false);
    setIsShuffling(true);
    setTimerOn(false);
    setHasStarted(false);

    const cardsSection = document.getElementById("tutorial");
    if (cardsSection) {
      const offset = 100;
      const targetScrollPos = cardsSection.offsetTop + cardsSection.offsetHeight + offset;
      // cardsSection.scrollIntoView
      setTimeout(() => {

        cardsSection.scrollIntoView({ top: targetScrollPos, behavior: "smooth" });
      }, 10);
    }
  }

  //handle a choice
  const handleChoice = (card) => {
    //if choiceOne is null, set choiceOne to card
    //else set choiceTwo to card
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

    if (!hasStarted) {
      setHasStarted(true);
      setTimerOn(true);
      document.getElementById('tutorial').style.display = 'none';
    }
  }

  //compare the two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      //if the two cards match, set matched to true
      if (choiceOne.src === choiceTwo.src) {
        setMatchedCount(matchedCount + 1);

        setCards(prevCards => {
          //returns a new array of cards
          //map method returns a new array based on the previous array (prevCards)
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              //returns new card object with matched set to true
              return { ...card, matched: true };
            }
            else {
              return card;
            }
          })
        })
        resetTurn();
      }
      //if the two cards do not match
      else {
        setTimeout(() => resetTurn(), 650);
      }
    }
  }, [choiceOne, choiceTwo]);

  //check if the game is over
  useEffect(() => {
    if (matchedCount === cardImages.length && !gameOverFlag) {

      setGameOverFlag(true);
      gameOverTimeout = setTimeout(() => {
        setTimerOn(false);
        setOpenModal(true);
      }, 600);

    }

  }, [matchedCount, turns]);

  // reset the choices and then increase a turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  function handleClick() {
    shuffleCards();
    setTime(0);
  }

  // Timer

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);

  }, [timerOn]);



  return (
    <div className="App">
      <h1>The Memory Game</h1>
      {openModal && <Modal closeModal={(setOpenModal)} turns={turns} time={time} />}
      <button className='difficulty-btn' onClick={() => { setDifficulty("Easy"); setDifficultyActive(true); setColor('lime') }}>Easy</button>
      <button className='difficulty-btn' onClick={() => { setDifficulty("Medium"); setDifficultyActive(true); setColor('goldenrod') }}>Medium</button>
      <button className='difficulty-btn' onClick={() => { setDifficulty("Hard"); setDifficultyActive(true); setColor('red') }}>Hard</button>
      <button className='difficulty-btn' onClick={() => { setDifficulty("Test"); setDifficultyActive(true); setColor('purple') }}>Test</button>
      <button className='new-game-btn' onClick={handleClick}>{difficultyActive ? 'Apply' : 'New Game'}</button>
      <p className='turn-style'>Turns: {turns} | Current Difficulty: <span className='difficult-style' style={{ color }}>{difficulty}</span></p>
      <div className='tut-timer'>
        <h3 id='tutorial'>Click a card to start!</h3>
        <div className='Timer' id='timer'>
          {/* minutes, seconds, then milliseconds */}
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>

      </div>




      <div id='card-section' className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            isShuffling={isShuffling}
          />
        ))}
      </div>

    </div >
  );
}

export default Home;
