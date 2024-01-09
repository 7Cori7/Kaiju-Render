const date = new Date();
var dd = date.getDate();
var mm = date.getMonth()+1; //como los mesese son de 0 a 11, se le suma 1
var yyyy = date.getFullYear();
if(dd<10){
  dd='0'+dd
} 
if(mm<10){
  mm='0'+mm
} 
const hoy = yyyy+'-'+mm+'-'+dd;
console.log(date, hoy)

const scanner = new Html5QrcodeScanner('reader', {
    
    qrbox: {

        width: 250,
        height: 250

    },
    fps: 20,

});


scanner.render(success, error);

async function success(result){

    console.log(result)

    try{

        const idObj = {

            id: result,
            hoy: hoy,
    
        };
    
        const response = await axios.post('/api/pickups/scan', idObj);

        createNotificacion(false, response.data.message);

        scanner.clear();
        document.getElementById('reader').remove();

        setTimeout(()=>{

            location.reload();

        },2000);

    }catch(error){

        console.log(error)

        createNotificacion(true, error.response.data.error);

        scanner.clear();
        document.getElementById('reader').remove();

    }

};

function error(err){

    console.error(err)

};