import { useState, useEffect } from 'react';

export default function Hero() {
    const images = [
        // 'https://images.unsplash.com/photo-1741800459656-4116dcb230ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D',
        // 'https://images.unsplash.com/photo-1743024282286-5bfecf55a834?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D',
        // 'https://images.unsplash.com/photo-1741851373559-6879db14fd8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D',
        'https://img.freepik.com/foto-gratuito/concetto-di-collage-html-e-css_23-2150061955.jpg?t=st=1743548607~exp=1743552207~hmac=bb8ad22c4239b63efcbc52781c2a9f2421dedc0c0d6c7a3ca9181283b7185599&w=900',
        'https://img.freepik.com/foto-gratuito/vista-della-configurazione-e-del-controller-della-tastiera-da-gioco-illuminata-al-neon_23-2149529364.jpg?t=st=1743548645~exp=1743552245~hmac=f3f5264081fbe36f8782e418e8a04301a0dc003d5f8aa24531e51b4c429d2ad7&w=900',
        'https://img.freepik.com/foto-premium/catturare-l-eleganza-nei-gadget-essenziali_935395-81525.jpg?w=1060'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Cambia immagine ogni 10 secondi
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval); // Pulisce l'intervallo quando il componente si smonta
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="hero-container">
            <div className="hero-slider">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="hero-image"
                />
                <div className="navigation-arrows">
                    <button
                        onClick={prevSlide}
                        className="arrow-button prev"
                        aria-label="Immagine precedente"
                    >
                        &#10094;
                    </button>
                    <button
                        onClick={nextSlide}
                        className="arrow-button next"
                        aria-label="Immagine successiva"
                    >
                        &#10095;
                    </button>
                </div>
            </div>
        </div>
    );
}
