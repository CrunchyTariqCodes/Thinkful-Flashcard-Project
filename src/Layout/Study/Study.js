import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardDisplay from "../Cards/CardDisplay";
import MinimumCardTotal from "../Cards/MinimumCardTotal";
import Breadcrumb from "../Breadcrumbs/StudyBreadcrumb";

const Study = ({ deck, setDeck, cards, setCards, card, setCard }) => {
  const { deckId } = useRouteMatch().params;

  useEffect(() => {
    const abortController = new AbortController();
    const cleanup = () => abortController.abort;

    const loadStudy = async () => {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
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

    loadStudy();

    return cleanup;
  }, [deckId, setDeck, setCards]);

  const cardDisplay =
    cards.length < 3 ? (
      <MinimumCardTotal deck={deck} cards={cards} />
    ) : (
      <CardDisplay card={card} setCard={setCard} cards={cards} />
    );

  return (
    <div className="container">
      <Breadcrumb deck={deck} />
      <h1>Study: {deck.name}</h1>
      {cardDisplay}
    </div>
  );
};

export default Study;
