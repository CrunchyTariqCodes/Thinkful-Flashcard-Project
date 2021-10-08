import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import Breadcrumb from "../Breadcrumbs/EditDeckBreadcrumb";

export default function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const initialDeckForm = {
    name: "",
    description: "",
  };
  const [deckForm, setDeckForm] = useState({ ...initialDeckForm });

  useEffect(() => {
    const ac = new AbortController();
    async function getDeck() {
      const deck = await readDeck(deckId, ac.signal);
      setDeck(deck);
      setDeckForm({
        name: deck.name,
        description: deck.description,
      });
    }
    getDeck();
  }, [deckId]);

  const handleChange = (event) => {
    const value = event.target.value;
    setFormDeck({
      ...formDeck,
      [event.target.name]: value,
    });
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    deck.name = deckForm.name;
    deck.description = deckForm.description;
    const abortController = new AbortController();
    async function updatedDeck() {
      await updateDeck(deck, abortController.signal);
      setDeck(deck);
    }
    updatedDeck();
    history.push(`/decks/${deckId}`);
  };

  return (
    <React.Fragment>
      <Breadcrumb deck={deck} breadCrumbText="Edit Deck" />
      <h2>Edit Deck</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <textarea
            className="form-control"
            id="name"
            name="name"
            rows="3"
            onChange={handleChange}
            value={deckForm.name}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            onChange={handleChange}
            value={deckForm.description}
          ></textarea>
        </div>
        <button className="btn btn-secondary mr-2" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary mr-2" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}
