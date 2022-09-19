import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Navbar } from "./layout/Navbar";
import { Dashboard } from "./layout/Dashboard";
import { NotFoundPage } from "./layout/NotFoundPage";
import { Pokemon } from "./components/Pokemon";

function App() {
  return (
    <Router>
      <div className="App bg-dark">
        <Navbar />
        <Routes>
          <Route exact path="/pokedex" element={<Dashboard />} />
          <Route
            exact
            path="/pokedex/pokemon/:pokemonIndex"
            element={<Pokemon />}
          />
          <Route path="/pokedex/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate replace to="/pokedex/404" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
