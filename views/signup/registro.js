
const formulario = document.querySelector('#formulario');
const nameInput = document.querySelector('#nombre-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#password-input2');
const btnRegistro = document.querySelector('#registro-btn');


//* VALIDAMOS LOS CAMPOS CON REGEX:

const nameVal = /^[A-Z]{1}[a-zA-Z\s\S]+( [A-Z]{1}[a-zA-Z\s\S]+)?$/g;
const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!#$%&'*.+/=?^_`{|}~-]).{8,16}$/gm

let valname = false;
let valemail = false;
let valpass = false;
let valmatch = false;

// Manejando los inputs:
const updateNameInput = debounce(text => {
    valname = nameVal.test(text);
    validar(nameInput, valname);
});

const updateEmailInput = debounce(text => {
    valemail = emailVal.test(text);
    validar(emailInput, valemail);
});

const updatePasswordInput = debounce(text => {
    valpass = passwordVal.test(text);
    validar(passwordInput, valpass);
    validar(matchInput, valmatch)
});

const updateMatchPass = debounce(text => {
    valmatch = text === passwordInput.value;
    validar(matchInput, valmatch);
    validar(passwordInput, valpass)
});

nameInput.addEventListener('input', e => {

    updateNameInput(e.target.value);
});

emailInput.addEventListener('input', e => {

    updateEmailInput(e.target.value);
});

passwordInput.addEventListener('input', e => {

    updatePasswordInput(e.target.value);
});

matchInput.addEventListener('input', e => {

    updateMatchPass(e.target.value);
});


function debounce(callBack, delay = 1000){

    let timeout;

    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(()=>{    
            callBack(...args);
        }, delay);
    }
}



//Ponemos indicativos de colores a los campos para saber si estan bien o mal:
const validar = (input, value) => {

    btnRegistro.disabled = valname && valemail && valpass && valmatch ? false : true;

    if (value) {
        input.classList.remove('border-red-700', 'border-2');
        input.classList.add('border-green-700', 'border-2');
    } else if (input.value === '') {
        input.classList.remove('border-green-700', 'border-2');
        input.classList.remove('border-red-700', 'border-2');
    } else {
        input.classList.remove('border-green-700', 'border-2');
        input.classList.add('border-red-700', 'border-2');
    }
   
}


btnRegistro.addEventListener('click', e => {

    e.preventDefault();
    grecaptcha.execute();

});


async function crearUsuario(){

    try {
        const newUser = {

            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            cliente: true
        }

        formulario.reset();
        nameInput.classList.remove('border-green-700', 'border-2');
        emailInput.classList.remove('border-green-700', 'border-2');
        passwordInput.classList.remove('border-green-700', 'border-2');
        matchInput.classList.remove('border-green-700', 'border-2');

        //REQUEST:
        const response = await axios.post('/api/users', newUser);
        console.log(response);


        createNotificacion(false,response.data.message);

        setTimeout(()=>{

            btnRegistro.disabled = true;
            document.getElementById('mensaje').innerHTML='Hemos enviado un correo de comprobación a su e-mail';

        }, 2000);


    } catch (error) {

        console.log(error);
        createNotificacion(true,error.response.data.error);

        setTimeout(()=>{

            location.reload();

        }, 2000);

    }

};