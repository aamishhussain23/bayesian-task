import React from 'react';

const FlightInfoCard = ({ flight, originValue, destinationValue}) => {
  return (
    <div className="flight-info-card">
      <img src={"https://picsum.photos/200"} alt="logo" className="logo" />
      <p className="airline-name">{flight.partner_program}</p>
      <div className="route">
        <span>{originValue} ➔ {destinationValue}</span>
        <span>2024-07-09 - 2024-10-07</span>
      </div>
      <div className="miles-info">
        <div className="miles-section">
          <span className="miles">{flight.min_business_miles || 'N/A'}</span>
          <span className="miles-label">Min Business Miles</span>
        </div>
        <div className="miles-section">
          <span className="miles">{flight.min_economy_miles || 'N/A'} <span style={{fontWeight: "400"}} className="additional-cost">+ ${flight.min_economy_tax}</span></span>
          <span className="miles-label">Min Economy Miles</span>
        </div>
        <div className="miles-section">
          <span className="miles">{flight.min_first_miles || 'N/A'}</span>
          <span className="miles-label">Min First Miles</span>
        </div>
      </div>
    </div>
  );
}

export default FlightInfoCard;
