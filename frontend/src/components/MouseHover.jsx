import React, { useState } from 'react';
import './MouseHover.css'; // Import stylów

const MouseHover = ({ startDate, endDate, description }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setTooltipPosition({
            x: e.clientX + 10, // Pozycja względem całego okna
            y: e.clientY + 10,
        });
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div className="progress-bar-container">
            <div
                className="progress-bar"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            ></div>
            {showTooltip && (
                <div
                    className="tooltip"
                    style={{
                        position: 'fixed',  // Przenieś tooltip do całego okna
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y}px`,
                        zIndex: 1000, // Na wierzchu innych elementów
                        pointerEvents: 'none', // Nie koliduje z interakcjami
                    }}
                >
                    <p>Od: {startDate}</p>
                    <p>Do: {endDate}</p>
                    <p>Opis: {description}</p>
                </div>
            )}
        </div>
    );
};

export default MouseHover;
