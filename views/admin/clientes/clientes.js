//*IMPRIMIR LISTA DE CLIENTES
const listaClientes = document.querySelector('#listado-clientes');
const listaNoverified = document.querySelector('#listado-no-verified');

let userArr = [];

//*LISTA DE USUARIOS
document.addEventListener('DOMContentLoaded', async () => {
    
    try{

        const clientes = await axios.get('/api/users/lista-users');
        const clients = clientes.data.data;

        //*VERIFICADOS:
        const verificados = clients.filter( i => i.cliente === true && i.verified === true);

        userArr.push(verificados);

        verificados.forEach( i => {

            const {name, email, telefono, id} = i;

            const row = document.createElement('tr');

            if(telefono){

                row.innerHTML += `

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
    
                <p class="text-gray-700 font-medium text-sm leading-5">${name}</p>
               </td>
               
               <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${email}</p>
               </td>
               
               <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">0${telefono}</p>
               </td>
               
               <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
    
               <a href="#"  class="text-teal-600 mr-5 hover:text-teal-900 text-xl">
                    <i data-cliente="${id}" class='bx bx-envelope enviar'></i>
                </a>

                <a href="#" class="text-red-600 hover:text-red-900 text-xl">
                    <i data-cliente="${id}" class='bx bx-x eliminar'></i>
                </a>
    
               </td>
    
                `
            }else{

                row.innerHTML += `

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

                <p class="text-gray-700 font-medium text-sm leading-5">${name}</p>
                </td>
            
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5">${email}</p>
                </td>
                
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                    <p class="text-gray-700 font-medium text-sm leading-5">Sin Teléfono</p>
                </td>
                
                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

                <a href="#"  class="text-teal-600 mr-5 hover:text-teal-900 text-xl">
                    <i data-cliente="${id}" class='bx bx-envelope enviar'></i>
                </a>

                <a href="#" class="text-red-600 hover:text-red-900 text-xl">
                    <i data-cliente="${id}" class='bx bx-x eliminar'></i>
                </a>

                </td>

                `
            }

            
            listaClientes.appendChild(row);

        });


        //*NO VERIFICADOS:
        const noVerificados = clients.filter( i => i.cliente === true && i.verified === false);

        userArr.push(noVerificados);

        noVerificados.forEach(i => {

            const {name, email, createdAt, id} = i;

            const fecha = createdAt.split('T')[0];

            const row = document.createElement('tr');

            row.innerHTML += `

                <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
    
                <p class="text-gray-700 font-medium text-sm leading-5">${name}</p>
               </td>
               
               <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${email}</p>
               </td>

               <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${fecha}</p>
               </td>
               
               <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 text-sm eliminar">
                    Eliminar
                </a>
    
               </td>
    
            `

            listaNoverified.appendChild(row);

            if(fecha > hoy){

                eliminarUsuario(id);

            }
            
        });
        
    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }

});
console.log(userArr)

//Filtros:
const filtroVer = document.querySelector('#filtro-verificados');
let buscadorInput = document.querySelector('#buscador-input');
const buscadorBtn = document.querySelector('#busacdor-Btn');
const cajaResultado = document.querySelector('#nombres');

filtroVer.addEventListener('change', e => {

    const select = e.target.value;

    if(select === 'Todo'){

        document.startViewTransition(()=>{

            mostrarTodos();

        });
        

    }else{

        document.startViewTransition(()=>{

            filtrarUsers(select);

        });
        
    }

});


function filtrarUsers(usuarios){

    const arregloUsers = userArr.flat();

    if(usuarios === 'Usuarios-verificados'){

        const ver = arregloUsers.filter(i => i.verified === true);
        mostrarVerificados(ver);

    }else{

        const Nover = arregloUsers.filter(i => i.verified === false);
        mostrarNoverificados(Nover);

    }

};

function mostrarTodos(){

    limpiarHTML();

    //Verificados:
    userArr[0].forEach( i => {

        const {name, email, telefono, id} = i;

        const row = document.createElement('tr');

        if(telefono){

            row.innerHTML += `

            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <p class="text-gray-700 font-medium text-sm leading-5">${name}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">${email}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">0${telefono}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

           <a href="#"  class="text-teal-600 mr-5 hover:text-teal-900 text-xl">
                <i data-cliente="${id}" class='bx bx-envelope enviar'></i>
            </a>

            <a href="#" class="text-red-600 hover:text-red-900 text-xl">
                <i data-cliente="${id}" class='bx bx-x eliminar'></i>
            </a>

           </td>

            `
        }else{

            row.innerHTML += `

            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <p class="text-gray-700 font-medium text-sm leading-5">${name}</p>
            </td>
        
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${email}</p>
            </td>
            
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">Sin Teléfono</p>
            </td>
            
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <a href="#"  class="text-teal-600 mr-5 hover:text-teal-900 text-xl">
                <i data-cliente="${id}" class='bx bx-envelope enviar'></i>
            </a>

            <a href="#" class="text-red-600 hover:text-red-900 text-xl">
                <i data-cliente="${id}" class='bx bx-x eliminar'></i>
            </a>

            </td>

            `
        }

        
        listaClientes.appendChild(row);

    });

    //No verificados:
    userArr[1].forEach(i => {

        const {name, email, createdAt, id} = i;

        const fecha = createdAt.split('T')[0];

        const row = document.createElement('tr');

        row.innerHTML += `

            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <p class="text-gray-700 font-medium text-sm leading-5">${name}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">${email}</p>
           </td>

           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">${fecha}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 text-sm eliminar">
                Eliminar
            </a>

           </td>

        `

        listaNoverified.appendChild(row);

        if(fecha > hoy){

            eliminarUsuario(id);

        }
        
    });

};

function mostrarVerificados(users){

    limpiarHTML();
    console.log(users)

    users.forEach( i => {

        const {name, email, telefono, id} = i;

        const row = document.createElement('tr');

        if(telefono){

            row.innerHTML += `

            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <p class="text-gray-700 font-medium text-sm leading-5">${name}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">${email}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">0${telefono}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

           <a href="#"  class="text-teal-600 mr-5 hover:text-teal-900 text-xl">
                <i data-cliente="${id}" class='bx bx-envelope enviar'></i>
            </a>

            <a href="#" class="text-red-600 hover:text-red-900 text-xl">
                <i data-cliente="${id}" class='bx bx-x eliminar'></i>
            </a>

           </td>

            `
        }else{

            row.innerHTML += `

            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <p class="text-gray-700 font-medium text-sm leading-5">${name}</p>
            </td>
        
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${email}</p>
            </td>
            
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">Sin Teléfono</p>
            </td>
            
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <a href="#"  class="text-teal-600 mr-5 hover:text-teal-900 text-xl">
                <i data-cliente="${id}" class='bx bx-envelope enviar'></i>
            </a>

            <a href="#" class="text-red-600 hover:text-red-900 text-xl">
                <i data-cliente="${id}" class='bx bx-x eliminar'></i>
            </a>

            </td>

            `
        }

        
        listaClientes.appendChild(row);

    });


};

function mostrarNoverificados(users){

    limpiarHTML();
    console.log(users)

    users.forEach(i => {

        const {name, email, createdAt, id} = i;

        const fecha = createdAt.split('T')[0];

        const row = document.createElement('tr');

        row.innerHTML += `

            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <p class="text-gray-700 font-medium text-sm leading-5">${name}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">${email}</p>
           </td>

           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">${fecha}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 text-sm eliminar">
                Eliminar
            </a>

           </td>

        `

        listaNoverified.appendChild(row);

        if(fecha > hoy){

            eliminarUsuario(id);

        }
        
    });

};


function limpiarHTML(){

    while(listaClientes.firstChild){

        listaClientes.removeChild(listaClientes.firstChild);

    };

    while(listaNoverified.firstChild){

        listaNoverified.removeChild(listaNoverified.firstChild);

    };

};

buscadorInput.onkeyup = function(){

    let result = [];
    let input = buscadorInput.value;

    if(filtroVer.value === 'Usuarios-verificados'){

        if(input.length){

            result = userArr[0].filter(i=>{

            return i.email.toLowerCase().includes(input.toLowerCase());

            });

        }

    }else if(filtroVer.value === 'Usuarios-no-verificados'){

        if(input.length){

            result = userArr[1].filter(i=>{

            return i.email.toLowerCase().includes(input.toLowerCase());

            });

        }

    }else{

        const arregloUsers = userArr.flat();

        if(input.length){

            result = arregloUsers.filter(i=>{

            return i.email.toLowerCase().includes(input.toLowerCase());

            });

        }

    }

    console.log(result)
    mostarCorreo(result);

    if(!result.length){

        cajaResultado.innerHTML = '';

    }

};

function mostarCorreo(names){

    const content = names.map((lista)=>{

        return '<option>' + lista.email + '</option>';

    });

    cajaResultado.innerHTML = content.join('');
};


buscadorBtn.addEventListener('click', e => {

    e.preventDefault();
    console.log('buscar ', buscadorInput.value)

    const arregloUsers = userArr.flat();

    const correo = arregloUsers.filter(i=> i.email === buscadorInput.value);

    if(correo[0].verified){

        //Cuando es verificado:
        limpiarHTML();

        const {name, email, telefono, id} = correo[0];

        const row = document.createElement('tr');

        if(telefono){

            row.innerHTML += `

            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <p class="text-gray-700 font-medium text-sm leading-5">${name}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">${email}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">0${telefono}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

           <a href="#"  class="text-teal-600 mr-5 hover:text-teal-900 text-xl">
                <i data-cliente="${id}" class='bx bx-envelope enviar'></i>
            </a>

            <a href="#" class="text-red-600 hover:text-red-900 text-xl">
                <i data-cliente="${id}" class='bx bx-x eliminar'></i>
            </a>

           </td>

            `
        }else{

            row.innerHTML += `

            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <p class="text-gray-700 font-medium text-sm leading-5">${name}</p>
            </td>
        
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">${email}</p>
            </td>
            
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
                <p class="text-gray-700 font-medium text-sm leading-5">Sin Teléfono</p>
            </td>
            
            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <a href="#"  class="text-teal-600 mr-5 hover:text-teal-900 text-xl">
                <i data-cliente="${id}" class='bx bx-envelope enviar'></i>
            </a>

            <a href="#" class="text-red-600 hover:text-red-900 text-xl">
                <i data-cliente="${id}" class='bx bx-x eliminar'></i>
            </a>

            </td>

            `
        }

        listaClientes.appendChild(row);

    }else{

        //Cuando no es verificado:
        limpiarHTML();

        const {name, email, createdAt, id} = correo[0];

        const fecha = createdAt.split('T')[0];

        const row = document.createElement('tr');

        row.innerHTML += `

            <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <p class="text-gray-700 font-medium text-sm leading-5">${name}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">${email}</p>
           </td>

           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
            <p class="text-gray-700 font-medium text-sm leading-5">${fecha}</p>
           </td>
           
           <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">

            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 text-sm eliminar">
                Eliminar
            </a>

           </td>

        `

        listaNoverified.appendChild(row);

    }

    buscadorInput.value = '';

});



//modal Enviar mensaje:
const openEnviar = document.querySelector('[data-modal-enviar]');
const closeEnviar = document.querySelector('[data-close-modal]');
const formEnviar = document.querySelector('#mensaje-form');
const nombreInput = document.querySelector('#nombre');
const correoInput = document.querySelector('#correo');
const asuntoInput = document.querySelector('#asunto');
const cuerpoInput = document.querySelector('#cuerpo-mensaje');

let hoy = new Date().toISOString().split('T')[0];

//*ACCIONES:
//Verificados
listaClientes.addEventListener('click', async e => {

    e.preventDefault();

    try{

        //Eliminar usuario:
        if(e.target.classList.contains('eliminar')){

            const userId = {

                id: e.target.dataset.cliente

            };

            console.log(userId)

            const confirmar = confirm('¿Estás seguro de que quieres eliminar este usuario?');

            if(confirmar){

                const response = await axios.post('/api/users/eliminar-user', userId);

                createNotificacion(false,response.data.message);

                setTimeout(()=>{

                    location.reload();
        
                }, 2000);

            }

        };

        //Enviar correo:
        if(e.target.classList.contains('enviar')){

            openEnviar.showModal();

            const usuarioId = e.target.dataset.cliente;
            
            const clientes = await axios.get('/api/users/lista-users');
            const clients = clientes.data.data;
            
            const filtrado = clients.filter( i => i.id === usuarioId );

            //inputs:
            filtrado.forEach( i => {
                
                nombreInput.value = i.name;
                correoInput.value = i.email
                
            });

            formEnviar.addEventListener('submit', async () => {

                try{
            
                    const mensaje = {
            
                        nombre: nombreInput.value,
                        correo: correoInput.value,
                        asunto: asuntoInput.value,
                        cuerpo: cuerpoInput.value
                                
                    };
            
                    const response = await axios.post('/api/contactos/mensaje', mensaje);
            
                    createNotificacion(false,response.data.message);

                    setTimeout(()=>{

                        location.reload();
            
                    }, 1000);
            
                }catch(error){
            
                    console.log(error);
                    createNotificacion(true,error.response.data.error);
            
                }
            
            });

        }

    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }

});

closeEnviar.addEventListener('click', () => {

    formEnviar.reset();
    openEnviar.close();

});


//No verificados
listaNoverified.addEventListener('click', async e => {

    e.preventDefault();

    try{

        //Eliminar usuario:
        if(e.target.classList.contains('eliminar')){

            const userId = {

                id: e.target.dataset.cliente

            };

            console.log(userId)

            const confirmar = confirm('¿Estás seguro de que quieres eliminar este usuario?');

            if(confirmar){

                const response = await axios.post('/api/users/eliminar-user', userId);

                createNotificacion(false,response.data.message);

                setTimeout(()=>{

                    location.reload();
        
                }, 2000);

            }

        };


    }catch(error){

        console.log(error);
        createNotificacion(true,error.response.data.error);

    }

});

async function eliminarUsuario(user){

    const userId = {

        id: user

    };

    await axios.post('/api/users/eliminar-user', userId);

    setTimeout(()=>{

        location.reload();

    }, 2000);

};