import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardList from "../Cards/CardList";
import DeckDetails from "./DeckDetails";
import Breadcrumb from "../Breadcrumbs/DisplayDeckBreadcrumb";

const DisplayDeck = ({ deck, setDeck, cards, setCards }) => {
  const { deckId } = useRouteMatch().params;

  useEffect(() => {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    const cleanup = () => abortController.abort;

    const loadDeck = async () => {
      try {
        const deckData = await readDeck(deckId, abortSignal);
        setDeck(deckData);
        setCards(deckData.cards);
      } catch (error) {
        if (error.name === "Aborted") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    };

    loadDeck();

    return cleanup;
  }, [deckId, setDeck, setCards]);

  return (
    <main className="container">
      <div className="col">
        <Breadcrumb deck={deck} />
        <DeckDetails deck={deck} />
        <CardList cards={cards} />
      </div>
    </main>
  );
};

export default DisplayDeck;
