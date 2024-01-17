const datosUser = document.querySelector('#datos-user');
const saludo = document.querySelector('#saludo');

document.addEventListener('DOMContentLoaded', async () => {

    const persona = await axios.get('/api/users/galleta');

    const person = persona.data.data;

    const {name, email, telefono} = person;

    saludo.innerHTML = `Bienvenid@! ${name}`;

    if(telefono){

        datosUser.innerHTML = `

        <p class="font-bold">Nombre usuario:</p>
        <span>${name}</span>
        <br>
        <br>
        <p class="font-bold">Correo:</p>
        <span>${email}</span>
        <br>
        <br>
        <p class="font-bold">Teléfono:</p>
        <span>0${telefono}</span>
        <br>
        <br>

        `

    }else{

        datosUser.innerHTML = `

        <p class="font-bold">Nombre usuario:</p>
        <span>${name}</span>
        <br>
        <br>
        <p class="font-bold">Correo:</p>
        <span>${email}</span>
        <br>
        <br>
        <p class="font-bold">Teléfono:</p>
        <span>Por favor, agregue un número de teléfono</span>
        <br>
        <br>

        `
    }


});

//*ELIMINAR USUARIO:
const elimiarUserBtn = document.querySelector('#borrar-usuario');

elimiarUserBtn.addEventListener('click', async e => {
    e.preventDefault();

    try{

        const cookie = await axios.get('/api/users/galleta');
        const galleta = cookie.data.data;

        const userId = {

            id: galleta.id
                
        };

        const confirmar = confirm('¿Está seguro de que desea borrar su cuenta? si acepta no podrá volver a ingresar y perderá toda la información');

        if(confirmar){

            const response = await axios.post('/api/users/eliminar-user', userId);

            createNotificacion(false,response.data.message);

            await axios.get('/api/users/logout');

            setTimeout(()=>{
                
                window.location.href= '/';

            },3000);

        }
        
    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);
        
    }

});


//*EDITAR EL USUARIO:
const editarUserBtn = document.querySelector('#editar-usuario');
const toggleEditar = document.querySelector('#editando-user');
const editUserForm = document.querySelector('#user-edit-form');
const confirmEdit = document.querySelector('#editar-user-btn');
//inputs:
const nombreUsuario = document.querySelector('#nombre-user');
const correoUsuario = document.querySelector('#email-user');
const telefonoUsuario = document.querySelector('#tel-user');
const nuevoPass = document.querySelector('#nuevo-password');
const matchPass = document.querySelector('#match-password');


editarUserBtn.addEventListener('click', async e => {

    e.preventDefault();
    toggleEditar.classList.toggle('hidden');

    const persona = await axios.get('/api/users/galleta');

    const person = persona.data.data;

    //inputs:
    nombreUsuario.value = person.name;
    correoUsuario.value = person.email;
    if(person.telefono){
        telefonoUsuario.value = person.telefono;
    }else{
        telefonoUsuario.value = '';
    }

    
    nombreUsuario.classList.remove('border-green-700', 'border-2');
    nombreUsuario.classList.remove('border-red-700', 'border-2');

    correoUsuario.classList.remove('border-green-700', 'border-2');
    correoUsuario.classList.remove('border-red-700', 'border-2');

    telefonoUsuario.classList.remove('border-green-700', 'border-2');
    telefonoUsuario.classList.remove('border-red-700', 'border-2');

    nuevoPass.classList.remove('border-green-700', 'border-2');
    nuevoPass.classList.remove('border-red-700', 'border-2');

    matchPass.classList.remove('border-green-700', 'border-2');
    matchPass.classList.remove('border-red-700', 'border-2');

    confirmEdit.disabled = true;
});


const nameVal = /^[a-zA-Z\s\S]+( [a-zA-Z\s\S]+)?$/g;
const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!#$%&'*.+/=?^_`{|}~-]).{8,16}$/gm;
const telVal = /(?:^[0]?[1-9]{2}|^[0]?[1-9]{2}?)[9]?[1-9]\d{3}?\d{4}$/

let valname = false;
let valemail = false;
let valtel = false;
let valpass = false;
let valmatch = false;

nombreUsuario.addEventListener('input', e => {

    valname = nameVal.test(e.target.value);
    validar(nombreUsuario, valname);

});

correoUsuario.addEventListener('input', e => {

    valemail = emailVal.test(e.target.value);
    validar(correoUsuario, valemail);

});


telefonoUsuario.addEventListener('input', e => {

    valtel = telVal.test(e.target.value);
    validar(telefonoUsuario, valtel);

});

nuevoPass.addEventListener('input', e => {
    valpass = passwordVal.test(e.target.value);
    validarPass(nuevoPass, valpass);
    validarPass(matchPass, valmatch);
});

matchPass.addEventListener('input', e => {
    valmatch = e.target.value === nuevoPass.value;
    validarPass(matchPass, valmatch);
    validarPass(nuevoPass, valpass);
});


const validar = (input, value) => {

    confirmEdit.disabled = valname || valemail || valtel ? false : true;

    if (value) {
        input.classList.remove('border-red-700', 'border-2');
        input.classList.add('border-green-700', 'border-2');
    } else if (input.value === '') {
        input.classList.remove('border-green-700', 'border-2');
        input.classList.remove('border-red-700', 'border-2');
    } else {
        input.classList.remove('border-green-700', 'border-2');
        input.classList.add('border-red-700', 'border-2');
    };

};


const validarPass = (input, value) => {

    confirmEdit.disabled = valpass && valmatch ? false : true;

    if (value) {
        input.classList.remove('border-red-700', 'border-2');
        input.classList.add('border-green-700', 'border-2');
    } else if (input.value === '') {
        input.classList.remove('border-green-700', 'border-2');
        input.classList.remove('border-red-700', 'border-2');
    } else {
        input.classList.remove('border-green-700', 'border-2');
        input.classList.add('border-red-700', 'border-2');
    };

};


editUserForm.addEventListener('submit', async e => {

    e.preventDefault();
    grecaptcha.execute();
 
});


async function editPerfil(){

    try{

        const persona = await axios.get('/api/users/galleta');

        const person = persona.data.data;

        const userActualizado = {

            id: person.id,
            name: nombreUsuario.value,
            email: correoUsuario.value,
            telefono: telefonoUsuario.value,
            password: nuevoPass.value,
        
        };

        const response = await axios.post('/api/users/edit-user', userActualizado);
    
        createNotificacion(false,response.data.message);
        
        toggleEditar.classList.toggle('hidden');

        setTimeout(()=>{

            location.reload();

        }, 1000);

    }catch(error){

        console.log(error)
        createNotificacion(true,error.response.data.error);

    }

};

confirmEdit.disabled = true;
