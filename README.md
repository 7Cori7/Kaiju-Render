# Kaiju Sushi-Bar 🦑
Proyecto Kaiju Sushi-Bar.

Este proyecto se trata de una aplicación web para un hipotético restaurante de sushi.
La idea es desarrollar una web que proporcione un medio automatizado y eficiente para la interacción cliente-producto.

Herramientas utilizadas:

- JavaScript
- HTML
- CSS
- NodeJS
- Tailwind CSS
- Express JS
- Axios
- Mongo DB (a través de mongoose)
- Otras librerias npm (cookie-parser, jwt, nodemailer, etc)
- Conexión a APIs para generar QRs, geolocalización, PDFs, etc.


La web posee las siguientes funciones:


- Plataforma para mostrar el menú disponible de forma digital.

- Hacer pedidos delivery o pick-up en línea desde la web.

- Hacer reservaciones en línea desde la web.

- El usuario crea un perfil registrándose en la plataforma y puede llevar cuenta de todas sus interacciones con el producto y servicio ofrecido.

- Se pueden administrar los procesos de los pedidos y demás actividades importantes del restaurante/negocio desde el admin panel.



El proceso de interacción del cliente con los productos es automático ya que se lleva a cabo de forma en línea sin intervención de empleados. Los procesos de validar y hacer la entrega del producto se manejan a través de códigos QR, mientras que los pago se realizan en línea a través de la plataforma Paypal u otros.



PROCESO DE HACER PEDIDOS:

1. El usuario debe loguearse en la página y seleccionar los productos a comprar.

2. Llenar el formulario para confirmar su compra (El acceso a este formulario es a través del carrito de compras).

3. Si todas las validaciones son correctas, se le redirecciona a la pantalla de "caja" donde puede elegir un método de pago y realizar su compra.

4. Un correo es enviado al usuario donde puede acceder a su factura y al código QR de su compra.

5. En el momento de retirar su pedido, se escanea el código QR para así validar su compra en el panel del administrador.

6. Una vez que esta validación es correcta, se puede finalmente procesar el pedido como una venta exitosa.




PROCESO DE HACER RESERVACIONES:

1. El usuario llena un formulario indicando la fecha y hora de su reservación, además de la cantidad de personas que asistirán.

2. Se validarán la fecha y hora para asignar una mesa al cliente.

3. Son un total de 10 mesas disponibles y se asignan de forma aleatoria al cliente, pero dependiendo de la fecha y hora se compara con las demás reservaciones guardadas en la BD. Se asigna una mesa que no esté ocupada. En el caso de que las 10 mesas estén ocupadas para esa fecha y rango de horas, se le notifica al cliente.

4. Si todo es correcto, se envía un correo al cliente con los datos de su reservación y el acceso a su código QR.

5. Al escanear el código QR se valida el id de la reservación junto con la fecha y hora. Si todo es correcto, se actualiza el estado de la reservación.

6. Si el cliente no se presenta a su reservación, esta se borrará automáticamente, o puede ser borrada manualmente por el admin.


Sitio web en render:

https://kaiju-sushi-bar.onrender.com/

Sitio web en vercel:

https://kaiju-sushi.vercel.app/


Credenciales admin:

user: admin@kaiju.com

pass: kaiJu2024*


Que te diviertas! 🦑
