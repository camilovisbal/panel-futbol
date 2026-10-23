import { useState } from "react";
import { teams } from "./data/teams.js";
import { fixtures, TOTAL_ROUNDS } from "./data/fixtures.js";
import { initialMatches } from "./data/matches.js";
import { getCurrentRound, getPendingFixtures } from "./utils/matches.js";
import {
  calculateStandings,
  getQualificationStatus,
  getRecentForm,
  SEMIFINAL_SPOTS,
} from "./utils/standings.js";
import Header from "./components/Header.jsx";
import StandingsTable from "./components/StandingsTable.jsx";
import TeamList from "./components/TeamList.jsx";
import TeamModal from "./components/TeamModal.jsx";
import "./App.css";

const teamsById = Object.fromEntries(teams.map((team) => [team.id, team]));
const MATCHES_PER_TEAM = (teams.length - 1) * 2;

function App() {

  const [matches] = useState(initialMatches);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const pendingFixtures = getPendingFixtures(fixtures, matches);
  const currentRound = getCurrentRound(pendingFixtures, TOTAL_ROUNDS);
  const roundsLeft = TOTAL_ROUNDS - currentRound + 1;

  const standings = calculateStandings(teams, matches);
  const statusById = getQualificationStatus(standings, MATCHES_PER_TEAM);
  const formById = Object.fromEntries(
    teams.map((team) => [team.id, getRecentForm(team.id, matches, fixtures)])
  );

  const selectedTeam = teamsById[selectedTeamId];
  const selectedPosition = standings.findIndex((row) => row.teamId === selectedTeamId) + 1;

  return (
    <div className="app">
      <Header currentRound={currentRound} totalRounds={TOTAL_ROUNDS} />

      <main>
        <section className="section" id="tabla" aria-labelledby="tabla-titulo">
          <div className="section__head">
            <h2 className="section__title" id="tabla-titulo">Tabla de posiciones</h2>
            <p className="section__note">
              {roundsLeft > 0
                ? `Quedan ${roundsLeft} ${roundsLeft === 1 ? "jornada" : "jornadas"} y ${pendingFixtures.length} partidos por jugar.`
                : "La fase regular terminó."}
            </p>
          </div>

          <StandingsTable
            standings={standings}
            teamsById={teamsById}
            formById={formById}
            statusById={statusById}
            semifinalSpots={SEMIFINAL_SPOTS}
            onSelectTeam={setSelectedTeamId}
          />
        </section>

        <TeamList teams={teams} standings={standings} onSelectTeam={setSelectedTeamId} />
      </main>

      {selectedTeam && (
        <TeamModal
          team={selectedTeam}
          standing={standings[selectedPosition - 1]}
          position={selectedPosition}
          onClose={() => setSelectedTeamId(null)}
        />
      )}
    </div>
  );
}

export default App;
