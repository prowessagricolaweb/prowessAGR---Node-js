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
import jsPDF from 'jspdf';
import "jspdf-autotable";



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


  const enviarCorreo = () => {
    try {
      const logoUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...'; // Coloca aquí la representación en base64 de tu imagen
        const pdf = new jsPDF();



    // Configurar estilo del texto
    pdf.setFont('helvetica'); // Cambiar a 'times'
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0); // Color en RGB (negro)

    // Agregar el logo
    pdf.addImage(logoUrl, 'JPEG', 10, 10, 50, 20);

    // Agregar el título de la factura
    pdf.setFontSize(20);
    pdf.text('Confirmación del Pedido', 70, 30);

    // Agregar los detalles del cliente
    pdf.setFontSize(12);
    pdf.text(`Estimado/a ${usuario.nombre},`, 10, 60);
    pdf.text(`Gracias por comprar con nosotros. Tu pedido ${orderNumber} está confirmado. Te avisaremos cuando se envíe.`, 10, 70);
    pdf.text(`Dirección de envío: ${usuario.direccion}`, 10, 80);

    // Agregar los detalles del pedido
    pdf.text('Detalles del Pedido', 10, 90);
    pdf.text(`Nº de orden: ${orderNumber}`, 10, 100);

    // Agregar los detalles de los productos en una tabla más estilizada
    let yPosition = 110;
    const tableHeaders = ['Producto', 'Cantidad', 'Precio Unitario', 'Total', 'Vendedor'];
    const tableData = cart.map(product => {
        const precio = product.precio || 15; // Si el precio no está definido, asignar 0
        return [
            product.pro_nombre,
            `${product.cantidad} ${product.pro_medida}`,
            `$${precio.toFixed(2)}`,
            `$${(precio * product.cantidad).toFixed(2)}`,
            product.pro_vendedor
        ];
    });

    pdf.autoTable({
        startY: yPosition,
        head: [tableHeaders],
        body: tableData,
        theme: 'grid',
        margin: { top: 10 }
    });

    // Mensaje adicional
    pdf.text('Quedo a la espera de cualquier confirmación o instrucciones adicionales.', 10, pdf.autoTable.previous.finalY + 10);

    // Footer empresarial
    const footerHeight = 50; // Altura del footer empresarial
    const footerY = pdf.internal.pageSize.height - footerHeight;
    pdf.setFillColor(50, 50, 50);
    pdf.rect(0, footerY, pdf.internal.pageSize.width, footerHeight, 'F');

    // Texto en el footer
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.text('ProwessAgrícola | Dr. Luis Simbaña Taipe | lesimbania@espe.edu.ec', 10, footerY + 15);
    pdf.text('Todos los derechos reservados - Prowess Ecuador © 2024 | Revisa nuestros Términos y Condiciones', 10, footerY + 25);


    const pdfBase64 = pdf.output('datauristring');

    // Construir el enlace "mailto" con el PDF adjunto
    const mailtoLink = `
        mailto:${usuario.email}
        ?subject=Confirmación de Pedido ${orderNumber}
        &body=Estimado/a ${usuario.nombre},%0A%0AGracias por comprar con nosotros. Tu pedido ${orderNumber} está confirmado. Te avisaremos cuando se envíe.%0A%0ADirección de envío: ${usuario.direccion}%0A%0ADetalles del Pedido%0ANº de orden: ${orderNumber}%0A%0A${''/* Resto de la información del pedido */}%0A%0AQuedo a la espera de cualquier confirmación o instrucciones adicionales.%0A%0AProwessAgrícola | Dr. Luis Simbaña Taipe | lesimbania@espe.edu.ec%0A%0ATodos los derechos reservados - Prowess Ecuador © 2024 | Revisa nuestros Términos y Condiciones%0A%0A`;

    // Adjuntar el PDF al enlace "mailto"
    const attachmentString = encodeURIComponent(pdfBase64);
    const attachmentLink = `data:application/pdf;base64,${attachmentString}`;
    const attachmentOption = `attachment=${attachmentLink}`;
    const mailtoLinkWithAttachment = `${mailtoLink}${attachmentOption}`;

    // Imprimir en consola para depuración
    console.log('Intentando enviar el correo:', mailtoLinkWithAttachment);

    // Abrir el cliente de correo predeterminado con el enlace "mailto" y el PDF adjunto
    window.location.href = mailtoLinkWithAttachment;
} catch (error) {
    // Capturar y mostrar errores en consola
    console.error('Error al enviar el correo:', error);
}
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
                <div key={index}>
                  
                  <p className="pagopage-factura-datos">
                    <div className='img-producto-factura'>
                      <img src={product.pro_imagen} alt={product.pro_nombre} />
                    </div>
                    <span className="pagopage-factura-label">Nº de orden:</span>
{orderNumber}
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
                  <button className="boton-enviar" onClick={enviarCorreo}>Enviar correo</button>
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