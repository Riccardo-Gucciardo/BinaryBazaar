// src/components/WelcomePopup.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../index.css"; // importa il file CSS globale
import "../style/Popup.css"; // importa il file CSS per il popup

export default function WelcomePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenWelcomePopup");
    if (!hasSeenPopup) {
      setShowPopup(true);
      localStorage.setItem("hasSeenWelcomePopup", "true");
    }
  }, []);

  const handleClose = (path) => {
    setShowPopup(false);
    navigate(path)
  };

  if (!showPopup) return null;

  return (
    <>
      <div className="popup-overlay">
        <div className="popup ">
          <h2>Benvenuto Nel Mondo Reale!</h2>
          <p>Scegli la tua strada</p>
          <button className="blue-pill gift-icon" onClick={() => handleClose("/error")}>404</button>
          <button className="red-pill gift-icon" onClick={() => handleClose("/home")}>Home</button>
        </div>
      </div>
    </>
  );
}
