

const formulariocontact = document.querySelector('#formulario-contactos');
const nameInput = document.querySelector('#nombre-input');
const emailInput = document.querySelector('#email-input');
const asuntoInput = document.querySelector('#asunto-input');
const textoInput = document.querySelector('#texto-input');
const enviarBtn = document.querySelector('#enviar-formulario');



const nameVal = /^[A-Z]{1}[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+( [A-Z]{1}[a-zA-ZZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+)?$/g;
const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const asuntoVal = /^[\s\S]{1,80}$/g;
const textoVal = /^[\s\S]{1,200}$/g;

let valname = false;
let valemail = false;
let valasunto = false;
let valtexto = false;

//EVENTOS
nameInput.addEventListener('change', e => { 
    valname = nameVal.test(e.target.value);
    validar(nameInput, valname)
})

emailInput.addEventListener('change', e => {
    valemail = emailVal.test(e.target.value);
    validar(emailInput, valemail);
})

asuntoInput.addEventListener('change', e => {
    valasunto = asuntoVal.test(e.target.value);
    validar(asuntoInput, valasunto);
})

textoInput.addEventListener('keydown', e => {
    valtexto = textoVal.test(e.target.value);
    validar(textoInput, valtexto);
})

//FUNCIONES
const validar = (input, value) => {

    enviarBtn.disabled = valname && valemail && valasunto && valtexto ? false : true;

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

//ENVIAR MENSAJE
enviarBtn.addEventListener('click', e => {
    e.preventDefault();

    grecaptcha.execute();

});


async function enviarMsj(){
    try{

        const newContacto = {
            nombre: nameInput.value,
            correo: emailInput.value,
            asunto: asuntoInput.value,
            mensaje: textoInput.value
        };

        formulariocontact.reset();
        nameInput.classList.remove('border-green-700', 'border-2');
        emailInput.classList.remove('border-green-700', 'border-2');
        asuntoInput.classList.remove('border-green-700', 'border-2');
        textoInput.classList.remove('border-green-700', 'border-2');

        const response = await axios.post('/api/contactos', newContacto);
        console.log(response)
        console.log(newContacto)

        createNotificacion(false,response.data.message);

    }catch(error){
        console.log(error)
        createNotificacion(true,error.response.data.error);
    }
}




