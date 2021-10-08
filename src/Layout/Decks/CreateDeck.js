import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import Breadcrumb from "../Breadcrumbs/CreateDeckBreadcrumb";

export default function CreateDeck() {
  const history = useHistory();
  const [deckForm, setDeckForm] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function addDeck() {
      const newDeck = await createDeck(deckForm, abortController.signal);
      setDeckForm({
        name: "",
        description: "",
      });
      history.push(`/decks/${newDeck.id}`);
    }
    addDeck();
  };

  const handleCancel = () => {
    history.push("/");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setDeckForm({
      ...deokForm,
      [event.target.name]: value,
    });
  };

  return (
    <React.Fragment>
      <Breadcrumb />
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            id="name"
            name="name"
            rows="3"
            placeholder="Deck Name"
            onChange={handleChange}
            value={deckForm.name}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            placeholder="Brief description of the deck"
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
