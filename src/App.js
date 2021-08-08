import "./App.css";

//import package to manage routes
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//import react-hooks
import { useState } from "react";

//import package to manage coockies
import Coockies from "js-cookie";

//import pages
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import CharacterComics from "./containers/CharacterComics";
import FavoritesCharacters from "./containers/FavoritesCharacters";
import FavoritesComics from "./containers/FavoritesComics";

//import components
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ModalLogin from "./components/ModalLogin";
import ModalSignup from "./components/ModalSignup";
import Footer from "./components/Footer";

// import and add font awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  const [search, setSearch] = useState("");
  const [modals, setModals] = useState([false, false]);
  const [token, setToken] = useState(Coockies.get("token") || null);

  const setUser = (token) => {
    if (token) {
      Coockies.set("token", token, { expires: 1 });
      setToken(token);
    } else {
      Coockies.remove("token");
      setToken(null);
    }
  };

  return (
    <div className="App">
      <Router>
        <Header
          setUser={setUser}
          tokenId={token}
          search={search}
          setSearch={setSearch}
          modals={modals}
          setModals={setModals}
        />
        <NavBar tokenId={token} setSearch={setSearch} />
        <Switch>
          <Route path="/comics">
            <Comics
              tokenId={token}
              search={search}
              modals={modals}
              setModals={setModals}
            />
          </Route>
          <Route path="/CharacterComics/:id">
            <CharacterComics
              tokenId={token}
              modals={modals}
              setModals={setModals}
            />
          </Route>
          {token && (
            <Route path="/favoritesCharacters">
              <FavoritesCharacters tokenId={token} setSearch={setSearch} />
            </Route>
          )}
          {token && (
            <Route path="/favoritesComics">
              <FavoritesComics tokenId={token} />
            </Route>
          )}
          <Route path="/">
            <Characters
              tokenId={token}
              search={search}
              modals={modals}
              setModals={setModals}
              setSearch={setSearch}
            />
          </Route>
        </Switch>
        {modals[0] && (
          <ModalSignup
            setUser={setUser}
            modals={modals}
            setModals={setModals}
          />
        )}
        {modals[1] && (
          <ModalLogin setUser={setUser} modals={modals} setModals={setModals} />
        )}
      </Router>
      <Footer />
    </div>
  );
}

export default App;
