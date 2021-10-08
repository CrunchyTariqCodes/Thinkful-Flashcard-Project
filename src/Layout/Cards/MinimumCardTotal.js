import React from "react";
import { Link } from "react-router-dom";

const MinimumCardTotal = ({ deck, cards }) => {
  return (
    <div className="container">
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {cards.length} cards in
        this deck.
      </p>
      <div className="col">
        <Link
          to={`/decks/${deck.id}/cards/new`}
          className="btn btn-primary"
        >
          Add Card
        </Link>
      </div>
    </div>
  );
};

export default MinimumCardTotal;
