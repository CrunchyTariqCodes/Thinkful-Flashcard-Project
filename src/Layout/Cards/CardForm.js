import React from "react";
import { Link, useHistory } from "react-router-dom";
import { createCard, updateCard } from "../../utils/api";

const CardForm = ({ card, setCard }) => {
  const history = useHistory();
  const toParent = "/decks/" + card.deckId;

  const handleChange = ({ target }) => {
    const value = target.value;
    setCard({
      ...card,
      [target.name]: value,
    });
  };

  const cardSubmit = async (data, signal) => {
    !card.id
      ? await createCard(card.deckId, data, signal)
      : await updateCard(data, signal);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    await cardSubmit(card, abortSignal);
    history.push(toParent);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label htmlFor="Front">Front</label>
        <textarea
          rows="3"
          className="form-control"
          id="front"
          name="front"
          onChange={handleChange}
          value={card.front}
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          rows="3"
          className="form-control"
          id="back"
          name="back"
          onChange={handleChange}
          value={card.back}
        />
      </div>
      <Link to={toParent} type="button" className="btn btn-secondary px-2">
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary px-2 mx-1">
        Submit
      </button>
    </form>
  );
};

export default CardForm;
