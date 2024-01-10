window.addEventListener('DOMContentLoaded', async () => {

    const parametroURL = new URLSearchParams(window.location.search);

    const idPedido = parametroURL.get('id');

    const listaPedidos = await axios.get('/api/deliveries/lista');

    const pedidosLista = listaPedidos.data.data;

    const userPedido = pedidosLista.filter(i => i.id === idPedido);

    const {cliente, pedido, formaPago, total, id, createdAt} = userPedido[0];

    const date = createdAt.split('T')[0];

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
                { text: 'Aquí está el código QR de tu pedido Delivery:\n\n', alignment: 'center'},
                {
                image: 'QR', alignment: 'center', margin: [2, 20]
                },
                {
    
                },
                {text: `Detalles del pedido:\n\n`, style: 'subheader', fontSize: 15, },
                {text: `Cliente: ${cliente.nombre}`},
                {text: `correo: ${cliente.correo}`},
                {text: `Forma de pago: ${formaPago}`},
                {text: `Fecha de recibo: ${date}\n\n\n\n`},
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
                'Cuota por delivery: $2',
                { text: `TOTAL: $${total}\n\n\n\n`, style: 'subheader', fontSize: 18, bold: true, margin: [2, 20] },
                { image: 'logo', alignment: 'center', width: 80}
    
            ],
    
            images: {
                QR: `http://api.qrserver.com/v1/create-qr-code/?data=${id}&size=100x100`,
                logo: 'https://kaiju-sushi-bar.onrender.com/imagenes/Logo2.png'
            },
    
            }
    
        pdfMake.createPdf(docDefinition).download('deliveryFactura.pdf');

});
