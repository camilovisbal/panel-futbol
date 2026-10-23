const dateFormatter = new Intl.DateTimeFormat("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
});

const shortDateFormatter = new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
});

// Las fechas del calendario vienen como "2026-10-24".
export function formatDate(isoDate) {
    return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}

export function formatShortDate(isoDate) {
    return shortDateFormatter.format(new Date(`${isoDate}T00:00:00Z`)).replace(".", "");
}
