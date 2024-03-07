import { Resend } from 'resend';

export const resend = new Resend('re_TYVMjyTB_MpMqn4XxJXkxM8TuvfsdSA8V');

export async function handleSendEmail() {
    try {
      const { data, error } = await resend.emails.send({
        from: 'Acme <darwinrvaldiviezo@gmail.com>',
        to: ['darwinrvaldiviezo@gmail.com'],
        subject: 'Confirmación de compra',
        html: '<strong>¡Gracias por tu compra!</strong>',
      });
  
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      } else {
        console.log('Correo electrónico enviado con éxito:', data);
        // Puedes mostrar un mensaje de éxito al usuario si lo deseas
      }
    } catch (error) {
      console.error('Error en la solicitud de red:', error);
      // Manejar el error de red, mostrar un mensaje al usuario, etc.
    }
  }