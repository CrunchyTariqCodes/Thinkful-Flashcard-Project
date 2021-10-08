import React from "react";
import Deck from "./Deck.js";

function DeckList({ decks, setDeck }) {
  const totalDecks = decks.map((deck, index) => (
    <Deck key={index} deck={deck} setDeck={setDeck} />
  ));

  return <div className="col">{totalDecks}</div>;
}

export default DeckList;
