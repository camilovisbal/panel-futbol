export const ALL_TEAMS = "todos";

// Busca en el calendario el partido entre dos equipos. Como el torneo es a ida y vuelta,
// cada pareja local-visitante aparece una sola vez.
export function findFixture(fixtures, homeId, awayId) {
    return fixtures.find((fixture) => fixture.homeId === homeId && fixture.awayId === awayId);
}

export function getPendingFixtures(fixtures, matches) {
    return fixtures.filter(
        (fixture) => !matches.some((match) => match.fixtureId === fixture.id)
    );
}

// La jornada actual es la primera que todavía tiene partidos sin jugar.
export function getCurrentRound(pendingFixtures, totalRounds) {
    if (pendingFixtures.length === 0) {
        return totalRounds + 1;
    }

    return Math.min(...pendingFixtures.map((fixture) => fixture.round));
}

export function filterMatchesByTeam(matches, teamId) {
    if (teamId === ALL_TEAMS) {
        return matches;
    }

    return matches.filter((match) => match.homeId === teamId || match.awayId === teamId);
}

export function getNextMatchId(matches) {
    return matches.reduce((maxId, match) => Math.max(maxId, match.id), 0) + 1;
}
