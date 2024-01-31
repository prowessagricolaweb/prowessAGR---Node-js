import React, { useState, useEffect } from 'react';
import './PagoPage.css';
import { Navigate } from 'react-router-dom';
import Check from '../imagenes/Check.png';
import WhatsButton from '../components/WhatsButton'; 

function PagoPage({ cart }) {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    handlePayment();
  }, []);

  const handlePayment = () => {
    setPaymentSuccess(true);
  };

  const [redirect, setRedirect] = useState(false);

  const handleBuyButtonClick = () => {
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/tienda" />;
  }

  return (
    <div className="pagopage-container">
      <div className="pagopage-form">
        {paymentSuccess && (
          <>
            <div className='AboutUsInfo h1'>
              <h1>Su pago se ha completado correctamente</h1>
            </div>
            <div className="pagopage-factura-container">
              <img src={Check} alt="Imagen Pago" className="pagopage-image" />
              {cart && cart.map((product, index) => (
                <div key={index}>
                  <p className="pagopage-factura-datos">
                    <div className='img-producto-factura'>
                  <img src={product.pro_imagen} alt={product.pro_nombre} />
                    </div>
                    <span className="pagopage-factura-label">Nº de orden:</span>
                    349646148
                  </p>
                  <p className="pagopage-factura-datos">
                    <span className="pagopage-factura-label">Vendedor:</span>
                    {product.pro_vendedor}
                  </p>
                  <p className="pagopage-factura-datos">
                    <span className="pagopage-factura-label">Compra:</span>
                    {product.pro_nombre}
                  </p>
                  <p className="pagopage-factura-datos">
                    <span className="pagopage-factura-label">Cantidad:</span>
                    {product.cantidad} {product.pro_medida}
                  </p>
                </div>
              ))}
              <p className="pagopage-gracias">¡Gracias por su compra!</p>
              <WhatsButton number="0998160293" message="Hola, he completado mi compra. ¿Podemos ponernos en contacto?" />
              <p className="pagopage-gracias">En breve nos pondremos en contacto con usted</p>
            </div>
            <button className="btn-buy" onClick={handleBuyButtonClick}>
              <b>Seguir comprando</b>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PagoPage;