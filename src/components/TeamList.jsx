import TeamCard from "./TeamCard.jsx";
import "./TeamList.css";

function TeamList({ teams, standings = [], onSelectTeam }) {
    return (
        <section className="team-list" id="equipos" aria-labelledby="equipos-titulo">
            <div className="section__head">
                <h2 className="section__title" id="equipos-titulo">Los diez clubes</h2>
                <p className="team-list__note">Toca un escudo para ver la plantilla, el técnico y el estadio.</p>
            </div>

            <ul className="team-list__grid">
                {teams.map((team) => {
                    const position = standings.findIndex((row) => row.teamId === team.id) + 1;
                    const points = standings[position - 1]?.points ?? 0;

                    return (
                        <TeamCard
                            key={team.id}
                            team={team}
                            position={position}
                            points={points}
                            onSelect={onSelectTeam}
                        />
                    );
                })}
            </ul>
        </section>
    );
}

export default TeamList;
