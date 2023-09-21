import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled, isShuffling }) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }

  }

  return (
    <div className={`card ${isShuffling ? 'shuffling' : ''}`}>
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img className='front' src={card.src} alt='card front' />
          <img className='back' src="/img/cover.png" onClick={handleClick} alt="card back" />
        </div>
      </div>
    </div>
  )
}

// Work on leaderboard
// Add levels of difficulty
