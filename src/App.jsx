import { useState } from "react";
import { fixtures, TOTAL_ROUNDS } from "./data/fixtures.js";
import { initialMatches } from "./data/matches.js";
import { getCurrentRound, getPendingFixtures } from "./utils/matches.js";
import Header from "./components/Header.jsx";
import "./App.css";

function App() {

  const [matches] = useState(initialMatches);

  const pendingFixtures = getPendingFixtures(fixtures, matches);
  const currentRound = getCurrentRound(pendingFixtures, TOTAL_ROUNDS);

  return (
    <div className="app">
      <Header currentRound={currentRound} totalRounds={TOTAL_ROUNDS} />
    </div>
  );
}

export default App;
