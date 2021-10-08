import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const CardDisplay = ({ card, setCard, cards }) => {
  const history = useHistory();

  const [count, setCount] = useState(1);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const loadCard = () => setCard(cards[count - 1]);
    setFlip(false);
    loadCard();
  }, [setCard, cards, count]);

  const countLimiter = Math.min(count + 1, cards.length);
  const drawNextCard = () => setCount(countLimiter);

  const resetCards = () => {
    const confirm =
      "Reset cards? Click 'Cancel' to return to the home page.";
    const resetConfirm = window.confirm(confirm);
    resetConfirm === true ? setCount(1) : history.push("/");
    setFlip(false);
  };

  const handleNext = () =>
    count === cards.length ? resetCards() : drawNextCard();

  const cardText = flip ? (
    <p className="card-text">{card.back}</p>
  ) : (
    <p className="card-text">{card.front}</p>
  );

  const nextCard = flip ? (
    <button className="card-link btn btn-primary" onClick={() => handleNext()}>
      Next
    </button>
  ) : null;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          Card {count} of {cards.length}
        </h5>
        {cardText}
        <button
          className="card-link btn btn-secondary"
          onClick={() => setFlip(!flip)}
        >
          Flip
        </button>
        {nextCard}
      </div>
    </div>
  );
};

export default CardDisplay;
