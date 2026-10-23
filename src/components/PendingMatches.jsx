import { useState } from "react";
import TeamCrest from "./TeamCrest.jsx";
import { formatShortDate } from "../utils/format.js";
import "./PendingMatches.css";

function PendingMatches({ pendingFixtures, teamsById, onPick }) {
    const [selectedRound, setSelectedRound] = useState(null);

    const pendingRounds = [...new Set(pendingFixtures.map((fixture) => fixture.round))].sort((a, b) => a - b);

    if (pendingRounds.length === 0) {
        return (
            <aside className="pending" aria-labelledby="pendientes-titulo">
                <h3 className="pending__title" id="pendientes-titulo">Partidos pendientes</h3>
                <p className="pending__done">Ya se jugaron todas las jornadas de la fase regular.</p>
            </aside>
        );
    }

    // Si la jornada elegida ya se completó, se muestra la primera que tenga partidos pendientes.
    const round = pendingRounds.includes(selectedRound) ? selectedRound : pendingRounds[0];
    const roundFixtures = pendingFixtures.filter((fixture) => fixture.round === round);

    return (
        <aside className="pending" aria-labelledby="pendientes-titulo">
            <div className="pending__head">
                <h3 className="pending__title" id="pendientes-titulo">Partidos pendientes</h3>
                <label className="visually-hidden" htmlFor="pending-round">Jornada</label>
                <select
                    id="pending-round"
                    className="pending__select"
                    value={round}
                    onChange={(event) => setSelectedRound(Number(event.target.value))}
                >
                    {pendingRounds.map((pendingRound) => (
                        <option key={pendingRound} value={pendingRound}>Jornada {pendingRound}</option>
                    ))}
                </select>
            </div>

            <p className="pending__note">
                {pendingFixtures.length} partidos sin jugar. Elige uno para cargarlo en el formulario.
            </p>

            <ul className="pending__list">
                {roundFixtures.map((fixture) => {
                    const homeTeam = teamsById[fixture.homeId];
                    const awayTeam = teamsById[fixture.awayId];

                    return (
                        <li key={fixture.id}>
                            <button type="button" className="pending__item" onClick={() => onPick(fixture)}>
                                <span className="pending__date tabular">{formatShortDate(fixture.date)}</span>
                                <span className="pending__teams">
                                    <span className="pending__team">
                                        <TeamCrest team={homeTeam} />
                                        {homeTeam.name}
                                    </span>
                                    <span className="pending__team">
                                        <TeamCrest team={awayTeam} />
                                        {awayTeam.name}
                                    </span>
                                </span>
                                <span className="pending__action">Cargar</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}

export default PendingMatches;
