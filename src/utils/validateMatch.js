import { findFixture } from "./matches.js";

const MAX_GOALS = 30;

function validateGoals(value, teamLabel) {
    const text = String(value).trim();

    if (text === "") {
        return `Escribe los goles del ${teamLabel}.`;
    }

    if (!/^\d+$/.test(text)) {
        return "Los goles deben ser un número entero igual o mayor a 0.";
    }

    if (Number(text) > MAX_GOALS) {
        return `Revisa el marcador: más de ${MAX_GOALS} goles no es un resultado real.`;
    }

    return "";
}

// Devuelve los errores de cada campo y, si todo está bien, el partido del calendario que se va a registrar.
export function validateMatch(form, { fixtures, matches }) {
    const errors = {};

    if (!form.homeId) {
        errors.homeId = "Elige el equipo local.";
    }

    if (!form.awayId) {
        errors.awayId = "Elige el equipo visitante.";
    }

    if (form.homeId && form.homeId === form.awayId) {
        errors.awayId = "El local y el visitante no pueden ser el mismo equipo.";
    }

    const homeGoalsError = validateGoals(form.homeGoals, "local");
    const awayGoalsError = validateGoals(form.awayGoals, "visitante");

    if (homeGoalsError) {
        errors.homeGoals = homeGoalsError;
    }

    if (awayGoalsError) {
        errors.awayGoals = awayGoalsError;
    }

    let fixture = null;

    if (!errors.homeId && !errors.awayId) {
        fixture = findFixture(fixtures, form.homeId, form.awayId);
        const playedMatch = matches.find((match) => match.fixtureId === fixture.id);

        if (playedMatch) {
            errors.general = `Ese partido ya se jugó en la jornada ${fixture.round} (${playedMatch.homeGoals}-${playedMatch.awayGoals}). Si quieres corregirlo, elimínalo primero del historial.`;
        }
    }

    return {
        errors,
        fixture,
        isValid: Object.keys(errors).length === 0,
    };
}
