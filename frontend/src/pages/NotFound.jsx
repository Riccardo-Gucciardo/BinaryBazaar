import { Link } from 'react-router-dom';
import MatrixCodeRain from '../components/MatrixCodeRain';

export default function NotFound() {
    return (
        <>
            <MatrixCodeRain />
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
                        src="https://www.bluefrontier.co.uk/images/blog/2019-06-26/guide-to-http-4xx-errors-full.jpg"
                        alt="404 Error"
                    />
                </div>
            </div>
        </>
    );
}