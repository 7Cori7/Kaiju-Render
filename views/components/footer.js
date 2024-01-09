const foot = document.querySelector('#foot');

function crearFooterLogin(){
    foot.innerHTML = `
        <!--Footer Movil-->
        <div class="f-movil text-center flex flex-col justify-center items-center lg:hidden md:hidden">
        <h1 class="fuente-B text-5xl text-white uppercase">kaiju</h1>
        <h2 class="fuente-A uppercase text-white text-3xl">sushi-bar</h2>
        <div class="fuente-A uppercase text-white text-xl mt-20 flex gap-4">
            <a class="link-act px-2 py-2" aria-disabled="true">LOG-IN</a>
            <span class="border-l-2"></span>
            <a href="../signup" class="hover:bg-white hover:rounded-md hover:px-5 hover:py-2 hover:text-black px-5 py-2 transition ease-in-out delay-150 duration-300">SIGN-UP</a>
        </div>
        <div class="w-[60%]">
                <p class="fuente-A text-white text-lg mt-14">KAIJU SUHI-BAR 2023 todos los derechos reservados</p>
                <p class="fuente-A text-white text-lg mt-5 uppercase">Creado por Corina IDL</p>
        </div>
        </div>
    
    
        <!--Footer PC-->
        <div class="hidden f-pc text-center lg:flex md:flex flex-col justify-center items-center">
        <h1 class="fuente-B text-5xl text-white uppercase">kaiju</h1>
        <h2 class="fuente-A uppercase text-white text-3xl">sushi-bar</h2>
        <div class="fuente-A uppercase text-white text-xl mt-20 flex gap-4">
            <a class="link-act px-2 py-2" aria-disabled="true">LOG-IN</a>
            <span class="border-l-2"></span>
            <a href="../signup" class="hover:bg-white hover:rounded-md hover:px-5 hover:py-2 hover:text-black px-5 py-2 transition ease-in-out delay-150 duration-300">SIGN-UP</a>
        </div>
        <p class="fuente-A text-white text-lg mt-14">KAIJU SUHI-BAR 2023 todos los derechos reservados</p>
        <p class="fuente-A text-white text-lg mt-5 uppercase">Creado por Corina IDL</p>
        </div>
        
        `;
}


function crearFooterSignin(){
    foot.innerHTML = `
    <!--Footer Movil-->
    <div class="f-movil text-center flex flex-col justify-center items-center lg:hidden md:hidden">
    <h1 class="fuente-B text-5xl text-white uppercase">kaiju</h1>
    <h2 class="fuente-A uppercase text-white text-3xl">sushi-bar</h2>
    <div class="fuente-A uppercase text-white text-xl mt-20 flex gap-4">
        <a href="../login" class="hover:bg-white hover:rounded-md hover:px-5 hover:py-2 hover:text-black px-5 py-2 transition ease-in-out delay-150 duration-300">LOG-IN</a>
        <span class="border-l-2"></span>
        <a class="link-act px-2 py-2" aria-disabled="true">SIGN-UP</a>
    </div>
    <div class="w-[60%]">
                <p class="fuente-A text-white text-lg mt-14">KAIJU SUHI-BAR 2023 todos los derechos reservados</p>
                <p class="fuente-A text-white text-lg mt-5 uppercase">Creado por Corina IDL</p>
    </div>
    </div>


    <!--Footer PC-->
    <div class="hidden f-pc text-center lg:flex md:flex flex-col justify-center items-center">
    <h1 class="fuente-B text-5xl text-white uppercase">kaiju</h1>
    <h2 class="fuente-A uppercase text-white text-3xl">sushi-bar</h2>
    <div class="fuente-A uppercase text-white text-xl mt-20 flex gap-4">
        <a href="../login" class="hover:bg-white hover:rounded-md hover:px-5 hover:py-2 hover:text-black px-5 py-2 transition ease-in-out delay-150 duration-300">LOG-IN</a>
        <span class="border-l-2"></span>
        <a class="link-act px-2 py-2" aria-disabled="true">SIGN-UP</a>
    </div>
    <p class="fuente-A text-white text-lg mt-14">KAIJU SUHI-BAR 2023 todos los derechos reservados</p>
    <p class="fuente-A text-white text-lg mt-5 uppercase">Creado por Corina IDL</p>
    </div>
    
    `;
}


if(window.location.pathname === '/login/'){
    crearFooterLogin();
}else if(window.location.pathname === '/signup/'){
    crearFooterSignin();
}else{

    document.addEventListener('DOMContentLoaded', crearFooter);

    function crearFooter(){
        foot.innerHTML = `
        <!--Footer Movil-->
        <div class="f-movil text-center flex flex-col justify-center items-center lg:hidden md:hidden">
        <h1 class="fuente-B text-5xl text-white uppercase">kaiju</h1>
        <h2 class="fuente-A uppercase text-white text-3xl">sushi-bar</h2>
        <div class="fuente-A uppercase text-white text-xl mt-20 flex gap-4">
            <a href="../login" class="hover:bg-white hover:rounded-md hover:px-5 hover:py-2 hover:text-black px-5 py-2 transition ease-in-out delay-150 duration-300">LOG-IN</a>
            <span class="border-l-2"></span>
            <a href="../signup" class="hover:bg-white hover:rounded-md hover:px-5 hover:py-2 hover:text-black px-5 py-2 transition ease-in-out delay-150 duration-300">SIGN-UP</a>
        </div>
        <div class="w-[60%]">
                <p class="fuente-A text-white text-lg mt-14">KAIJU SUHI-BAR 2023 todos los derechos reservados</p>
                <p class="fuente-A text-white text-lg mt-5 uppercase">Creado por Corina IDL</p>
        </div>
        </div>
    
    
        <!--Footer PC-->
        <div class="hidden f-pc text-center lg:flex md:flex flex-col justify-center items-center">
        <h1 class="fuente-B text-5xl text-white uppercase">kaiju</h1>
        <h2 class="fuente-A uppercase text-white text-3xl">sushi-bar</h2>
        <div class="fuente-A uppercase text-white text-xl mt-20 flex gap-4">
            <a href="../login" class="hover:bg-white hover:rounded-md hover:px-5 hover:py-2 hover:text-black px-5 py-2 transition ease-in-out delay-150 duration-300">LOG-IN</a>
            <span class="border-l-2"></span>
            <a href="../signup" class="hover:bg-white hover:rounded-md hover:px-5 hover:py-2 hover:text-black px-5 py-2 transition ease-in-out delay-150 duration-300">SIGN-UP</a>
        </div>
        <p class="fuente-A text-white text-lg mt-14">KAIJU SUHI-BAR 2023 todos los derechos reservados</p>
        <p class="fuente-A text-white text-lg mt-5 uppercase">Creado por Corina IDL</p>
        </div>
        
        `;
    }
    
}


//=========================================================================================

//*FOOTER PARA LA SESIÓN DE USUARIO:
document.addEventListener('DOMContentLoaded', async () => {

    try{

        const usuario = await axios.get('/api/users/galleta');

        const user = usuario.data.data;

        if(user){

            function userFooter(){
                foot.innerHTML = `
                <!--Footer Movil-->
                <div class="f-movil text-center flex flex-col justify-center items-center lg:hidden md:hidden">
                <h1 class="fuente-B text-5xl text-white uppercase">kaiju</h1>
                <h2 class="fuente-A uppercase text-white text-3xl">sushi-bar</h2>
                <div class="fuente-A uppercase text-white text-xl mt-20 flex gap-4">
                    <a href="/panel-usuario" class="hover:bg-white hover:rounded-md hover:px-5 hover:py-2 hover:text-black px-5 py-2 transition ease-in-out delay-150 duration-300">PERFIL</a>
                    <span class="border-l-2"></span>
                    <a href="/api/users/logout" class="hover:bg-white hover:rounded-md hover:px-5 hover:py-2 hover:text-black px-5 py-2 transition ease-in-out delay-150 duration-300">SALIR</a>
                </div>
                <div class="w-[60%]">
                <p class="fuente-A text-white text-lg mt-14">KAIJU SUHI-BAR 2023 todos los derechos reservados</p>
                <p class="fuente-A text-white text-lg mt-5 uppercase">Creado por Corina IDL</p>
                </div>
                </div>
            
            
                <!--Footer PC-->
                <div class="hidden f-pc text-center lg:flex md:flex flex-col justify-center items-center">
                <h1 class="fuente-B text-5xl text-white uppercase">kaiju</h1>
                <h2 class="fuente-A uppercase text-white text-3xl">sushi-bar</h2>
                <div class="fuente-A uppercase text-white text-xl mt-20 flex gap-4">
                    <a href="/panel-usuario" class="hover:bg-white hover:rounded-md hover:px-5 hover:py-2 hover:text-black px-5 py-2 transition ease-in-out delay-150 duration-300">PERFIL</a>
                    <span class="border-l-2"></span>
                    <a href="/api/users/logout" class="hover:bg-white hover:rounded-md hover:px-5 hover:py-2 hover:text-black px-5 py-2 transition ease-in-out delay-150 duration-300">SALIR</a>
                </div>
                <p class="fuente-A text-white text-lg mt-14">KAIJU SUHI-BAR 2023 todos los derechos reservados</p>
                <p class="fuente-A text-white text-lg mt-5 uppercase">Creado por Corina IDL</p>
                </div>
                
                `;
            }

            userFooter();
            
        }


    }catch(error){
        console.log(error)
    }

});



