import React from "react";
import Card from "./Card";

const CardList = ({ cards }) => {
  const allCards = cards.map((card, index) => <Card key={index} card={card} />);

  return (
    <div>
      <div className="row mt-4">
        <div className="col">
          <h3>Cards</h3>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">{allCards}</div>
      </div>
    </div>
  );
};

export default CardList;
