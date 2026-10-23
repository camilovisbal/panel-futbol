import { useState } from "react";
import { teams } from "./data/teams.js";
import { fixtures, SEMIFINAL_DATES, TOTAL_ROUNDS } from "./data/fixtures.js";
import { initialMatches } from "./data/matches.js";
import {
  ALL_TEAMS,
  filterMatchesByTeam,
  getCurrentRound,
  getNextMatchId,
  getPendingFixtures,
} from "./utils/matches.js";
import {
  calculateStandings,
  getQualificationStatus,
  getRecentForm,
  getSemifinalPairs,
  SEMIFINAL_SPOTS,
} from "./utils/standings.js";
import { getTournamentSummary } from "./utils/summary.js";
import Header from "./components/Header.jsx";
import TournamentSummary from "./components/TournamentSummary.jsx";
import StandingsTable from "./components/StandingsTable.jsx";
import SemifinalBracket from "./components/SemifinalBracket.jsx";
import MatchForm from "./components/MatchForm.jsx";
import MatchResult from "./components/MatchResult.jsx";
import PendingMatches from "./components/PendingMatches.jsx";
import MatchHistory from "./components/MatchHistory.jsx";
import TeamList from "./components/TeamList.jsx";
import TeamModal from "./components/TeamModal.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

const teamsById = Object.fromEntries(teams.map((team) => [team.id, team]));
const fixturesById = Object.fromEntries(fixtures.map((fixture) => [fixture.id, fixture]));
const MATCHES_PER_TEAM = (teams.length - 1) * 2;
const EMPTY_FORM = { homeId: "", awayId: "", homeGoals: "", awayGoals: "" };

function App() {

  const [matches, setMatches] = useState(initialMatches);
  const [matchForm, setMatchForm] = useState(EMPTY_FORM);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [lastMatchId, setLastMatchId] = useState(null);
  const [teamFilter, setTeamFilter] = useState(ALL_TEAMS);

  const pendingFixtures = getPendingFixtures(fixtures, matches);
  const currentRound = getCurrentRound(pendingFixtures, TOTAL_ROUNDS);
  const roundsLeft = TOTAL_ROUNDS - currentRound + 1;

  const standings = calculateStandings(teams, matches);
  const statusById = getQualificationStatus(standings, MATCHES_PER_TEAM);
  const semifinalPairs = getSemifinalPairs(standings);
  const summary = getTournamentSummary(matches);
  const biggestWin = summary.biggestWin;
  const formById = Object.fromEntries(
    teams.map((team) => [team.id, getRecentForm(team.id, matches, fixtures)])
  );

  const selectedTeam = teamsById[selectedTeamId];
  const selectedPosition = standings.findIndex((row) => row.teamId === selectedTeamId) + 1;

  const lastMatch = matches.find((match) => match.id === lastMatchId);
  const lastFixture = lastMatch && fixturesById[lastMatch.fixtureId];

  const visibleMatches = filterMatchesByTeam(matches, teamFilter);

  const handleFormChange = (field, value) => {
    setMatchForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const handleRegisterMatch = (fixture, homeGoals, awayGoals) => {
    const newMatch = {
      id: getNextMatchId(matches),
      fixtureId: fixture.id,
      homeId: fixture.homeId,
      awayId: fixture.awayId,
      homeGoals,
      awayGoals,
    };

    setMatches((currentMatches) => [...currentMatches, newMatch]);
    setLastMatchId(newMatch.id);
    setMatchForm(EMPTY_FORM);
  };

  const handlePickFixture = (fixture) => {
    setMatchForm({ ...EMPTY_FORM, homeId: fixture.homeId, awayId: fixture.awayId });
    document.getElementById("home-goals").focus();
  };

  const handleDeleteMatch = (matchId) => {
    setMatches((currentMatches) => currentMatches.filter((match) => match.id !== matchId));
  };

  const handleClearMatches = () => {
    setMatches([]);
    setTeamFilter(ALL_TEAMS);
  };

  const handleRestoreMatches = () => {
    setMatches(initialMatches);
    setLastMatchId(null);
  };

  return (
    <div className="app">
      <Header currentRound={currentRound} totalRounds={TOTAL_ROUNDS} />

      <main>
        <TournamentSummary
          playedCount={matches.length}
          totalCount={fixtures.length}
          summary={summary}
          leader={standings[0]}
          leaderTeam={teamsById[standings[0].teamId]}
          biggestWinTeams={
            biggestWin && { home: teamsById[biggestWin.homeId], away: teamsById[biggestWin.awayId] }
          }
          biggestWinRound={biggestWin && fixturesById[biggestWin.fixtureId].round}
        />

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
            hasMatches={matches.length > 0}
            onSelectTeam={setSelectedTeamId}
          />
        </section>

        <SemifinalBracket
          pairs={semifinalPairs}
          teamsById={teamsById}
          dates={SEMIFINAL_DATES}
          isDecided={pendingFixtures.length === 0}
          roundsLeft={roundsLeft}
        />

        <section className="section" id="registrar" aria-labelledby="registrar-titulo">
          <div className="section__head">
            <h2 className="section__title" id="registrar-titulo">Registrar partido</h2>
            <p className="section__note">
              Elige local y visitante, escribe el marcador y la tabla se actualiza al instante.
            </p>
          </div>

          <div className="register">
            <div className="register__main">
              <MatchForm
                teams={teams}
                fixtures={fixtures}
                matches={matches}
                values={matchForm}
                onChange={handleFormChange}
                onRegister={handleRegisterMatch}
              />

              {lastMatch && (
                <MatchResult
                  key={lastMatch.id}
                  match={lastMatch}
                  homeTeam={teamsById[lastMatch.homeId]}
                  awayTeam={teamsById[lastMatch.awayId]}
                  fixture={lastFixture}
                />
              )}
            </div>

            <PendingMatches
              pendingFixtures={pendingFixtures}
              teamsById={teamsById}
              onPick={handlePickFixture}
            />
          </div>
        </section>

        <MatchHistory
          teams={teams}
          teamsById={teamsById}
          fixturesById={fixturesById}
          allMatchesCount={matches.length}
          matches={visibleMatches}
          teamFilter={teamFilter}
          onFilterChange={setTeamFilter}
          onDelete={handleDeleteMatch}
          onClearAll={handleClearMatches}
          onRestore={handleRestoreMatches}
        />

        <TeamList teams={teams} standings={standings} onSelectTeam={setSelectedTeamId} />
      </main>

      <Footer />

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
