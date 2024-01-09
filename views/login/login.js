const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const formulario = document.querySelector('#formulario');
const loginBtn = document.querySelector('[data-Boton]');

loginBtn.disabled = true;

const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!#$%&'*.+/=?^_`{|}~-]).{8,16}$/gm

let valemail = false;
let valpass = false;

emailInput.addEventListener('input', e => {
    valemail = emailVal.test(e.target.value);
    validar(emailInput, valemail);
})
passwordInput.addEventListener('input', e => {
    valpass = passwordVal.test(e.target.value);
    validar(passwordInput, valpass);
})

const validar = (input, value) => {

    loginBtn.disabled = valemail && valpass ? false : true;
    ////console.log(btnRegistro.disabled);

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



formulario.addEventListener('submit', async e => {
    e.preventDefault();

    grecaptcha.execute();
    
});


async function main(){

    try {

        const usuarioLog = {

            email: emailInput.value,
            password: passwordInput.value
        }

        ////console.log(usuarioLog)

        formulario.reset();

        emailInput.classList.remove('border-green-700', 'border-2');
        passwordInput.classList.remove('border-green-700', 'border-2');

        loginBtn.disabled = true;
        
        //*REQUEST:
        const response = await axios.post('/api/users/login', usuarioLog);

        ////console.log(response)

        createNotificacion(false,response.data.message);

        window.location.href = '/';


    } catch (error) {

        console.log(error);

        //notificacion:
        createNotificacion(true,error.response.data.error);

    };

};

