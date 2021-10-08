import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home/index"
import Study from "./Study/Study"
import DisplayDeck from "./Decks/DisplayDeck"
import CreateDeck from "./Decks/CreateDeck"
import EditDeck from "./Decks/EditDeck"
import AddCard from "./Cards/AddCard"
import EditCard from "./Cards/EditCard"
import NotFound from "./NotFound";

function Layout() {
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home setDeck={setDeck} />
          </Route>
          <Route path="/decks/new">
            {" "}
            <CreateDeck deck={deck} setDeck={setDeck} />
          </Route>
          <Route exact path="/decks/:deckId">
            <DisplayDeck
              deck={deck}
              setDeck={setDeck}
              card={card}
              setCard={setCard}
              cards={cards}
              setCards={setCards}
            />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck deck={deck} setDeck={setDeck} />
          </Route>
          <Route path="/decks/:deckId/study">
            {" "}
            <Study
              deck={deck}
              setDeck={setDeck}
              card={card}
              setCard={setCard}
              cards={cards}
              setCards={setCards}
            />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard
              deck={deck}
              setDeck={setDeck}
              card={card}
              setCard={setCard}
            />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard deck={deck} card={card} setCard={setCard} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
