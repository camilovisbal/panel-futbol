# Liga Élite - Panel de resultados de fútbol

Proyecto hecho en React para el parcial de Desarrollo Web. Es un panel para un torneo de fútbol donde se registran los resultados de los partidos y la tabla de posiciones se calcula sola.

El torneo es inventado pero los equipos y jugadores son reales: 10 clubes grandes de Europa con sus plantillas de la temporada 2026/27. Se juega todos contra todos a ida y vuelta (18 jornadas) y los 4 primeros pasan a una semifinal. El torneo va por la jornada 12, así que todavía faltan partidos por jugar.

## Funcionalidades

- Ver los 10 equipos con su escudo, y al hacer clic ver el técnico, el estadio y la plantilla
- Registrar un partido eligiendo el local, el visitante y el marcador
- Validaciones: no se puede elegir el mismo equipo en los dos lados, los goles tienen que ser números enteros desde 0 y no se puede registrar un partido que ya se jugó
- Ver el resultado registrado con los escudos y nombres de los equipos
- Lista de partidos pendientes por jornada para cargarlos en el formulario con un clic
- Historial de todos los partidos agrupados por jornada
- Filtrar el historial por equipo
- Eliminar un resultado (el partido vuelve a quedar pendiente)
- Tabla de posiciones con PJ, G, E, P, GF, GC, DG, puntos y los últimos 5 resultados
- La tabla se actualiza cada vez que se registra o se elimina un partido
- Semifinal con los cruces que quedarían si la liga terminara hoy (1.º contra 4.º y 2.º contra 3.º)
- Resumen del torneo: partidos jugados, goles, líder y goleada más amplia
- Mensajes cuando no hay partidos registrados
- Se adapta a celulares

## Reglas del torneo

- Victoria 3 puntos, empate 1 y derrota 0.
- La tabla se ordena por puntos, después por diferencia de goles y después por goles a favor. Si dos equipos empatan en todo, se ordenan por nombre.
- Los 4 primeros juegan la semifinal a ida y vuelta: 1.º contra 4.º y 2.º contra 3.º. El equipo mejor ubicado juega de local el partido de vuelta.
- Un equipo aparece como "Clasificado" cuando ya no lo pueden alcanzar suficientes rivales para sacarlo de los 4 primeros, y como "Eliminado" cuando ya no puede llegar a esos puestos.

## Tecnologías

- React
- Vite
- JavaScript
- CSS

## Cómo ejecutarlo

Primero hay que tener instalado Node.js (versión LTS).

1. Clonar el repositorio:

```bash
git clone https://github.com/camilovisbal/panel-futbol.git
```

2. Entrar a la carpeta:

```bash
cd panel-futbol
```

3. Instalar las dependencias:

```bash
npm install
```

4. Ejecutar el proyecto:

```bash
npm run dev
```

5. Abrir en el navegador la dirección que aparece en la terminal, normalmente `http://localhost:5173`

## Estructura del proyecto

```
src/
├── components/   componentes de la página (tabla, formulario, historial, semifinal, equipos...)
├── data/         equipos con sus plantillas, calendario y partidos ya jugados
├── utils/        cálculos de la tabla, validaciones, filtros y formato de fechas
├── App.jsx       componente principal, aquí está el estado
└── main.jsx      archivo de entrada
public/escudos/   escudos de los equipos
public/estadios/  fotos de los estadios
```

## Componentes

- `Header`: nombre del torneo, menú y la jornada actual.
- `TournamentSummary`: las cifras generales del torneo.
- `StandingsTable`: la tabla de posiciones.
- `SemifinalBracket`: los cruces de semifinal con las fechas de ida y vuelta.
- `MatchForm`: el formulario para registrar un partido.
- `MatchResult`: el último resultado registrado con los escudos.
- `PendingMatches`: los partidos que faltan, por jornada.
- `MatchHistory` y `MatchRow`: el historial con el filtro y el botón de eliminar.
- `TeamList`, `TeamCard` y `TeamModal`: las tarjetas de los equipos y el detalle con la plantilla.
- `TeamCrest`: el escudo, que se usa en varias partes.
- `Footer`: el pie de página.

## Cómo funciona

El estado principal está en `App.jsx` con `useState`:

- `matches`: la lista de partidos jugados. Empieza con los 55 partidos de las jornadas 1 a 11.
- `matchForm`: lo que se escribe en el formulario.
- `teamFilter`: el equipo elegido para filtrar el historial.
- `selectedTeamId`: el equipo que se está viendo en el detalle.
- `lastMatchId`: el último partido registrado, para mostrarlo con los escudos.

La tabla de posiciones no se guarda en el estado. Se calcula cada vez a partir de `matches`, por eso cuando se registra o se elimina un partido la tabla cambia sola. El cálculo está en `utils/standings.js`:

1. Con `reduce()` se crea una fila en cero para cada equipo.
2. Con otro `reduce()` se recorre cada partido y se le suman al local y al visitante los partidos jugados, ganados, empatados o perdidos, los goles a favor, los goles en contra y los puntos.
3. Con `sort()` se ordena por puntos, diferencia de goles y goles a favor.

El calendario completo (90 partidos) está en `data/fixtures.js`. Como es a ida y vuelta, cada pareja local-visitante aparece una sola vez, entonces cuando se eligen los dos equipos en el formulario se puede saber qué partido es y en qué jornada va. Los partidos pendientes salen de un `filter()` del calendario quitando los que ya están en `matches`.

Las validaciones están en `utils/validateMatch.js`. El formulario usa `onSubmit` y no deja registrar nada hasta que todo esté bien. Para los goles se revisa que sean números enteros iguales o mayores a 0.

Las listas se muestran con `map()` y cada elemento tiene su `key` (el id del equipo, del partido o del calendario). El historial se filtra con `filter()` y se agrupa por jornada con `reduce()`.

Los datos están separados en la carpeta `data` para que más adelante se puedan cambiar por los que vengan de un backend.

## Limitaciones

- Los partidos registrados se pierden al recargar la página porque solo se guardan con `useState`.
- Los datos están escritos en archivos, todavía no vienen de una API.
- La semifinal solo muestra los cruces, todavía no se pueden registrar sus resultados.

## Imágenes y datos

Los escudos pertenecen a sus respectivos clubes y se usan solo con fines académicos. Las fotos de los estadios son de Wikimedia Commons y en la página aparece el autor y la licencia de cada una. Las plantillas y los técnicos se tomaron de Wikipedia en octubre de 2026.

## Autor

Camilo Andrés Visbal Beltrán
Ingeniería de Sistemas - Universidad de la Costa (CUC)
