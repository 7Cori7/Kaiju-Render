window.addEventListener('DOMContentLoaded', async () => {

    const parametroURL = new URLSearchParams(window.location.search);

    const idReserva = parametroURL.get('id');

    const listaReservas = await axios.get('/api/reservaciones/lista');

    const reservasLista = listaReservas.data.data;

    const userReserva = reservasLista.filter(i => i.id === idReserva);

    const {cliente, fecha, hora, mesa, cantidad, salida, id} = userReserva[0];

    console.log(userReserva[0])

    var docDefinition = {

        content:[
    
                {
                    text: `Muchas gracias ${cliente} por tu reservación!\n\n`,
                    style: 'header',
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
                },
                { text: 'Aquí está el código QR de tu reservación:\n\n', alignment: 'center'},
                {
                image: 'QR', alignment: 'center', margin: [2, 20]
                },
                {text: `Detalles de su reserva:\n\n`, style: 'subheader', fontSize: 15, alignment: 'center'},
                {text: `A nombre de: ${cliente}\n\n`, alignment: 'center'},
                {text: `Fecha: ${fecha}\n\n`, alignment: 'center'},
                {text: `Hora: ${hora}:00\n\n`, alignment: 'center'},
                {text: `Mesa: ${mesa}\n\n`, alignment: 'center'},
                {text: `Cantidad de personas: ${cantidad}\n\n`, alignment: 'center'},
                {text: `Hora de salida: ${salida}:00\n\n\n\n`, alignment: 'center'},
                { image: 'logo', alignment: 'center', width: 80}
    
            ],
    
            images: {
                QR: `https://api.qrserver.com/v1/create-qr-code/?data=${id}&size=100x100`,
                logo: 'https://kaiju-sushi-bar.onrender.com/imagenes/Logo2.png'
            },
    
            }
    
        pdfMake.createPdf(docDefinition).download('reservacion.pdf');

});
