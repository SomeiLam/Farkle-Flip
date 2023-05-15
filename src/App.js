import { useState, useEffect } from 'react';
import './App.css';
import './components/SingleCard';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disbaled, setDisbaled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleChoice = card => {
    if (choiceOne && choiceOne.id !== card.id) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisbaled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisbaled(true);
      if (choiceOne?.src === choiceTwo?.src) {
        setCards(prevCards => prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true };
          } else {
            return card;
          };
        }));
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), [1000]);
      };
    };
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disbaled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
};

export default App;
