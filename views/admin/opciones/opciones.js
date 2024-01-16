const nombreAdmin = document.querySelector('#nombreAdmin');

document.addEventListener('DOMContentLoaded', async () => {
    
    const administrador = await axios.get('/api/users/ikka');

    const admin = administrador.data.data;

    try{

        nombreAdmin.innerHTML = `${admin}`;

    }catch(error){

        console.log(error)

    }

});

//*EDITAR ADMIN
const editarAdminBtn = document.querySelector('#editar-admin');
const editando = document.querySelector('#editando-admin');
const formularioEdit = document.querySelector('#admin-edit-form');
//Inputs:
const aliasInput = document.querySelector('#edit-nombre-admin');
const emailInput = document.querySelector('#edit-email-admin');
const nuevoPass = document.querySelector('#edit-nuevo-password');
const nuevoMatch = document.querySelector('#edit-match-password');
const guardarEdit = document.querySelector('#editar-admin-btn');

editarAdminBtn.addEventListener('click', async e => {

    e.preventDefault();
    editando.classList.toggle('hidden');

    const administrador = await axios.get('/api/users/ikka-list');
    const admin = administrador.data.data;

    //Inputs:
    aliasInput.value = admin.name;
    emailInput.value = admin.email;

    aliasInput.classList.remove('border-green-700', 'border-2');
    aliasInput.classList.remove('border-red-700', 'border-2');

    emailInput.classList.remove('border-green-700', 'border-2');
    emailInput.classList.remove('border-red-700', 'border-2');

    nuevoPass.classList.remove('border-green-700', 'border-2');
    nuevoPass.classList.remove('border-red-700', 'border-2');

    nuevoMatch.classList.remove('border-green-700', 'border-2');
    nuevoMatch.classList.remove('border-red-700', 'border-2');

    guardarEdit.disabled = true;

    guardarEdit.addEventListener('submit', async e => {

        e.preventDefault();
    
        try{

            const adminActualizado = {

                id: admin.id,
                name: aliasInput.value,
                email: emailInput.value,
                password: nuevoPass.value,
            
            };

            const response = await axios.post('/api/users/edit-ikka', adminActualizado);
    
            createNotificacion(false,response.data.message);

            setTimeout(()=>{

                location.reload();
    
            }, 1000);
    
        }catch(error){
    
            console.log(error)
            createNotificacion(true,error.response.data.error);
            
        }
    
    });
});

const nameVal = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+( [A-Z]{1}[a-zA-ZZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]+)?$/g;
const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!#$%&'*.+/=?^_`{|}~-]).{8,16}$/gm;

let valname = false;
let valemail = false;
let valpass = false;
let valmatch = false;

aliasInput.addEventListener('change', e => {
    valname = nameVal.test(e.target.value);
    validar(aliasInput, valname);
});

emailInput.addEventListener('change', e => {
    valemail = emailVal.test(e.target.value);
    validar(emailInput, valemail);
})

nuevoPass.addEventListener('change', e => {
    valpass = passwordVal.test(e.target.value);
    validarPass(nuevoPass, valpass);
    validarPass(nuevoMatch, valmatch);
});

nuevoMatch.addEventListener('change', e => {
    valmatch = e.target.value === nuevoPass.value;
    validarPass(nuevoMatch, valmatch);
    validarPass(nuevoPass, valpass);
});


const validar = (input, value) => {

    guardarEdit.disabled = valname || valemail ? false : true;

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

    guardarEdit.disabled = valpass && valmatch ? false : true;

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

guardarEdit.disabled = true;


//*CREAR NUEVO ADMIN
const crearAdmin = document.querySelector('#crear-admin');
const modalCrearAdmin = document.querySelector('[data-modal-admin]');
const formCrearAdmin = document.querySelector('#nuevo-admin-form');
const crearNameInput = document.querySelector('#nuevo-nombre-admin');
const crearEmailInput = document.querySelector('#crear-email-admin');
const crearPassInput = document.querySelector('#admin-password');
const crearPassMatch = document.querySelector('#admin-password2');
const nuevoAdminBtn = document.querySelector('#nuevo-admin-btn');
const closeModal = document.querySelector('[data-close-modal]');

crearAdmin.addEventListener('click', () => {
    modalCrearAdmin.showModal();
});

closeModal.addEventListener('click', () => {

    formCrearAdmin.reset();

    crearNameInput.classList.remove('border-green-700', 'border-2');
    crearNameInput.classList.remove('border-red-700', 'border-2');

    crearEmailInput.classList.remove('border-green-700', 'border-2');
    crearEmailInput.classList.remove('border-red-700', 'border-2');

    crearPassInput.classList.remove('border-green-700', 'border-2');
    crearPassInput.classList.remove('border-red-700', 'border-2');

    crearPassMatch.classList.remove('border-green-700', 'border-2');
    crearPassMatch.classList.remove('border-red-700', 'border-2');

    nuevoAdminBtn.disabled = true;

    modalCrearAdmin.close();
});


crearNameInput.addEventListener('change', e => {
    valname = nameVal.test(e.target.value);
    validarNuevo(crearNameInput, valname);
});

crearEmailInput.addEventListener('change', e => {
    valemail = emailVal.test(e.target.value);
    validarNuevo(crearEmailInput, valemail);
});

crearPassInput.addEventListener('change', e => {
    valpass = passwordVal.test(e.target.value);
    validarNuevo(crearPassInput, valpass);
    validarNuevo(crearPassMatch, valmatch);
});

crearPassMatch.addEventListener('change', e => {
    valmatch = e.target.value === crearPassInput.value;
    validarNuevo(crearPassMatch, valmatch);
    validarNuevo(crearPassInput, valpass);
})


const validarNuevo = (input, value) => {

    nuevoAdminBtn.disabled = valname && valemail && valpass && valmatch ? false : true;

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

nuevoAdminBtn.addEventListener('click', e => {
    e.preventDefault();

    grecaptcha.execute();

});

async function crear(){

    try{

        const newUser = {

            name: crearNameInput.value,
            email: crearEmailInput.value,
            password: crearPassInput.value,
            cliente: false
        };

        formCrearAdmin.reset();
        crearNameInput.classList.remove('border-green-700', 'border-2');
        crearEmailInput.classList.remove('border-green-700', 'border-2');
        crearPassInput.classList.remove('border-green-700', 'border-2');
        crearPassMatch.classList.remove('border-green-700', 'border-2');

        //REQUEST:
        const response = await axios.post('/api/users', newUser);
        console.log(response);

        createNotificacion(false,response.data.message);

        modalCrearAdmin.close();

    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }

};

nuevoAdminBtn.disabled = true;
