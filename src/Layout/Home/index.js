import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../../utils/api";
import DeckList from "../Decks/DeckList";

function Home({ setDeck }) {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDecks() {
      const allDecks = await listDecks(abortController.signal);
      setDecks(allDecks);
    }
    fetchDecks();
  }, []);

  return (
    <div>
      <div className="actions mx-2 my-2">
        <Link to="/decks/new">
          <button type="button" className="btn btn-secondary">
            Create Deck
          </button>
        </Link>
      </div>
      <div>
        <DeckList decks={decks} setDeck={setDeck} />
      </div>
    </div>
  );
}

export default Home;
