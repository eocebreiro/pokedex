import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Navbar } from "./layout/Navbar";
import { Dashboard } from "./layout/Dashboard";
import { Pokemon } from "./components/Pokemon";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/pokemon/:pokemonIndex" element={<Pokemon />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
