import "./TournamentSummary.css";

function TournamentSummary({ playedCount, totalCount, summary, leader, leaderTeam, biggestWinTeams, biggestWinRound }) {
    const { totalGoals, averageGoals, biggestWin } = summary;
    const hasMatches = playedCount > 0;

    return (
        <section className="section summary" aria-labelledby="resumen-titulo">
            <div className="summary__text">
                <h2 className="summary__title" id="resumen-titulo">El torneo en números</h2>

                <dl className="summary__list">
                    <div className="summary__row">
                        <dt className="tabular">{playedCount}</dt>
                        <dd>partidos jugados de los {totalCount} del calendario.</dd>
                    </div>
                    <div className="summary__row">
                        <dt className="tabular">{totalGoals}</dt>
                        <dd>
                            {hasMatches
                                ? `goles en total, ${averageGoals.toFixed(2).replace(".", ",")} por partido.`
                                : "goles: todavía no se ha jugado ningún partido."}
                        </dd>
                    </div>
                    <div className="summary__row">
                        <dt className="tabular">{leader.points}</dt>
                        <dd>
                            {hasMatches
                                ? `puntos tiene ${leaderTeam.name}, líder del torneo.`
                                : "puntos tienen todos los equipos por ahora."}
                        </dd>
                    </div>
                    <div className="summary__row">
                        <dt className="tabular">
                            {biggestWin ? `${biggestWin.homeGoals}–${biggestWin.awayGoals}` : "–"}
                        </dt>
                        <dd>
                            {biggestWin
                                ? `es la goleada más amplia: ${biggestWinTeams.home.name} contra ${biggestWinTeams.away.name}, en la jornada ${biggestWinRound}.`
                                : "todavía no hay partidos con ganador."}
                        </dd>
                    </div>
                    <div className="summary__row">
                        <dt className="tabular">{totalCount - playedCount}</dt>
                        <dd>partidos quedan por jugar.</dd>
                    </div>
                </dl>
            </div>

            {hasMatches && (
                <figure className="summary__photo" key={leaderTeam.id}>
                    <img
                        src={leaderTeam.stadiumPhoto.src}
                        alt={`Estadio ${leaderTeam.stadium}, casa del líder ${leaderTeam.name}`}
                        width="1280"
                        height="853"
                        loading="lazy"
                    />
                    <figcaption>
                        {leaderTeam.stadium}, casa del líder. Foto: {leaderTeam.stadiumPhoto.author},{" "}
                        <a href={leaderTeam.stadiumPhoto.source} target="_blank" rel="noreferrer">
                            {leaderTeam.stadiumPhoto.license}
                        </a>
                    </figcaption>
                </figure>
            )}
        </section>
    );
}

export default TournamentSummary;
