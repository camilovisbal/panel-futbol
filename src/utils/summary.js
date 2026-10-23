// Cifras generales del torneo a partir de los partidos jugados.
export function getTournamentSummary(matches) {
    const totalGoals = matches.reduce((sum, match) => sum + match.homeGoals + match.awayGoals, 0);
    const averageGoals = matches.length > 0 ? totalGoals / matches.length : 0;

    // La goleada más amplia es la de mayor diferencia; si hay empate, la que tuvo más goles.
    const biggestWin = matches.reduce((best, match) => {
        const margin = Math.abs(match.homeGoals - match.awayGoals);
        const goals = match.homeGoals + match.awayGoals;

        if (margin === 0) return best;
        if (!best) return match;

        const bestMargin = Math.abs(best.homeGoals - best.awayGoals);
        const bestGoals = best.homeGoals + best.awayGoals;

        return margin > bestMargin || (margin === bestMargin && goals > bestGoals) ? match : best;
    }, null);

    return { totalGoals, averageGoals, biggestWin };
}
