import { useState } from "react";
import { teams } from "./data/teams.js";
import { fixtures, TOTAL_ROUNDS } from "./data/fixtures.js";
import { initialMatches } from "./data/matches.js";
import { getCurrentRound, getPendingFixtures } from "./utils/matches.js";
import Header from "./components/Header.jsx";
import TeamList from "./components/TeamList.jsx";
import "./App.css";

function App() {

  const [matches] = useState(initialMatches);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const pendingFixtures = getPendingFixtures(fixtures, matches);
  const currentRound = getCurrentRound(pendingFixtures, TOTAL_ROUNDS);

  return (
    <div className="app">
      <Header currentRound={currentRound} totalRounds={TOTAL_ROUNDS} />

      <main>
        <TeamList teams={teams} onSelectTeam={setSelectedTeamId} />
      </main>
    </div>
  );
}

export default App;
