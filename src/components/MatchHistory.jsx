import MatchRow from "./MatchRow.jsx";
import { ALL_TEAMS } from "../utils/matches.js";
import "./MatchHistory.css";

function MatchHistory({
    teams,
    teamsById,
    fixturesById,
    allMatchesCount,
    matches,
    teamFilter,
    onFilterChange,
    onDelete,
    onClearAll,
    onRestore,
}) {
    // Agrupa los partidos por jornada y deja la más reciente arriba.
    const matchesByRound = matches.reduce((groups, match) => {
        const round = fixturesById[match.fixtureId].round;
        groups[round] = [...(groups[round] ?? []), match];
        return groups;
    }, {});

    const rounds = Object.keys(matchesByRound)
        .map(Number)
        .sort((a, b) => b - a);

    const filteredTeam = teamsById[teamFilter];

    return (
        <section className="section history" id="historial" aria-labelledby="historial-titulo">
            <div className="section__head">
                <h2 className="section__title" id="historial-titulo">Historial de resultados</h2>

                <div className="history__tools">
                    <label className="history__label" htmlFor="team-filter">Filtrar por equipo</label>
                    <select
                        id="team-filter"
                        className="history__select"
                        value={teamFilter}
                        onChange={(event) => onFilterChange(event.target.value)}
                    >
                        <option value={ALL_TEAMS}>Todos los equipos</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {allMatchesCount === 0 && (
                <div className="history__empty">
                    <p className="history__empty-title">Todavía no hay partidos registrados.</p>
                    <p>La tabla está en cero. Registra el primer resultado con el formulario o vuelve a cargar los partidos de las primeras jornadas.</p>
                    <button type="button" className="button" onClick={onRestore}>
                        Cargar resultados iniciales
                    </button>
                </div>
            )}

            {allMatchesCount > 0 && matches.length === 0 && (
                <div className="history__empty">
                    <p className="history__empty-title">{filteredTeam.name} no tiene partidos registrados.</p>
                    <p>Cuando registres un partido suyo aparecerá aquí.</p>
                    <button type="button" className="button button--quiet" onClick={() => onFilterChange(ALL_TEAMS)}>
                        Ver todos los equipos
                    </button>
                </div>
            )}

            {matches.length > 0 && (
                <>
                    <p className="history__count tabular">
                        {filteredTeam
                            ? `${matches.length} partidos de ${filteredTeam.name}`
                            : `${matches.length} partidos registrados`}
                    </p>

                    <div className="history__rounds">
                        {rounds.map((round) => (
                            <div key={round} className="history__round">
                                <h3 className="history__round-title">Jornada {round}</h3>
                                <ul className="history__list">
                                    {matchesByRound[round].map((match) => (
                                        <MatchRow
                                            key={match.id}
                                            match={match}
                                            fixture={fixturesById[match.fixtureId]}
                                            homeTeam={teamsById[match.homeId]}
                                            awayTeam={teamsById[match.awayId]}
                                            onDelete={onDelete}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {allMatchesCount > 0 && (
                <div className="history__reset">
                    <button type="button" className="button button--quiet" onClick={onClearAll}>
                        Borrar todos los resultados
                    </button>
                </div>
            )}
        </section>
    );
}

export default MatchHistory;
