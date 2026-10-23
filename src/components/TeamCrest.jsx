import "./TeamCrest.css";

function TeamCrest({ team, size = "small" }) {
    return (
        <span className={`crest crest--${size}`}>
            <img src={team.crest} alt={`Escudo de ${team.name}`} loading="lazy" />
        </span>
    );
}

export default TeamCrest;
