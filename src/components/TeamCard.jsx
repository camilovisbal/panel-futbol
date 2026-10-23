import TeamCrest from "./TeamCrest.jsx";
import "./TeamCard.css";

function TeamCard({ team, position, points, onSelect }) {
    return (
        <li className="team-card">
            <button type="button" className="team-card__open" onClick={() => onSelect(team.id)}>
                <TeamCrest team={team} size="large" />
                <span className="team-card__name">{team.name}</span>
                <span className="team-card__meta">{team.city} · {team.country}</span>
                {position > 0 && (
                    <span className="team-card__rank">
                        {position}.º con {points} {points === 1 ? "punto" : "puntos"}
                    </span>
                )}
            </button>
        </li>
    );
}

export default TeamCard;
