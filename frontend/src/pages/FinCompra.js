//Creo una pagina que a través del json de ordenes, genere una lista de botones
//donde elos lleven al whatsapp del vendedor con el mensaje de la orden

import React from "react";
import WhatsButton from "../components/WhatsButton";

function FinCompra(){

    const num = '0998160293'

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Gracias por su compra</h1>
                    <h2>En breve nos pondremos en contacto con usted</h2>
                    <WhatsButton number={num} message={"Hola, quiero hacer un pedido"} />
                </div>
            </div>
        </div>
    );
}

export default FinCompra;