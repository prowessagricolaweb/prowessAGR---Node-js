import React, { useState, useEffect } from 'react';
import './PagoPage.css';
import { Navigate } from 'react-router-dom';
import Check from '../imagenes/Check.png';
import ModalEditVendors from '../components/ModalEditVendors';
import VendorsPage from './VendorsPage';
import whatsapp from '../imagenes/whatsapp.png';

function PagoPage({ cart, vendor, clearCart }) {
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
  };
  
  const generateRandomOrderNumber = () => {
    return Math.floor(Math.random() * 900000) + 100000;
  };

  if (redirect) {
    return <Navigate to="/tienda" />;
  }
  
  const handleContinueShoppingClick = () => {
    clearCart();
    setRedirect(true);
  };

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
                    {generateRandomOrderNumber()}
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
                  <p className="pagopage-gracias">¡Gracias por su compra!</p>
                  <a href={`https://wa.me/${product.pro_numero}?text=Hola,%20he%20completado%20mi%20compra.%20¿Podemos%20ponernos%20en%20contacto%3F`} target="_blank" rel="noopener noreferrer">
                   <button className="btn btn-success btn-whatsapp">
                   <i className="fab fa-whatsapp"></i> ¡Contáctanos! <div className="image-whatsapp">
                  <img src={whatsapp} alt="Whatsapp" />
                   </div>
                  </button>
                  </a>
                   <p className="pagopage-gracias">En breve nos pondremos en contacto con usted</p> 
                  <p className="pagopage-factura-datos"> 
                  </p>
                  <p className="pagopage-factura-datos">
                   </p>
                </div>
              ))}           
            </div>
            <button className="btn-buy" onClick={handleContinueShoppingClick}>
              <b>Seguir comprando</b>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default PagoPage;
