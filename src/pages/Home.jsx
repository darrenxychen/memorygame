import { useEffect, useState } from 'react';
import SingleCard from '../components/SingleCard';
import Timer from '../components/Timer';
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
  const [clickedStart, setClickedStart] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [difficultyActive, setDifficultyActive] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOverFlag, setGameOverFlag] = useState(false);

  let gameOverTimeout;


  //set the card images based on difficulty
  if (difficulty === "easy") {
    cardImages = easyCards;
  } else if (difficulty === "medium") {
    cardImages = mediumCards;

  } else if (difficulty === "test") {
    cardImages = testCards;
  } else {
    cardImages = hardCards;
  }

  //shuffle cards
  const shuffleCards = () => {
    setMatchedCount(0);
    setGameOverFlag(false);
    setIsShuffling(true);
    setIsRunning(true);
    clearTimeout(gameOverTimeout);

    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setClickedStart(true);
    setOpenModal(false);
    setChoiceOne(null);
    setDifficultyActive(false);
    setIsShuffling(false);
  }

  //handle a choice
  const handleChoice = (card) => {
    //if choiceOne is null, set choiceOne to card
    //else set choiceTwo to card
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
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
        setOpenModal(true);
        console.log('game over');
        setIsRunning(false);

      }, 600);
    }

    // Clear the timeout when the component unmounts or when a new game starts
    return () => clearTimeout(gameOverTimeout);
  }, [matchedCount, turns]);

  // reset the choices and then increase a turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  function stopTimer(time) {
    console.log('Timer stopped at: ', time);
  }

  return (
    <div className="App">
      <h1>The Memory Game</h1>
      {openModal && <Modal closeModal={(setOpenModal)} />}
      {/* <button className='open-modal-btn' onClick={() => { setOpenModal(true) }}>modal test</button> */}
      <button className='difficulty-btn' onClick={() => { setDifficulty("easy"); setDifficultyActive(true); }}>Easy</button>
      <button className='difficulty-btn' onClick={() => { setDifficulty("medium"); setDifficultyActive(true); }}>Medium</button>
      <button className='difficulty-btn' onClick={() => { setDifficulty("hard"); setDifficultyActive(true); }}>Hard</button>
      <button className='difficulty-btn' onClick={() => { setDifficulty("test"); setDifficultyActive(true); }}>Test</button>
      <button className='new-game-btn' onClick={shuffleCards}>{difficultyActive ? 'Apply' : 'New Game'}</button>
      <p>current difficulty: {difficulty}</p>
      {clickedStart && <Timer
        stopTimer={stopTimer}
        isRunning={isRunning}
      />}
      <p>Turns: {turns}</p>


      <div className="card-grid">
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
