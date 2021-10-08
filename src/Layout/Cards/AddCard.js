import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardForm from "./CardForm";
import Breadcrumb from "../Breadcrumbs/AddCardBreadcrumb";

const AddCard = ({ deck, setDeck, card, setCard }) => {
  const { deckId } = useRouteMatch().params;

  useEffect(() => {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    const loadDeck = async () => {
      try {
        const deckData = await readDeck(deckId, abortSignal);
        setDeck(deckData);
      } catch (error) {
        if (error.name === "Aborted") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    };
    const loadBlankCard = () =>
      setCard({ front: "", back: "", deckId: deckId });

    loadDeck();
    loadBlankCard();
  }, [deckId, setDeck, setCard]);

  return (
    <div className="container">
      <div className="col">
        <Breadcrumb deck={deck} />
        <h2>{deck.name}: Add Card</h2>
        <CardForm deck={deck} card={card} setCard={setCard} />
      </div>
    </div>
  );
};

export default AddCard;
