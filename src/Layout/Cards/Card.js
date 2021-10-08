import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

import { deleteCard } from "../../utils/api";

const Card = ({ card }) => {
  const history = useHistory();
  const url = useRouteMatch().url;

  const handleDelete = async () => {
    const confirm = "Delete this card?";
    const deleteConfirm = window.confirm(confirm);
    deleteConfirm === true
      ? (await deleteCard(card.id)) && history.push(url)
      : history.push(url);
    window.location.reload();
  };

  return (
    <div className="card my-2">
      <div className="container mt-2">
        <p className="text-left">{card.front}</p>
      </div>
      <div className="container">
        <p className="text-right">{card.back}</p>
      </div>
      <Link
        to={`/decks/${card.deckId}/cards/${card.id}/edit`}
        className="btn btn-secondary"
      >
        Edit
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Card;
