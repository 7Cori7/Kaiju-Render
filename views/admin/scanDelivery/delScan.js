const scanner = new Html5QrcodeScanner('reader', {
    
    qrbox: {

        width: 250,
        height: 250

    },
    fps: 20,

});


scanner.render(success, error);

async function success(result){

    document.querySelector('#result').innerHTML=`
    <p>${result}</p>
    `

    try{

        const idObj = {

            id: result
    
        };
    
        const response = await axios.post('/api/deliveries/scan', idObj);

        createNotificacion(false, response.data.message);

        scanner.clear();
        document.getElementById('reader').remove();

    }catch(error){

        console.log(error)

        createNotificacion(true, error.response.data.error);

        scanner.clear();
        document.getElementById('reader').remove();

    }

};


function error(err){

    console.error(err)

}