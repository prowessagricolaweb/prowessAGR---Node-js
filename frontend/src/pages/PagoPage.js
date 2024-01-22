import React, { useState } from 'react';
import './PagoPage.css';
import Visa from '../imagenes/Visa.png';
import Mastercard from '../imagenes/Mastercard.png';
import Paypal from '../imagenes/Paypal.png';

function PagoPage() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [totalAmount, setTotalAmount] = useState(0);

  const handlePayment = () => {
    // Set the payment success state after successful payment
    setPaymentSuccess(true);
  };

  return (
    <div className="pagopage-container">
      <div className="pagopage-form">
        {!paymentSuccess && (
          <>
            <div className="pagopage-image-container">
              <img src={Visa} alt="Imagen Pago" className="pagopage-image" />
              <img src={Mastercard} alt="Imagen Pago" className="pagopage-image" />
              <img src={Paypal} alt="Imagen Pago" className="pagopage-image" />
            </div>
            <br />
            <button onClick={handlePayment} className="pagopage-button">
              Pagar
            </button>
          </>
        )}
        {paymentSuccess && (
          <>
                <div style={{ textAlign: 'center' }}>
      <h2>Su pago se ha completado correctamente</h2>
    </div>
            <div className="pagopage-factura-container">
              <p className="pagopage-factura-datos">
                <span className="pagopage-factura-label">Número de Orden:</span>
                349646148
              </p>
              <p className="pagopage-factura-datos">
                <span className="pagopage-factura-label">ID Organización:</span>
                AR-IMCO13-LACNIC
              </p>
              <p className="pagopage-factura-datos">
                <span className="pagopage-factura-label">Nro. Factura:</span>
                7444
              </p>
              <p className="pagopage-factura-datos">
                <span className="pagopage-factura-label">Importe:</span>
                $22.00
              </p>
              <p className="pagopage-gracias">A la brevedad recibirá su comprobante de pago</p>
            </div>
            <p className="pagopage-gracias">Gracias por su compra!</p>
            <button class="seguir-comprando">Seguir comprando</button>
          </>
          
        )}
      </div>
    </div>
  );
}

export default PagoPage;