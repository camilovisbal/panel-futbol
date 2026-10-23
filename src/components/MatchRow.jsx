import TeamCrest from "./TeamCrest.jsx";
import { formatShortDate } from "../utils/format.js";

function MatchRow({ match, fixture, homeTeam, awayTeam, onDelete }) {
    return (
        <li className="match-row">
            <span className="match-row__date tabular">{formatShortDate(fixture.date)}</span>

            <span className="match-row__team match-row__team--home">
                <span className="match-row__name">{homeTeam.name}</span>
                <span className="match-row__short">{homeTeam.shortName}</span>
                <TeamCrest team={homeTeam} />
            </span>

            <span className="match-row__score tabular" aria-label={`${match.homeGoals} a ${match.awayGoals}`}>
                {match.homeGoals}–{match.awayGoals}
            </span>

            <span className="match-row__team">
                <TeamCrest team={awayTeam} />
                <span className="match-row__name">{awayTeam.name}</span>
                <span className="match-row__short">{awayTeam.shortName}</span>
            </span>

            <button
                type="button"
                className="match-row__delete"
                onClick={() => onDelete(match.id)}
                aria-label={`Eliminar ${homeTeam.name} ${match.homeGoals} - ${match.awayGoals} ${awayTeam.name}`}
            >
                Eliminar
            </button>
        </li>
    );
}

export default MatchRow;
