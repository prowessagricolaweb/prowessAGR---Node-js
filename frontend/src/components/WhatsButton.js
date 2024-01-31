import React from "react";
import './WhatsButton.css';
import whatsapp from '../imagenes/whatsapp.png';

function WhatsButton({ phoneNumber }) {
  return (
    <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer">
      <button className="btn btn-success btn-whatsapp">
        <i className="fab fa-whatsapp"></i> ¡Contáctanos!
        <div className="image-whatsapp">
          <img src={whatsapp} alt="Whatsapp" />
        </div>
      </button>
    </a>
  );
}

export default WhatsButton;
