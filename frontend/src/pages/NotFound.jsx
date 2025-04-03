import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Oops! Pagina non trovata</h2>
                <p className="not-found-message">
                    Sembra che la pagina che stai cercando non esista.
                    Potresti aver digitato un URL sbagliato o la pagina è stata rimossa.
                </p>
                <Link to="/" className="not-found-button">
                    Torna alla Homepage
                </Link>
            </div>
            <div className="not-found-image">
                <img
                    src="https://img.freepik.com/vettori-gratuito/errore-404-con-uomo-e-coni_24908-77788.jpg?t=st=1743718385~exp=1743721985~hmac=8c97c7b02fc277a80cd4bb30d9ccb938e2f0ea4296a5e6735d1576cdcdbedf9d&w=740"
                    alt="404 Error"
                />
            </div>
        </div>
    );
}