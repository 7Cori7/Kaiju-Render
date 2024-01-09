
const formulario = document.querySelector('#formulario');
const nameInput = document.querySelector('#nombre-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#password-input2');
const btnRegistro = document.querySelector('#registro-btn');


//* VALIDAMOS LOS CAMPOS CON REGEX:

const nameVal = /^[A-Z]{1}[a-zA-ZZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+( [A-Z]{1}[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+)?$/g;
const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!#$%&'*.+/=?^_`{|}~-]).{8,16}$/gm

let valname = false;
let valemail = false;
let valpass = false;
let valmatch = false;

nameInput.addEventListener('change', e => { 
    valname = nameVal.test(e.target.value);
    ////console.log(valname);
    validar(nameInput, valname)

})

emailInput.addEventListener('change', e => {
    valemail = emailVal.test(e.target.value);
    validar(emailInput, valemail);
})

passwordInput.addEventListener('input', e => {
    valpass = passwordVal.test(e.target.value);
    validar(passwordInput, valpass);
   ////console.log(valpass);
    validar(matchInput, valmatch)
})

matchInput.addEventListener('input', e => {
    valmatch = e.target.value === passwordInput.value;
    validar(matchInput, valmatch);
    validar(passwordInput, valpass)
})



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

})


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

        btnRegistro.disabled = true;


    } catch (error) {

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }

};