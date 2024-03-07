import React, { useState, useEffect } from 'react';
import './PagoPage.css';
import { Navigate } from 'react-router-dom';
import Check from '../imagenes/Check.png';
import WhatsButton from '../components/WhatsButton';
import ModalEditVendors from '../components/ModalEditVendors';
import VendorsPage from './VendorsPage';
import { getTokenData } from '../services/auth';
import { getUserData } from '../services/user.js';
import whatsapp from '../imagenes/whatsapp.png';
import { checkToken } from '../services/auth';
import { handleSendEmail } from './enviarCorreo';





function PagoPage({ cart, vendor, clearCart, orden }) {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const obtenerDatos = async () => {
      const data = await checkToken(token);
      const usuario =
      {
        id: data.data.id,
        nombre: data.data.nombreUsuario,
        apellido: data.data.apellidoUsuario,
        email: data.data.correoUsuario,
        telefono: data.data.telefonoUsuario
      }
      setUsuario(usuario);
    };

    obtenerDatos();
  }, [token]);


  useEffect(() => {
    const orderNum = generateRandomOrderNumber();
    setOrderNumber(orderNum);
  }, []);

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

  const handleSendEmailButtonClick = () => {
    handleSendEmail();
  };

  const handleShareButtonClick = () => {
    const shareLink = 'whatsapp://send?text=¡Echa un vistazo a este producto que encontré en nuestra tienda!%0A%0AEncuentra más en: https://prowessagricola.prowessec.com';
    navigator.clipboard.writeText(shareLink).then(() => {
      setShowCopiedMessage(true); // Mostrar el mensaje de enlace copiado
      setTimeout(() => setShowCopiedMessage(false), 3000); // Ocultar el mensaje después de 3 segundos
    }).catch(error => {
      console.error('Error al copiar al portapapeles:', error);
    });
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
              {cart && cart.map((product, index, vendor) => (
                <div key={index} style={{ padding: '0px 40px', paddingBottom: '40px' }}>
                  <div className="contenedor-alineado">
                    <div>
                      <img src={product.pro_imagen} alt={product.pro_nombre} className="imagen-producto-factura" />
                    </div>
                    <div>
                      <p className="datos-factura-centrada">
                        <span className="pagopage-factura-label">Nº de orden:</span>
                        {orderNumber}
                      </p>
                      <p className="datos-factura-centrada">
                        <span className="pagopage-factura-label">Vendedor:</span>
                        {product.pro_vendedor}
                      </p>
                      <p className="datos-factura-centrada">
                        <span className="pagopage-factura-label">Compra:</span>
                        {product.pro_nombre}
                      </p>
                      <p className="datos-factura-centrada">
                        <span className="pagopage-factura-label">Cantidad:</span>
                        {product.cantidad} {product.pro_medida}
                      </p>
                    </div>
                  </div>
                  <p className="pagopage-gracias">¡Gracias por su compra!</p>
                  <a href={`https://wa.me/${product.pro_numero}?text=Hola,%20he%20completado%20mi%20compra.%20¿Podemos%20ponernos%20en%20contacto%3F`}
                    target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-success btn-whatsapp">
                      <i className="fab fa-whatsapp"></i> ¡Contáctanos! <div className="image-whatsapp">
                        <img src={whatsapp} alt="Whatsapp" />
                      </div>
                    </button>
                  </a>
                  <button className="btn btn-success btn-share" onClick={handleShareButtonClick}>
                    <i className="fab fa-whatsapp"></i> Compartir
                    <div className="image-whatsapp"></div>
                  </button>
                  <p className="pagopage-factura-datos"></p>
                </div>
              ))}
              <div>
              <button onClick={handleSendEmail}>
  Enviar correo electrónico
</button>
      
    </div>
              <p className="pagopage-gracias">En breve nos pondremos en contacto con usted</p>
            </div>
            <button className="btn-buy" onClick={handleContinueShoppingClick}>
              <b>Seguir comprando</b>
            </button>
          </>
        )}
        {showCopiedMessage && (
          <div className="copied-link-message">
            <span className="copied-link-message-text">¡El enlace ha sido copiado al portapapeles!</span>
          </div>
        )}
      </div>
    </div>
  );
        }

export default PagoPage;
