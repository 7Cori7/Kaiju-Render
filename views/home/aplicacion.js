//*SELECTORES:

const cuerpo = document.querySelector('body');


//botones:

const contactosBtn = document.querySelector('#contactos-btn');
const sushiBtn = document.querySelector('#sushi-btn');
const barBtn = document.querySelector('#bar-btn');
const btnTop = document.querySelector('#to-top');


//sidebars:

const horariosSB = document.querySelector('#horarios');
const horariosBtn = document.querySelectorAll('.horario-btn');
const cerrarBtn = document.querySelector('.cerrar-sb');
const reservarSB = document.querySelector('#reservar');
const cerrarReservas = document.querySelector('.cerrar-reservas');
const reservarBtn = document.querySelectorAll('.reservar-btn');
const backdrop = document.querySelector('.back');

const crearReserva = document.querySelector('#crear-reserva');


//carrusel:

const slider = document.querySelector('.slider');
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const indicatorParents = document.querySelector('.controls ul');
var sectionIndex = 0;



//*EVENTOS:
//boton para ir a contactos:
contactosBtn.addEventListener('click', e => {
    e.preventDefault();
    window.location.pathname = '../contactos';
})


//boton para ir a menu-sushi:
sushiBtn.addEventListener('click', e => {
    e.preventDefault();
    window.location.pathname = '../sushi';
})


//boton para ir a menu-bar:
barBtn.addEventListener('click', e => {
    e.preventDefault();
    window.location.pathname = '../bar';
})



//side bars:
horariosBtn.forEach(i=> i.addEventListener('click', e => {
    e.preventDefault();
    horariosSB.classList.toggle('activo');
    backdrop.classList.toggle('activo');
    cuerpo.classList.toggle('overflow-hidden');

    window.scrollTo(0, 0);
}));

cerrarBtn.addEventListener('click', e => {
    e.preventDefault();
    horariosSB.setAttribute('closing','');
    horariosSB.addEventListener('animationend', ()=>{
        horariosSB.removeAttribute('closing');
        horariosSB.classList.toggle('activo');
        backdrop.classList.toggle('activo');
        cuerpo.classList.toggle('overflow-hidden');
    }, {once: true})
})


reservarBtn.forEach(i=> i.addEventListener('click', e => {
    e.preventDefault();
    reservarSB.classList.toggle('activo');
    backdrop.classList.toggle('activo');
    cuerpo.classList.toggle('overflow-hidden');

    window.scrollTo(0, 0);
}))

cerrarReservas.addEventListener('click', e => {
    e.preventDefault();
    reservarSB.setAttribute('closing','');
    reservarSB.addEventListener('animationend', ()=>{
        reservarSB.removeAttribute('closing');
        reservarSB.classList.toggle('activo');
        backdrop.classList.toggle('activo');
        cuerpo.classList.toggle('overflow-hidden');
    }, {once: true})
})

//carrusel:
document.querySelectorAll('.controls li').forEach(function(indicator, ind) {
    indicator.addEventListener('click', function() {
        sectionIndex = ind;
        document.querySelector('.controls .selected').classList.remove('selected');
        indicator.classList.add('selected');
        slider.style.transform = 'translate(' + (sectionIndex) * -33.3 + '%)';
    });
});

leftArrow.addEventListener('click', function(){
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
    document.querySelector('.controls .selected').classList.remove('selected');
    indicatorParents.children[sectionIndex].classList.add('selected');
    slider.style.transform = 'translate(' + (sectionIndex) * -33.3 + '%)';
});

rightArrow.addEventListener('click', function(){
    sectionIndex = (sectionIndex < 2) ? sectionIndex + 1 : 2;
    document.querySelector('.controls .selected').classList.remove('selected');
    indicatorParents.children[sectionIndex].classList.add('selected');
    slider.style.transform = 'translate(' + (sectionIndex) * -33.3 + '%)';
});


btnTop.addEventListener('click', () => {
    window.scrollTo(0, 0);
})



//*FORMULARIO DE RESERVACIONES:
const formulario = document.querySelector('#formulario');
const nameInput = document.querySelector('#nombre-input');
const emailInput = document.querySelector('#email-input');
const telInput = document.querySelector('#telefono-input');
const personasInput = document.querySelector('#cantidad-input');
const fechaInput = document.querySelector('#fecha-input')
const horaInput = document.querySelector('#hora-input');
const reservaBtn = document.querySelector('#crear-reserva-btn');
const mensaje = document.querySelector('.mensaje');


horaInput.disabled = true;

//Arreglo para las mesas:
let ocupadas = [];
let mesa;


//Establecer que sólo sean seleccionables en el calendario la fecha actual y hasta máximo 60 días después:
var fechaTope = new Date();
fechaTope.setDate(fechaTope.getDate() + 60);
var FTd = fechaTope.getDate();
var FTm = fechaTope.getMonth()+1; //como los mesese son de 0 a 11, se le suma 1
var FTa = fechaTope.getFullYear();
if(FTd<10){
    FTd='0'+FTd
  } 
  if(FTm<10){
    FTm='0'+FTm
  }
fechaTope = FTa+'-'+FTm+'-'+FTd;


var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1; //como los mesese son de 0 a 11, se le suma 1
var yyyy = hoy.getFullYear();
if(dd<10){
  dd='0'+dd
} 
if(mm<10){
  mm='0'+mm
} 
hoy = yyyy+'-'+mm+'-'+dd;

fechaInput.setAttribute('min',hoy);
fechaInput.setAttribute('max',fechaTope);



//*REGEX:
const nameVal = /^[a-zA-Z\s\S]+( [a-zA-Z\s\S]+)?$/g;
const telVal = /(?:^[0]?[1-9]{2}|^[0]?[1-9]{2}?)[9]?[1-9]\d{3}?\d{4}$/
const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g



let valname = false;
let valemail = false;
let valtel = false;
let valdate = false;
let valhour = false;
let valpersona = false;

// Manejar los inputs:
const updateNameInput = debounce(name => {
    valname = nameVal.test(name);
    validar(nameInput, valname)
});

const updateTelInput = debounce(tel => {
    valtel = telVal.test(tel);
    validar(telInput, valtel);
});

const updateEmailInput = debounce(email => {
    valemail = emailVal.test(email);
    validar(emailInput, valemail);
});

const updateFechaInput = debounce(fecha => {
    valdate = fecha;
    validar(fechaInput, valdate);
    horaInput.disabled = false;
});

//*EVENTOS:
nameInput.addEventListener('change', e => { 
    updateNameInput(e.target.value);
})

telInput.addEventListener('change', e => {
    updateTelInput(e.target.value);
})

emailInput.addEventListener('change', e => {
    updateEmailInput(e.target.value);
})

fechaInput.addEventListener('change', e => {
    updateFechaInput(e.target.value);
})


function debounce(callBack, delay = 1000){

    let timeout;

    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            callBack(...args);
        },delay);
    }
}


horaInput.addEventListener('change', async e => {

    const horaAct = new Date().getHours();
    valhour = parseInt(e.target.value);

    //Validar la hora
    if(valhour < 10 || valhour > 21){
        horaInput.classList.add('border-red-700', 'border-2');
        mensaje.innerHTML = 'el local estará cerrado a esa hora'
    }else if(valhour <= horaAct && fechaInput.value === hoy){
        horaInput.classList.add('border-red-700', 'border-2');
        mensaje.innerHTML = 'hora inválida'
    }else{
        horaInput.classList.add('border-green-700', 'border-2');
        mensaje.innerHTML = '';
        validar(horaInput, valhour);
    }

    //Comparar con BD
    const lista = await axios.get('/api/reservaciones/lista');
    const list = lista.data.data;

    const fecha = fechaInput.value;

    const mismoDia = list.filter(i=> i.fecha === fecha);

    if(mismoDia.length > 0){

        const mismaHora = mismoDia.some(i=> i.hora == valhour || i.hora < valhour && i.salida > valhour);

        if(mismaHora){

            mismoDia.map(i => {

                if (i.hora <= valhour && i.salida > valhour){

                    ocupadas.push(i.mesa);

                }

            });

        }

    }

    //asignar mesa:
    asignarMesa();

});

function asignarMesa(){

    mesa = Math.floor(Math.random() * 10) + 1;
    console.log('mesa: ', mesa)

    if(!ocupadas.includes(mesa)) {

        return ocupadas.push(mesa);
        
    }else{

        if(ocupadas.length >= 10) {

            mensaje.innerHTML = 'No hay mesas disponibles para esa hora'
            horaInput.classList.add('border-red-700', 'border-2');
            ocupadas = [];
            return reservaBtn.disabled = true;

        }else{

            return  asignarMesa();

        }

    }

};


personasInput.addEventListener('change', e => {
    valpersona = e.target.value;

    if(valpersona <= 0){
        console.log('error');
        personasInput.classList.add('border-red-700', 'border-2');
    }else if (valpersona > 8){
        console.log('error');
        personasInput.classList.add('border-red-700', 'border-2');
    }else{
        personasInput.classList.add('border-green-700', 'border-2');
        validar(personasInput, valpersona);
    }
});



//indicativos de colores a los campos para saber si estan bien o mal:

const validar = (input, value) => {

    reservaBtn.disabled = valname && valtel && valemail && valdate && valhour && valpersona ? false : true;

    if(value){
        input.classList.remove('border-red-700', 'border-2');
        input.classList.add('border-green-700', 'border-2');
    }else if(input.value === ''){
        input.classList.remove('border-green-700', 'border-2');
        input.classList.remove('border-red-700', 'border-2');
    }else{
        input.classList.remove('border-green-700', 'border-2');
        input.classList.add('border-red-700', 'border-2');
    }

}


reservaBtn.addEventListener('click', e => {
    
    e.preventDefault();
    grecaptcha.execute();

});

async function crearReservaHome(){

    const hora = parseInt(horaInput.value);

    const salida = hora + 2;

    try{
        
        const newReserva = {

            cliente: nameInput.value,
            telefono: telInput.value,
            correo: emailInput.value,
            cantidad: personasInput.value,
            fecha: fechaInput.value,
            hora: hora,
            mesa: mesa,
            salida: salida

        }

        const response = await axios.post('/api/reservaciones', newReserva);

        createNotificacion(false,response.data.message);

        setTimeout(()=>{

            window.location.href = '/confirmar-reservacion';

        },1500)

    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }

};


document.addEventListener('DOMContentLoaded', async () => {

    const ikka = await axios.get('/api/users/ikka');

    if(ikka){

        window.location.href = '/calamar';

    }else{

        console.log('no ikka')
        
    }

});