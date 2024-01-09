window.addEventListener('DOMContentLoaded', async () => {

    const parametroURL = new URLSearchParams(window.location.search);

    const idPedido = parametroURL.get('id');

    const listaPedidos = await axios.get('/api/pickups/lista');

    const pedidosLista = listaPedidos.data.data;

    const userPedido = pedidosLista.filter(i => i.id === idPedido);

    const {cliente, pedido, fecha, hora, destino, formaPago, total, id} = userPedido[0];

    var body = [];

    body.push([{text:'PRODUCTO', bold: true}, {text: 'PRECIO', bold: true},{text: 'CANTIDAD', bold: true},{text: 'TOTAL', bold: true}]);
    for (var key in pedido) 
    {
        if (pedido.hasOwnProperty(key))
        {
            var pedidos = pedido[key];
            var fila = new Array();
            fila.push( pedidos.producto.toString() );
            fila.push( pedidos.precioBase.toString()  );
            fila.push( pedidos.cantidad.toString() );
            fila.push( pedidos.precio.toString()  );
            body.push(fila);
        }
    }

    var docDefinition = {

        content:[
    
                {
                    text: `Muchas gracias ${cliente.nombre} por tu compra!\n\n`,
                    style: 'header',
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
                },
                { text: 'Aquí está el código QR de tu pedido Pick-Up:\n\n', alignment: 'center'},
                {
                image: 'QR', alignment: 'center', margin: [2, 20]
                },
                {
    
                },
                {text: `Detalles del pedido:\n\n`, style: 'subheader', fontSize: 15, },
                {text: `Cliente: ${cliente.nombre}`},
                {text: `Fecha de pick-up: ${fecha}`},
                {text: `Hora de pick-up: ${hora}`},
                {text: `Local: ${destino}`},
                {text: `Forma de pago: ${formaPago}\n\n\n\n`},
                {
                    layout: 'lightHorizontalLines',
                    table: 
                    {
                        headerRows: 1,
                        widths: [ '*', 'auto', 100, '*' ],
                        heights: 30,
                        body: body
        
                    }
                },
                { text: `TOTAL: $${total}\n\n\n\n`, style: 'subheader', fontSize: 18, bold: true, margin: [2, 20] },
                { image: 'logo', alignment: 'center', width: 80}
    
            ],
    
            images: {
                QR: `http://api.qrserver.com/v1/create-qr-code/?data=${id}&size=100x100`,
                logo: 'http://localhost:4000/imagenes/Logo2.png'
            },
    
            }
    
        pdfMake.createPdf(docDefinition).download('pickupFactura.pdf');

});
