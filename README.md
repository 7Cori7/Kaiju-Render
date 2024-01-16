# Kaiju-Render
Proyecto Kaiju Sushi-Bar.

Este proyecto se trata de una aplicación web para un hipotético restaurante de sushi.

La idea es crear una web que proporcione un medio automatizado y eficiente para la interacción cliente-producto.

La web posee las siguientes funciones:


1.Plataforma para mostrar el menú disponible de forma digital.

2.Hacer pedidos delivery o pick-up de forma on-line.

3.Hacer reservaciones on-line.

4.El usuario crea un perfil registrándose en la plataforma y puede llevar cuenta de todas las interacciones con el producto ofrecido.

5.Administrar las interacciones de los clientes y demás actividades de interés del restaurante.


El proceso de interacción del cliente con los productos es automático ya que se lleva a cabo de forma on-line con mínima intervención de empleados, Los procesos de realizar pedidos y reservaciones se manejan a través de un código QR para validar y hacer la entrega del producto. Mientras que los pago son online a través de la plataforma paypal.


PROCESO DE HACER PEDIDOS:

1.El usuario debe logguearse en la página.

2.Llenar el formulario para confirmar su compra. El acceso a este formulario es a través del carrito de compras.

3.Si todas las validaciones son correctas, se le redirecciona a la pantalla de "caja" donde puede elegir un método de pago y realizar su compra.

4.Un correo es enviado al usuario donde puede acceder a su factura y al código QR de su compra.

5.En el momento de retirar su pedido, se ecanea el código QR para así validar su compra en el panel del administrador.

6.Una vez que esta validación es correcta, se puede finalmente procesar el pedido como una venta.



PROCESO DE HACER RESERVACIONES:

1.El usuario llena un formulario indicando la fecha y hora de su reservación, además de la cantidad de personas que asistirán.

2.Se validarán la fecha y hora para asignar una mesa al cliente.

3.Son un total de 10 mesas disponibles y se asignan de forma random al cliente, pero dependiendo de la fecha y hora se compara con las demás reservaciones guardadas en la BD. Se asigna una mesa que no esté ocupada. En el caso de que las 10 mesas estén ocupadas para esa fecha y rango de horas, se arroja un mensaje de error al cliente.

4.Si todo es correcto, se envía un correo al cliente con los datos de su reservación y el acceso a su código QR.

5.Al escanear el código QR se valida el id de la reservación junto con la fecha y hora. Si todo es correcto, se actualiza el estado.

6.Si el cliente no se presenta a su reservación, esta se borrará automáticamente, o puede ser borrada manualmente por el admin.



-CREDENCIALES DEL ADMIN:
admin@kaiju.com
Kaiju2024.

