import React, { useEffect } from "react";
import DeckForm from "../Decks/DeckForm";
import Breadcrumb from "../Breadcrumbs/CreateDeckBreadcrumb";

const CreateDeck = ({ deck, setDeck }) => {
  useEffect(() => {
    const deckTemplate = () => setDeck({ name: "", description: "" });
    deckTemplate();
  }, [setDeck]);

  return (
    <div className="container">
      <Breadcrumb />
      <h1>Create Deck</h1>
      <DeckForm deck={deck} setDeck={setDeck} />
    </div>
  );
};

export default CreateDeck;
