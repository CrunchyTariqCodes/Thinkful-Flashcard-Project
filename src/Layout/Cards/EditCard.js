import React, { useEffect } from "react";
import { useRouteMatch } from "react-router";
import { readCard } from "../../utils/api";
import CardForm from "./CardForm";
import Breadcrumb from "../Breadcrumbs/EditCardBreadcrumb";

const EditCard = ({ deck, card, setCard }) => {
  const { cardId } = useRouteMatch().params;

  useEffect(() => {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    const cleanup = () => abortController.abort;

    const loadCard = async () => {
      try {
        const cardData = await readCard(cardId, abortSignal);
        setCard(cardData);
      } catch (error) {
        if (error.name === "Aborted") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    };

    loadCard();

    return cleanup;
  }, [cardId, setCard]);

  return (
    <div className="container">
      <div className="col">
        <Breadcrumb deck={deck} card={card} />
        <h1>Edit Card</h1>
        <CardForm deck={deck} card={card} setCard={setCard} />
      </div>
    </div>
  );
};

export default EditCard;
