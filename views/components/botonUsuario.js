const botonUsuario = document.querySelector('#boton-usuario');
const cuerpo = document.querySelector('body');

document.addEventListener('DOMContentLoaded', async () => {

    const usuario = await axios.get('/api/users/galleta');

    const user = usuario.data.data;

    try{

        if(user){

            botonUsuario.innerHTML = `

            <div class="flex justify-center items-center border-2 border-black py-2 px-5 rounded-3xl cursor-pointer gap-1 hover:border-blue-400 hover:text-blue-400 ease-in-out delay-150 duration-300">
                <i class='bx bxs-user'></i>
                <a href="/perfil-usuario">${user.name}</a>
            </div>

            `

            cuerpo.appendChild(botonUsuario);

        }else{
            console.log('no ha iniciado sesión')
        }
        

    }catch(error){

        console.log(error)

    }

});



const logUserBtn = document.querySelector('#log-btn');

document.addEventListener('DOMContentLoaded', async () => {

    const usuario = await axios.get('/api/users/galleta');

    const user = usuario.data.data;

    try{

        if(user){

            logUserBtn.innerHTML = `
            
            <div class="flex justify-center items-center border-2 border-black py-2 px-5 rounded-3xl cursor-pointer gap-1 hover:scale-110 hover:border-blue-400 hover:text-blue-400 ease-in-out delay-150 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <a href="/panel-usuario">${user.name}</a>
            </div>
            
            `
        }else{
            console.log('no ha iniciado sesión')
        }

    }catch(error){

        console.log(error)

    }


});