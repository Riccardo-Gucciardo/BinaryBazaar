import { useEffect, useState } from 'react';
import '../style/Credits.css';

export default function Credits() {
    const [startScroll, setStartScroll] = useState(false);

    const credits = [
        { role: "The Architects", names: ["Giuseppe", "Manuel", "Igor", "Riccardo"] },
        { role: "Matrix Facts", fact: "Did you know? The 'digital rain' in Matrix was actually created from Japanese sushi recipes!" },
        { role: "Fun Facts", fact: "Igor's CSS skills are so good, he can bend spoons with his stylesheets" },
        { role: "Warning", fact: "No keyboards were harmed in the making of this website" },
        { role: "Easter Egg", fact: "There is no spoon in our shopping cart... or is there?" },
        { role: "Special Thanks", names: ["Stack Overflow", "Coffee", "Pizza", "React Documentation (that nobody reads)"] },
        { role: "Remember", fact: "In the end, it's not about knowing the path... it's about having good Wi-Fi" },
    ];

    useEffect(() => {
        setStartScroll(true);
    }, []);

    return (
        <div className="credits-container matrix-bg">
            <div className={`credits-content ${startScroll ? 'scrolling' : ''}`}>
                <h1>The Binary Bazaar</h1>
                <h2>A Matrix-inspired E-commerce</h2>

                {credits.map((credit, index) => (
                    <div key={index} className="credit-item">
                        <h3>{credit.role}</h3>
                        {credit.names && (
                            <div className="names">
                                {credit.names.map((name, i) => (
                                    <p key={i}>{name}</p>
                                ))}
                            </div>
                        )}
                        {credit.fact && <p className="fact">{credit.fact}</p>}
                    </div>
                ))}

                <div className="final-message">
                    <p>Take the red pill...</p>
                    <p>And I'll show you how deep the rabbit hole of debugging goes</p>
                </div>
            </div>
        </div>
    );
}