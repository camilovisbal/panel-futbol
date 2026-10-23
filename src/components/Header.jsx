import "./Header.css";

function Header({ currentRound, totalRounds }) {
    return (
        <header className="header" id="inicio">
            <nav className="header__nav" aria-label="Secciones">
                <p className="header__brand">Liga Élite 26/27</p>
                <ul className="header__links">
                    <li><a href="#tabla">Tabla</a></li>
                    <li><a href="#registrar">Registrar</a></li>
                    <li><a href="#historial">Historial</a></li>
                    <li><a href="#equipos">Equipos</a></li>
                </ul>
            </nav>

            <h1 className="header__name">Liga Élite</h1>

            <div className="header__foot">
                <p className="header__lead">
                    Diez clubes grandes de Europa, 18 jornadas a ida y vuelta y semifinal para los cuatro primeros.
                </p>
                <div className="header__status">
                    <p className="header__round tabular">
                        {currentRound <= totalRounds
                            ? `Jornada ${currentRound} de ${totalRounds}`
                            : "Fase regular terminada"}
                    </p>
                    <a className="button" href="#registrar">Registrar partido</a>
                </div>
            </div>
        </header>
    );
}

export default Header;
