// AdvertisementSection.js

import React from 'react';
import "./AdvertisementSection.css"; // Puedes crear un archivo de estilo para esta sección si es necesario
import Planes from '../imagenes/Planes.png';
import Planes1 from '../imagenes/Planes1.png';
import Planes2 from '../imagenes/Planes2.png';
import Planes3 from '../imagenes/Planes3.png';

function AdvertisementSection() {
  const imageBasePath = '/imagenes/';
  return (
    
    <center>
      <h1>PROWESS PLANES</h1>
      <div className="p">
        <p>Descubre la Excelencia en Agricultura con Prowess Agrícola</p>
        <p>¡Aumenta la productividad y optimiza tus cultivos con nuestras soluciones avanzadas!</p>
      </div>
      <div className="advertisement-section">
      <img src={`${imageBasePath}Planes.png`} alt="Imagen Planes" className="advertisement-image" /><br/><br/><br/>
      <img src={`${imageBasePath}Planes1.png`} alt="Imagen Planes" className="advertisement-image" /><br/><br/><br/>
      <img src={`${imageBasePath}Planes2.png`} alt="Imagen Planes" className="advertisement-image" /><br/><br/><br/>
      <img src={`${imageBasePath}Planes3.png`} alt="Imagen Planes" className="advertisement-image" />
    </div>
    </center>
  );
}

export default AdvertisementSection;