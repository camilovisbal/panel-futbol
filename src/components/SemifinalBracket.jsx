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
        </section>
    );
}

export default SemifinalBracket;
