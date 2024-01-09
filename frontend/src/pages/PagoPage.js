// PagoPage.js
import React, { useState } from 'react';
import './PagoPage.css';
import Visa from '../imagenes/Visa.png';
import Mastercard from '../imagenes/Mastercard.png';
import Paypal from '../imagenes/Paypal.png';

function PagoPage() {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [nameholder, setNameHolder] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCVV] = useState('');
const [totalAmount, setTotalAmount] = useState(0);

// Luego, en tu lógica de manejo de pago, actualiza el valor de totalAmount según sea necesario
const handlePayment = () => {
  // Supongamos que obtienes el monto total de alguna manera, y luego lo estableces usando setTotalAmount
  const total = /* Aquí realiza tu cálculo */ 100; // Por ejemplo, asumimos que el monto total es 100

  setTotalAmount(total);

  // Además de otras acciones de procesamiento de pago
  alert('¡Pago procesado con éxito!');
};

  return (
    <div className="pagopage">
      <p>AGREGA UNA TARJETA DE CREDITO O DE DEBITO</p>
      <p>Todos los campos son obligatorios</p>
      <p>Se aceptan las siguientes tarjetas</p>
      <div className="pagopage-image-container">
        <img src={Visa} alt="Imagen Pago" className="pagopage-image" />
        <img src={Mastercard} alt="Imagen Pago" className="pagopage-image" />
        <img src={Paypal} alt="Imagen Pago" className="pagopage-image" />
      </div>
      <br/>
      
      <input
        className="numbercard"
        type="text"
        placeholder="Número de Tarjeta"
        maxLength="10"
        value={creditCardNumber}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[0-9\s]+$/.test(value) || value === '') {
            setCreditCardNumber(value);
          }
        }}
      required
      />
      <input
        className="holder"
        type="text"
        placeholder="Nombre del Titular"
        value={nameholder}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[A-Za-z\s]+$/.test(value) || value === '') {
            setNameHolder(value);
            }
          }}
        required
        />
        <div className="expiry-container">
        <label>Fecha de Expiración:</label><br/><br/>
        <div className="expiry-inputs">
          <input
            className="expiry"
            type="text"
            placeholder="MM"
            maxLength="2"
            value={expiryMonth}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9]+$/.test(value) || value === '') {
                setExpiryMonth(value);
              }
            }}
            required
          />
          <span></span>
          <input
            className="expiry"
            type="text"
            placeholder="AAAA"
            maxLength="4"
            value={expiryYear}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9]+$/.test(value) || value === '') {
                setExpiryYear(value);
              }
            }}
            required
          />
        </div>
      </div>
      <label>Código de Verificación:</label><br/><br/>
      <input
        className="CVV"
        type="text"
        placeholder="CVV"
        maxLength="3"
        value={cvv}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[0-9]+$/.test(value) || value === '') {
            setCVV(value);
          }
        }}
        required
      />
      <p>Total de la compra: ${totalAmount}</p>
      <center>
      <button onClick={handlePayment}>Pagar</button>
      </center>
      {/* Agrega aquí tu formulario de pago */}
    </div>
  );
}

export default PagoPage;