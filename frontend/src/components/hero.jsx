import { useState } from 'react';

export default function Hero() {
    // Array di immagini di esempio (puoi sostituirle con le tue)
    const images = [
        'https://images.unsplash.com/photo-1741800459656-4116dcb230ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1743024282286-5bfecf55a834?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1741851373559-6879db14fd8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Funzione per andare all'immagine precedente
    const prevSlide = () => {
        setCurrentIndex((prev) => 
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    // Funzione per andare all'immagine successiva
    const nextSlide = () => {
        setCurrentIndex((prev) => 
            prev === images.length - 1 ? 0 : prev + 1
        );
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