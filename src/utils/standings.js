export const POINTS_PER_WIN = 3;
export const POINTS_PER_DRAW = 1;
export const SEMIFINAL_SPOTS = 4;

function createRow(team) {
    return {
        teamId: team.id,
        teamName: team.name,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
    };
}

// Devuelve una fila nueva con el resultado sumado, sin modificar la anterior.
function addResult(row, scored, conceded) {
    const won = scored > conceded ? 1 : 0;
    const drawn = scored === conceded ? 1 : 0;
    const lost = scored < conceded ? 1 : 0;

    return {
        ...row,
        played: row.played + 1,
        won: row.won + won,
        drawn: row.drawn + drawn,
        lost: row.lost + lost,
        goalsFor: row.goalsFor + scored,
        goalsAgainst: row.goalsAgainst + conceded,
        goalDifference: row.goalDifference + scored - conceded,
        points: row.points + won * POINTS_PER_WIN + drawn * POINTS_PER_DRAW,
    };
}

// Orden de la tabla: puntos, diferencia de goles, goles a favor y, si todo es igual, nombre.
export function compareStandings(a, b) {
    return (
        b.points - a.points ||
        b.goalDifference - a.goalDifference ||
        b.goalsFor - a.goalsFor ||
        a.teamName.localeCompare(b.teamName, "es")
    );
}

export function calculateStandings(teams, matches) {
    const emptyTable = teams.reduce((table, team) => {
        table[team.id] = createRow(team);
        return table;
    }, {});

    const table = matches.reduce((currentTable, match) => {
        currentTable[match.homeId] = addResult(currentTable[match.homeId], match.homeGoals, match.awayGoals);
        currentTable[match.awayId] = addResult(currentTable[match.awayId], match.awayGoals, match.homeGoals);
        return currentTable;
    }, emptyTable);

    return Object.values(table).sort(compareStandings);
}

// Últimos cinco resultados de un equipo, del más viejo al más reciente: "G", "E" o "P".
export function getRecentForm(teamId, matches, fixtures, size = 5) {
    const roundOf = (match) => fixtures.find((fixture) => fixture.id === match.fixtureId).round;

    return matches
        .filter((match) => match.homeId === teamId || match.awayId === teamId)
        .sort((a, b) => roundOf(a) - roundOf(b))
        .slice(-size)
        .map((match) => {
            const isHome = match.homeId === teamId;
            const scored = isHome ? match.homeGoals : match.awayGoals;
            const conceded = isHome ? match.awayGoals : match.homeGoals;

            if (scored > conceded) return "G";
            if (scored < conceded) return "P";
            return "E";
        });
}

// Un equipo está clasificado cuando menos de cuatro rivales pueden alcanzar sus puntos,
// y eliminado cuando ya hay cuatro equipos con más puntos de los que él puede sumar.
export function getQualificationStatus(standings, matchesPerTeam) {
    const maxPoints = (team) => team.points + (matchesPerTeam - team.played) * POINTS_PER_WIN;

    return standings.reduce((statusById, row) => {
        const rivals = standings.filter((other) => other.teamId !== row.teamId);

        const rivalsThatCanReach = rivals.filter((other) => maxPoints(other) >= row.points).length;
        const rivalsOutOfReach = rivals.filter((other) => other.points > maxPoints(row)).length;

        if (rivalsThatCanReach < SEMIFINAL_SPOTS) {
            statusById[row.teamId] = "clasificado";
        } else if (rivalsOutOfReach >= SEMIFINAL_SPOTS) {
            statusById[row.teamId] = "eliminado";
        } else {
            statusById[row.teamId] = null;
        }

        return statusById;
    }, {});
}
