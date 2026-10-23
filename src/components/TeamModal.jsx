import TeamCrest from "./TeamCrest.jsx";
import "./TeamModal.css";

const POSITION_GROUPS = [
    { code: "POR", label: "Porteros" },
    { code: "DEF", label: "Defensas" },
    { code: "MED", label: "Mediocampistas" },
    { code: "DEL", label: "Delanteros" },
];

function TeamModal({ team, standing, position, onClose }) {
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            onClose();
        }
    };

    return (
        <div className="team-modal" onClick={handleBackdropClick} onKeyDown={handleKeyDown}>
            <div
                className="team-modal__panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="team-modal-title"
                tabIndex={-1}
            >
                <button
                    type="button"
                    className="team-modal__close"
                    onClick={onClose}
                    aria-label="Cerrar detalle del equipo"
                    autoFocus
                >
                    Cerrar
                </button>

                <figure className="team-modal__photo">
                    <img
                        src={team.stadiumPhoto.src}
                        alt={`Estadio ${team.stadium}, casa de ${team.name}`}
                        width="1280"
                        height="853"
                    />
                    <figcaption>
                        {team.stadium}. Foto: {team.stadiumPhoto.author},{" "}
                        <a href={team.stadiumPhoto.source} target="_blank" rel="noreferrer">
                            {team.stadiumPhoto.license}
                        </a>
                    </figcaption>
                </figure>

                <div className="team-modal__body">
                    <div className="team-modal__title-row">
                        <TeamCrest team={team} size="medium" />
                        <h2 className="team-modal__title" id="team-modal-title">{team.name}</h2>
                    </div>

                    <dl className="team-modal__facts">
                        <div>
                            <dt>Técnico</dt>
                            <dd>{team.coach}</dd>
                        </div>
                        <div>
                            <dt>Ciudad</dt>
                            <dd>{team.city}, {team.country}</dd>
                        </div>
                        <div>
                            <dt>Fundación</dt>
                            <dd className="tabular">{team.founded}</dd>
                        </div>
                        {standing && (
                            <div>
                                <dt>En la tabla</dt>
                                <dd className="tabular">
                                    {position}.º · {standing.points} pts · {standing.played} PJ
                                </dd>
                            </div>
                        )}
                    </dl>

                    <h3 className="team-modal__squad-title">Plantilla 2026/27</h3>
                    <div className="team-modal__squad">
                        {POSITION_GROUPS.map((group) => (
                            <section key={group.code} className="team-modal__group">
                                <h4>{group.label}</h4>
                                <ul>
                                    {team.players
                                        .filter((player) => player.position === group.code)
                                        .sort((a, b) => a.number - b.number)
                                        .map((player) => (
                                            <li key={player.number}>
                                                <span className="team-modal__number tabular">{player.number}</span>
                                                {player.name}
                                            </li>
                                        ))}
                                </ul>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamModal;
