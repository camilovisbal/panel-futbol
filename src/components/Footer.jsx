import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__row">
                <ul className="footer__links">
                    <li><a href="#tabla">Tabla de posiciones</a></li>
                    <li><a href="#semifinal">Semifinal</a></li>
                    <li><a href="#registrar">Registrar partido</a></li>
                    <li><a href="#historial">Historial</a></li>
                    <li><a href="#equipos">Equipos</a></li>
                </ul>

                <div className="footer__info">
                    <div>
                        <p className="footer__label">Datos</p>
                        <p>Plantillas y técnicos de la temporada 2026/27 tomados de Wikipedia en octubre de 2026.</p>
                    </div>
                    <div>
                        <p className="footer__label">Imágenes</p>
                        <p>Los escudos pertenecen a sus clubes. Las fotos de los estadios son de Wikimedia Commons y cada una indica su autor y licencia.</p>
                    </div>
                    <div>
                        <p className="footer__label">Proyecto</p>
                        <p>Desarrollo Web, Ingeniería de Sistemas, Universidad de la Costa (CUC). Uso académico.</p>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <p>Camilo Andrés Visbal Beltrán · 2026</p>
                <a href="#inicio">Volver arriba</a>
            </div>

            <p className="footer__name" aria-hidden="true">Liga Élite</p>
        </footer>
    );
}

export default Footer;
