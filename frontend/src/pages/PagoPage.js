import React, { useState, useEffect } from 'react';
import './PagoPage.css';
import { Navigate } from 'react-router-dom';
import Check from '../imagenes/Check.png';
import WhatsButton from '../components/WhatsButton'; // Asegúrate de importar WhatsButton

//import ModalEditVendors from '../components/ModalEditVendors';
import VendorsPage from './VendorsPage';

function PagoPage({ cart, vendors, removeFromCart, VendorsPage }) {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const vendor = vendors && cart && cart.pro_vendedor ? vendors.find(v => v.name === cart.pro_vendedor) : null;
  const phoneNumber = vendor && vendor.phoneNumber ? vendor.phoneNumber : '';



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
              
              {/* Utiliza el nombre del vendedor para obtener el número de teléfono correspondiente */}
              <WhatsButton phoneNumber={phoneNumber} />
              <p className="pagopage-gracias">En breve nos pondremos en contacto con usted</p>
            </div>

            <div>
      <div className="progress-bar">
        <div className="progress-fill done"></div>
        <div className="progress-step done">
          <p>Selección</p>
        </div>
        <div className="progress-step done">
          <p>Compra</p>
        </div>
        <div className="progress-step">
          <p>Pago</p>
        </div>
      </div>
      {/* ...resto del código... */}
    </div>
  ;;
            
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
