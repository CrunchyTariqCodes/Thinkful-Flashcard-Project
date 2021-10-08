import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck, updateDeck } from "../../utils/api";

const DeckForm = ({ deck }) => {
  const [formDeck, setFormDeck] = useState(deck);

  useEffect(() => setFormDeck(deck), [setFormDeck, deck]);

  const history = useHistory();
  const toParent = !deck.id ? "/" : "/decks/" + deck.id;

  const handleChange = ({ target }) => {
    const value = target.value;
    setFormDeck({
      ...formDeck,
      [target.name]: value,
    });
  };

  const deckSubmit = async (data, signal) => {
    !deck.id ? await createDeck(data, signal) : await updateDeck(data, signal);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    await deckSubmit(formDeck, abortSignal);
    history.push(toParent);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="form-control"
          name="name"
          value={formDeck.name}
          onChange={handleChange}
          placeholder="Deck Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows="3"
          className="form-control"
          name="description"
          value={formDeck.description}
          onChange={handleChange}
          placeholder="Brief description of the deck"
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

export default DeckForm;
