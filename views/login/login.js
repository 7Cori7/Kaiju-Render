const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const formulario = document.querySelector('#formulario');
const loginBtn = document.querySelector('[data-Boton]');

loginBtn.disabled = true;

const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!#$%&'*.+/=?^_`{|}~-]).{8,16}$/gm

let valemail = false;
let valpass = false;

// Manejando los inputs:
const updateEmailInput = debounce(text => {
    valemail = emailVal.test(text);
    validar(emailInput, valemail);
});

const updatePasswordInput = debounce(text => {
    valpass = passwordVal.test(text);
    validar(passwordInput, valpass);
});

emailInput.addEventListener('input', e => {

    updateEmailInput(e.target.value);
});
passwordInput.addEventListener('input', e => {
   
    updatePasswordInput(e.target.value);
});

// Debounce:
function debounce(callBack, delay = 1000){

    let timeout;

    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            callBack(...args);
        }, delay);
    }
}

const validar = (input, value) => {

    loginBtn.disabled = valemail && valpass ? false : true;

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



formulario.addEventListener('submit', e => {

    e.preventDefault();
    grecaptcha.execute();
    
});

async function main(){

    try {

        const usuarioLog = {

            email: emailInput.value,
            password: passwordInput.value
        }

        formulario.reset();

        emailInput.classList.remove('border-green-700', 'border-2');
        passwordInput.classList.remove('border-green-700', 'border-2');

        loginBtn.disabled = true;
        
        //*REQUEST:
        const response = await axios.post('/api/users/login', usuarioLog);

        createNotificacion(false,response.data.message);

        window.location.href = '/';


    } catch (error) {

        console.log(error);

        //notificacion:
        createNotificacion(true,error.response.data.error);

        setTimeout(()=>{

            location.reload();

        }, 2000);
    };

};

