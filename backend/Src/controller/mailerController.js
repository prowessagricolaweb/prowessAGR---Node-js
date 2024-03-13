// const nodemailerFunctions = require("../helpers/mailer.js");

// exports.sendContactEmail = (req, res) => {
//   const { email, nombre, mensaje, telefono } = req.body;

//   const mailContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <style>
//             body {
//                 font-family: 'Arial', sans-serif;
//                 background-color: #eef2f7;
//                 color: #333333;
//                 margin: 0;
//                 padding: 20px;
//             }
//             .container {
//                 background-color: #ffffff;
//                 border-radius: 8px;
//                 padding: 20px;
//                 box-shadow: 0 4px 8px rgba(0,0,0,0.05);
//                 max-width: 600px;
//                 margin: 20px auto;
//             }
//             h1 {
//                 color: #4a90e2;
//             }
//             p {
//                 line-height: 1.6;
//             }
//             .footer {
//                 text-align: center;
//                 margin-top: 20px;
//                 font-size: 0.9em;
//                 color: #777777;
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <h1>Solicitud de Contacto</h1>
//             <p><strong>Nombre:</strong> ${nombre}</p>
//             <p><strong>Teléfono:</strong> ${telefono}</p>
//             <p><strong>Mensaje:</strong> ${mensaje}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <div class="footer">
//                 <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
//             </div>
//         </div>
//     </body>
//     </html>
//     `;

//   nodemailerFunctions.sendContactEmail(
//     email,
//     "Solicitud de Contacto",
//     mailContent,
//     (error, info) => {
//       if (error) {
//         console.error("Error al enviar email:", error);
//         return res.status(500).send("Error al enviar el mensaje");
//       }
//       res.status(200).send("Mensaje enviado correctamente");
//     }
//   );
// };

// exports.sendLoginNotificationEmail = (email, ip) => {
//   nodemailerFunctions.sendLoginNotification(email, ip, (error, info) => {
//     if (error) {
//       console.error("Error al enviar email:", error);
//     } else {
//       console.log("Email enviado correctamente:")
//     }
//   });
// };