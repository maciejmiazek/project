import React, { useState } from 'react';
import './MouseHover.css'; // Import stylów

const MouseHover = ({ startDate, endDate, description }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipPosition({
            x: e.clientX - rect.left + 10, // Pozycja X względem paska
            y: e.clientY - rect.top + 10,  // Pozycja Y względem paska
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
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y}px`,
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