
import { useState, useEffect } from 'react';

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            image: 'https://img.freepik.com/foto-gratuito/concetto-di-collage-html-e-css_23-2150061955.jpg?t=st=1743548607~exp=1743552207~hmac=bb8ad22c4239b63efcbc52781c2a9f2421dedc0c0d6c7a3ca9181283b7185599&w=900',
            slogan: "Tecnologia all'avanguardia per le tue esigenze"
        },
        {
            image: "https://img.freepik.com/foto-gratuito/vista-della-configurazione-e-del-controller-della-tastiera-da-gioco-illuminata-al-neon_23-2149529364.jpg?t=st=1743548645~exp=1743552245~hmac=f3f5264081fbe36f8782e418e8a04301a0dc003d5f8aa24531e51b4c429d2ad7&w=900",
            slogan: "Performance eccezionali, prezzi accessibili"
        },
        {
            image: "https://img.freepik.com/foto-gratuito/tecnologia-di-fondo-del-tocco-umano-remake-moderno-di-la-creazione-di-adamo_53876-129794.jpg?t=st=1743699363~exp=1743702963~hmac=25eebb0e306b26684a78d806bb2dc4faebdfd1eaef0847dd84b55f6ec4fc1c21&w=996",
            slogan: "Il futuro è già qui, scoprilo con noi"
        }
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval); // Pulisce l'intervallo quando il componente si smonta
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="hero-container">
            <div className="hero-slider">
                <img
                    src={slides[currentIndex].image}
                    alt="Hero"
                    className="hero-image"
                />
                <div className="hero-slogan">
                    <h2>{slides[currentIndex].slogan}</h2>
                </div>
                <div className="navigation-arrows">
                    <button onClick={prevSlide} className="arrow-button">
                        &#8249;
                    </button>
                    <button onClick={nextSlide} className="arrow-button">
                        &#8250;
                    </button>
                </div>
            </div>
        </div>
    );
}