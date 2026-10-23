import TeamCrest from "./TeamCrest.jsx";
import { formatDate } from "../utils/format.js";
import "./SemifinalBracket.css";

function SeedLine({ seed, team, isHome }) {
    return (
        <p className="semifinal__seed">
            <TeamCrest team={team} size="medium" />
            <span className="semifinal__seed-name">{team.name}</span>
            <span className="semifinal__seed-meta tabular">
                {seed.position}.º · {seed.points} pts{isHome ? " · local" : ""}
            </span>
        </p>
    );
}

function SemifinalBracket({ pairs, teamsById, dates, isDecided, roundsLeft }) {
    const hostTeams = pairs.flatMap((pair) => [teamsById[pair.higher.teamId], teamsById[pair.lower.teamId]]);

    return (
        <section className="section semifinal" id="semifinal" aria-labelledby="semifinal-titulo">
            <div className="section__head">
                <h2 className="section__title" id="semifinal-titulo">Semifinal</h2>
                <p className="section__note">
                    {isDecided
                        ? "Terminó la fase regular. Estos son los cruces definitivos."
                        : `Así quedarían los cruces si la liga terminara hoy. ${roundsLeft === 1 ? "Falta 1 jornada" : `Faltan ${roundsLeft} jornadas`} para definirlos.`}
                </p>
            </div>

            <div className="semifinal__ties">
                {pairs.map((pair, index) => {
                    const higherTeam = teamsById[pair.higher.teamId];
                    const lowerTeam = teamsById[pair.lower.teamId];

                    return (
                        <article key={pair.id} className="semifinal__tie">
                            <h3 className="semifinal__tie-title">
                                Llave {index + 1}: {pair.higher.position}.º contra {pair.lower.position}.º
                            </h3>

                            <div className="semifinal__leg">
                                <p className="semifinal__leg-date">Ida, {formatDate(dates.firstLeg)}</p>
                                <SeedLine seed={pair.lower} team={lowerTeam} isHome />
                                <SeedLine seed={pair.higher} team={higherTeam} />
                            </div>

                            <div className="semifinal__leg">
                                <p className="semifinal__leg-date">Vuelta, {formatDate(dates.secondLeg)}</p>
                                <SeedLine seed={pair.higher} team={higherTeam} isHome />
                                <SeedLine seed={pair.lower} team={lowerTeam} />
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="semifinal__band" aria-label="Estadios de los cuatro semifinalistas">
                {hostTeams.map((team) => (
                    <figure key={team.id} className="semifinal__panel">
                        <img
                            src={team.stadiumPhoto.src}
                            alt={`Estadio ${team.stadium} de ${team.name}`}
                            width="1280"
                            height="853"
                            loading="lazy"
                        />
                        <figcaption>{team.stadium}</figcaption>
                    </figure>
                ))}
            </div>
            <p className="semifinal__credits">
                Fotos de Wikimedia Commons:{" "}
                {hostTeams.map((team, index) => (
                    <span key={team.id}>
                        {team.stadiumPhoto.author} (
                        <a href={team.stadiumPhoto.source} target="_blank" rel="noreferrer">
                            {team.stadiumPhoto.license}
                        </a>
                        ){index < hostTeams.length - 1 ? ", " : "."}
                    </span>
                ))}
            </p>
        </section>
    );
}

export default SemifinalBracket;
