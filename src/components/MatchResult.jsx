import TeamCrest from "./TeamCrest.jsx";
import { formatDate } from "../utils/format.js";
import "./MatchResult.css";

function MatchResult({ match, homeTeam, awayTeam, fixture }) {
    return (
        <article className="match-result" aria-live="polite">
            <p className="match-result__title">
                Resultado registrado · Jornada {fixture.round}, {formatDate(fixture.date)}
            </p>

            <div className="match-result__board">
                <div className="match-result__team">
                    <TeamCrest team={homeTeam} size="large" />
                    <span className="match-result__name">{homeTeam.name}</span>
                </div>

                <p className="match-result__score tabular" aria-label={`${match.homeGoals} a ${match.awayGoals}`}>
                    <span>{match.homeGoals}</span>
                    <span className="match-result__dash" aria-hidden="true">–</span>
                    <span>{match.awayGoals}</span>
                </p>

                <div className="match-result__team match-result__team--away">
                    <TeamCrest team={awayTeam} size="large" />
                    <span className="match-result__name">{awayTeam.name}</span>
                </div>
            </div>
        </article>
    );
}

export default MatchResult;
