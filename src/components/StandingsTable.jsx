import TeamCrest from "./TeamCrest.jsx";
import "./StandingsTable.css";

const FORM_LABELS = { G: "Ganó", E: "Empató", P: "Perdió" };
const STATUS_LABELS = { clasificado: "Clasificado", eliminado: "Eliminado" };

function StandingsTable({ standings, teamsById, formById, statusById, semifinalSpots, hasMatches, onSelectTeam }) {
    return (
        <div className="standings">
            {!hasMatches && (
                <p className="standings__empty" role="status">
                    Todavía no hay partidos registrados. Todos los equipos están en cero y se ordenan por nombre.
                </p>
            )}

            <div className="standings__scroll">
                <table className="standings__table">
                    <caption className="visually-hidden">
                        Tabla de posiciones ordenada por puntos, diferencia de goles y goles a favor
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col" className="standings__pos"><abbr title="Posición">#</abbr></th>
                            <th scope="col" className="standings__team">Equipo</th>
                            <th scope="col"><abbr title="Partidos jugados">PJ</abbr></th>
                            <th scope="col"><abbr title="Ganados">G</abbr></th>
                            <th scope="col"><abbr title="Empatados">E</abbr></th>
                            <th scope="col"><abbr title="Perdidos">P</abbr></th>
                            <th scope="col"><abbr title="Goles a favor">GF</abbr></th>
                            <th scope="col"><abbr title="Goles en contra">GC</abbr></th>
                            <th scope="col"><abbr title="Diferencia de goles">DG</abbr></th>
                            <th scope="col" className="standings__points"><abbr title="Puntos">Pts</abbr></th>
                            <th scope="col" className="standings__form">Últimos 5</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((row, index) => {
                            const team = teamsById[row.teamId];
                            const position = index + 1;
                            const status = statusById[row.teamId];
                            const inSemifinalZone = position <= semifinalSpots;

                            return (
                                <tr
                                    key={row.teamId}
                                    className={[
                                        "standings__row",
                                        inSemifinalZone ? "standings__row--zone" : "",
                                        position === semifinalSpots ? "standings__row--cut" : "",
                                    ].join(" ")}
                                >
                                    <td className="standings__pos tabular">{position}</td>
                                    <th scope="row" className="standings__team">
                                        <button type="button" onClick={() => onSelectTeam(team.id)}>
                                            <TeamCrest team={team} />
                                            <span className="standings__name">{team.name}</span>
                                            <span className="standings__short">{team.shortName}</span>
                                            {status && (
                                                <span className={`standings__status standings__status--${status}`}>
                                                    {STATUS_LABELS[status]}
                                                </span>
                                            )}
                                        </button>
                                    </th>
                                    <td className="tabular">{row.played}</td>
                                    <td className="tabular">{row.won}</td>
                                    <td className="tabular">{row.drawn}</td>
                                    <td className="tabular">{row.lost}</td>
                                    <td className="tabular">{row.goalsFor}</td>
                                    <td className="tabular">{row.goalsAgainst}</td>
                                    <td className="tabular">
                                        {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                                    </td>
                                    <td className="standings__points tabular">{row.points}</td>
                                    <td className="standings__form">
                                        <span className="form">
                                            {formById[row.teamId].map((result, formIndex) => (
                                                <span
                                                    key={formIndex}
                                                    className={`form__item form__item--${result}`}
                                                    title={FORM_LABELS[result]}
                                                >
                                                    {result}
                                                </span>
                                            ))}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <p className="standings__legend">
                <span className="standings__swatch" aria-hidden="true"></span>
                Los {semifinalSpots} primeros juegan la semifinal. Victoria 3 puntos, empate 1, derrota 0.
            </p>
        </div>
    );
}

export default StandingsTable;
