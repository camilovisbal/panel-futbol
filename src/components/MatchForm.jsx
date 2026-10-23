import { useState } from "react";
import { validateMatch } from "../utils/validateMatch.js";
import { findFixture } from "../utils/matches.js";
import { formatDate } from "../utils/format.js";
import "./MatchForm.css";

function TeamField({ side, label, teams, teamId, goals, errors, onChange }) {
    const teamField = `${side}Id`;
    const goalsField = `${side}Goals`;

    return (
        <fieldset className="match-form__side">
            <legend>{label}</legend>

            <label className="match-form__label" htmlFor={`${side}-team`}>Equipo</label>
            <select
                id={`${side}-team`}
                className="match-form__select"
                value={teamId}
                aria-invalid={Boolean(errors[teamField])}
                aria-describedby={errors[teamField] ? `${side}-team-error` : undefined}
                onChange={(event) => onChange(teamField, event.target.value)}
            >
                <option value="">Elige un equipo</option>
                {teams.map((team) => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                ))}
            </select>
            {errors[teamField] && (
                <p className="match-form__error" id={`${side}-team-error`}>{errors[teamField]}</p>
            )}

            <label className="match-form__label" htmlFor={`${side}-goals`}>Goles</label>
            <input
                id={`${side}-goals`}
                className="match-form__goals tabular"
                type="number"
                inputMode="numeric"
                min="0"
                step="1"
                placeholder="0"
                value={goals}
                aria-invalid={Boolean(errors[goalsField])}
                aria-describedby={errors[goalsField] ? `${side}-goals-error` : undefined}
                onChange={(event) => onChange(goalsField, event.target.value)}
            />
            {errors[goalsField] && (
                <p className="match-form__error" id={`${side}-goals-error`}>{errors[goalsField]}</p>
            )}
        </fieldset>
    );
}

function MatchForm({ teams, fixtures, matches, values, onChange, onRegister }) {
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        onChange(field, value);
        setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined, general: undefined }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const result = validateMatch(values, { fixtures, matches });
        setErrors(result.errors);

        if (result.isValid) {
            onRegister(result.fixture, Number(values.homeGoals), Number(values.awayGoals));
            setErrors({});
        }
    };

    const selectedFixture =
        values.homeId && values.awayId && values.homeId !== values.awayId
            ? findFixture(fixtures, values.homeId, values.awayId)
            : null;
    const isAlreadyPlayed = selectedFixture
        ? matches.some((match) => match.fixtureId === selectedFixture.id)
        : false;

    return (
        <form className="match-form" onSubmit={handleSubmit} noValidate>
            <div className="match-form__sides">
                <TeamField
                    side="home"
                    label="Local"
                    teams={teams}
                    teamId={values.homeId}
                    goals={values.homeGoals}
                    errors={errors}
                    onChange={handleChange}
                />
                <span className="match-form__versus" aria-hidden="true">vs</span>
                <TeamField
                    side="away"
                    label="Visitante"
                    teams={teams}
                    teamId={values.awayId}
                    goals={values.awayGoals}
                    errors={errors}
                    onChange={handleChange}
                />
            </div>

            <div className="match-form__foot">
                <p className="match-form__fixture" aria-live="polite">
                    {selectedFixture
                        ? `Jornada ${selectedFixture.round}, ${formatDate(selectedFixture.date)}${isAlreadyPlayed ? ". Este partido ya está registrado." : "."}`
                        : "Elige los dos equipos para ver la jornada del partido."}
                </p>
                <button type="submit" className="button">Registrar resultado</button>
            </div>

            {errors.general && (
                <p className="match-form__error match-form__error--general" role="alert">{errors.general}</p>
            )}
        </form>
    );
}

export default MatchForm;
