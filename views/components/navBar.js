const navBar = document.querySelector('#navBar');
const body = document.querySelector('body');

function crearNavHome(){
    navBar.innerHTML = `
    
    <!--Menu Hamburguesa-->
    <div class="flex items-center justify-center h-16">

        <div id="hamburguesa" class="toggle px-3 py-2 lg:hidden z-50"></div>
        
    </div>

    <!--Menu para el movil-->
        <div class="menu">
            <ul class="pt-10">
                <li><a href="../pide-online">PIDE ON-LINE</a></li>
                <li><a href="../sushi">MENU-SUSHI</a></li>
                <li><a href="../bar">MENU-BAR</a></li>
                <li><a href="../contactos">CONTÁCTANOS</a></li>
                <li><a href="../login">LOG-IN</a></li>
                <li><a href="../signup">SIGN-UP</a></li>
            </ul>
        </div>

        <!--Menu para PC-->
        <div class="hidden sticky lg:flex text-white fuente-A text-xl w-full flex-grow md:items-center md:w-auto md:justify-between mx-auto">
            <div class="pc-nav-menu px-8">
                <a href="../pide-online" class="px-4 py-3">PIDE ON-LINE</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../sushi" class="px-4 py-3">MENÚ-SUSHI</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../bar" class="px-4 py-3">MENÚ-BAR</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../contactos" class="px-4 py-3">CONTÁCTANOS</a>
            </div>
            
            <div class="px-8 pc-nav-menu">
                <a href="../login" class="px-6 py-3">LOG-IN</a>
                <span class="border-l-2 pr-1"></span>
                <a href="../signup" class="px-6 py-3">SIGN-UP</a>
            </div>
        </div>

    `;

    //*menú para movil:

    const hamburguesa = document.querySelector('#hamburguesa');
    const menu = document.querySelector('.menu');
    
    hamburguesa.addEventListener('click', ()=>{
        hamburguesa.classList.toggle('activo');
        body.classList.toggle('overflow-hidden');
        menu.classList.toggle('activo');
    })

}

function crearNavBar(){
    navBar.innerHTML = `
    
    <!--Menu Hamburguesa-->
    <div class="flex items-center justify-center h-16">

        <div id="hamburguesa" class="toggle px-3 py-2 lg:hidden z-50"></div>
        
    </div>

    <!--Menu para el movil-->
        <div class="menu">
            <ul class="pt-10">
                <li><a href="../">HOME</a></li>
                <li><a href="../pide-online">PIDE ON-LINE</a></li>
                <li><a href="../sushi">MENU-SUSHI</a></li>
                <li><a class="link-act" aria-disabled="true">MENU-BAR</a></li>
                <li><a href="../contactos">CONTÁCTANOS</a></li>
                <li><a href="../login">LOG-IN</a></li>
                <li><a href="../signup">SIGN-UP</a></li>
            </ul>
        </div>

        <!--Menu para PC-->
        <div class="hidden sticky lg:flex text-white fuente-A text-xl w-full flex-grow md:items-center md:w-auto md:justify-between mx-auto">
            <div class="pc-nav-menu px-8">
                <a href="../" class="px-4 py-3">HOME</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../pide-online" class="px-4 py-3">PIDE ON-LINE</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../sushi" class="px-4 py-3">MENÚ-SUSHI</a>
                <span class="border-l-2 pr-2"></span>
                <a class="px-4 py-3 link-act" aria-disabled="true">MENÚ-BAR</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../contactos" class="px-4 py-3">CONTÁCTANOS</a>
            </div>
            
            <div class="px-8 pc-nav-menu">
                <a href="../login" class="px-6 py-3">LOG-IN</a>
                <span class="border-l-2 pr-1"></span>
                <a href="../signup" class="px-6 py-3">SIGN-UP</a>
            </div>
        </div>

    `;

    //*menú para movil:

    const hamburguesa = document.querySelector('#hamburguesa');
    const menu = document.querySelector('.menu');
    
    hamburguesa.addEventListener('click', ()=>{
        hamburguesa.classList.toggle('activo');
        menu.classList.toggle('activo');
        body.classList.toggle('overflow-hidden');
    })

};

function crearNavSushi(){
    navBar.innerHTML = `
    
    <!--Menu Hamburguesa-->
    <div class="flex items-center justify-center h-16">

        <div id="hamburguesa" class="toggle px-3 py-2 lg:hidden z-50"></div>
        
    </div>

    <!--Menu para el movil-->
        <div class="menu">
            <ul class="pt-10">
                <li><a href="../">HOME</a></li>
                <li><a href="../pide-online">PIDE ON-LINE</a></li>
                <li><a class="link-act" aria-disabled="true">MENU-SUSHI</a></li>
                <li><a href="../bar">MENU-BAR</a></li>
                <li><a href="../contactos">CONTÁCTANOS</a></li>
                <li><a href="../login">LOG-IN</a></li>
                <li><a href="../signup">SIGN-UP</a></li>
            </ul>
        </div>

        <!--Menu para PC-->
        <div class="hidden sticky lg:flex text-white fuente-A text-xl w-full flex-grow md:items-center md:w-auto md:justify-between mx-auto">
            <div class="pc-nav-menu px-8">
                <a href="../" class="px-4 py-3">HOME</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../pide-online" class="px-4 py-3">PIDE ON-LINE</a>
                <span class="border-l-2 pr-2"></span>
                <a class="px-4 py-3 link-act" aria-disabled="true">MENÚ-SUSHI</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../bar" class="px-4 py-3">MENÚ-BAR</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../contactos" class="px-4 py-3">CONTÁCTANOS</a>
            </div>
            
            <div class="px-8 pc-nav-menu">
                <a href="../login" class="px-6 py-3">LOG-IN</a>
                <span class="border-l-2 pr-1"></span>
                <a href="../signup" class="px-6 py-3">SIGN-UP</a>
            </div>
        </div>

    `;

    //*menú para movil:

    const hamburguesa = document.querySelector('#hamburguesa');
    const menu = document.querySelector('.menu');
    
    hamburguesa.addEventListener('click', ()=>{
        hamburguesa.classList.toggle('activo');
        menu.classList.toggle('activo');
        body.classList.toggle('overflow-hidden');
    })
 
}


function crearNavPide(){
    navBar.innerHTML = `
    
    <!--Menu Hamburguesa-->
    <div class="flex items-center justify-center h-16">

        <div id="hamburguesa" class="toggle px-3 py-2 lg:hidden z-50"></div>
        
    </div>

    <!--Menu para el movil-->
        <div class="menu">
            <ul class="pt-10">
                <li><a href="../">HOME</a></li>
                <li><a class="link-act" aria-disabled="true">PIDE ON-LINE</a></li>
                <li><a href="../sushi">MENU-SUSHI</a></li>
                <li><a href="../bar">MENU-BAR</a></li>
                <li><a href="../contactos">CONTÁCTANOS</a></li>
                <li><a href="../login">LOG-IN</a></li>
                <li><a href="../signup">SIGN-UP</a></li>
            </ul>
        </div>

        <!--Menu para PC-->
        <div class="hidden lg:flex text-white fuente-A text-xl w-full flex-grow md:items-center md:w-auto md:justify-between mx-auto">
            <div class="pc-nav-menu px-8">
                <a href="../" class="px-4 py-3">HOME</a>
                <span class="border-l-2 pr-2"></span>
                <a class="px-4 py-3 link-act" aria-disabled="true"">PIDE ON-LINE</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../sushi" class="px-4 py-3">MENÚ-SUSHI</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../bar" class="px-4 py-3">MENÚ-BAR</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../contactos" class="px-4 py-3">CONTÁCTANOS</a>
            </div>
            
            <div class="px-8 pc-nav-menu">
                <a href="../login" class="px-6 py-3">LOG-IN</a>
                <span class="border-l-2 pr-1"></span>
                <a href="../signup" class="px-6 py-3">SIGN-UP</a>
            </div>
        </div>

    `;

    //*menú para movil:

    const hamburguesa = document.querySelector('#hamburguesa');
    const menu = document.querySelector('.menu');
    
    hamburguesa.addEventListener('click', ()=>{
        hamburguesa.classList.toggle('activo');
        menu.classList.toggle('activo');
        body.classList.toggle('overflow-hidden');
    })
 
}


function crearNavContact(){
    navBar.innerHTML = `
    
    <!--Menu Hamburguesa-->
    <div class="flex items-center justify-center h-16">

        <div id="hamburguesa" class="toggle px-3 py-2 lg:hidden z-50"></div>
        
    </div>

    <!--Menu para el movil-->
    <div class="menu">
        <ul class="pt-10">
            <li><a href="../">HOME</a></li>
            <li><a href="../pide-online">PIDE ON-LINE</a></li>
            <li><a href="../sushi">MENU-SUSHI</a></li>
            <li><a href="../bar">MENU-BAR</a></li>
            <li><a class="link-act" aria-disabled="true">CONTÁCTANOS</a></li>
            <li><a href="../login">LOG-IN</a></li>
            <li><a href="../signup">SIGN-UP</a></li>
        </ul>
    </div>

        <!--Menu para PC-->
        <div class="hidden sticky lg:flex text-white fuente-A text-xl w-full flex-grow md:items-center md:w-auto md:justify-between mx-auto">
            <div class="pc-nav-menu px-8">
                <a href="../" class="px-4 py-3">HOME</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../pide-online" class="px-4 py-3">PIDE ON-LINE</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../sushi" class="px-4 py-3">MENÚ-SUSHI</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../bar" class="px-4 py-3">MENÚ-BAR</a>
                <span class="border-l-2 pr-2"></span>
                <a class="px-4 py-3 link-act" aria-disabled="true"">CONTÁCTANOS</a>
            </div>
            
            <div class="px-8 pc-nav-menu">
                <a href="../login" class="px-6 py-3">LOG-IN</a>
                <span class="border-l-2 pr-1"></span>
                <a href="../signup" class="px-6 py-3">SIGN-UP</a>
            </div>
        </div>

    `;

    //*menú para movil:

    const hamburguesa = document.querySelector('#hamburguesa');
    const menu = document.querySelector('.menu');
    
    hamburguesa.addEventListener('click', ()=>{
        hamburguesa.classList.toggle('activo');
        menu.classList.toggle('activo');
        body.classList.toggle('overflow-hidden');
    })
 
}


function crearNavLogin(){
    navBar.innerHTML = `
    
    <!--Menu Hamburguesa-->
    <div class="flex items-center justify-center h-16">

        <div id="hamburguesa" class="toggle px-3 py-2 lg:hidden z-50"></div>
        
    </div>

    <!--Menu para el movil-->
        <div class="menu">
            <ul class="pt-10">
                <li><a href="../">HOME</a></li>
                <li><a href="../pide-online">PIDE ON-LINE</a></li>
                <li><a href="../sushi">MENU-SUSHI</a></li>
                <li><a href="../bar">MENU-BAR</a></li>
                <li><a href="../contactos">CONTÁCTANOS</a></li>
                <li><a class="link-act" aria-disabled="true">LOG-IN</a></li>
                <li><a href="../signup">SIGN-UP</a></li>
            </ul>
        </div>

        <!--Menu para PC-->
        <div class="hidden sticky lg:flex text-white fuente-A text-xl w-full flex-grow md:items-center md:w-auto md:justify-between mx-auto">
            <div class="pc-nav-menu px-8">
                <a href="../" class="px-4 py-3">HOME</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../pide-online" class="px-4 py-3">PIDE ON-LINE</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../sushi" class="px-4 py-3">MENÚ-SUSHI</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../bar" class="px-4 py-3">MENÚ-BAR</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../contactos" class="px-4 py-3">CONTÁCTANOS</a>
            </div>
            
            <div class="px-8 pc-nav-menu">
                <a class="px-4 py-3 link-act" aria-disabled="true"">LOG-IN</a>
                <span class="border-l-2 pr-1"></span>
                <a href="../signup" class="px-6 py-3">SIGN-UP</a>
            </div>
        </div>

    `;

    //*menú para movil:

    const hamburguesa = document.querySelector('#hamburguesa');
    const menu = document.querySelector('.menu');
    
    hamburguesa.addEventListener('click', ()=>{
        hamburguesa.classList.toggle('activo');
        menu.classList.toggle('activo');
        body.classList.toggle('overflow-hidden');
    })
 
}


function crearNavSignin(){
    navBar.innerHTML = `
    
    <!--Menu Hamburguesa-->
    <div class="flex items-center justify-center h-16">

        <div id="hamburguesa" class="toggle px-3 py-2 lg:hidden z-50"></div>
        
    </div>

    <!--Menu para el movil-->
        <div class="menu">
            <ul class="pt-10">
                <li><a href="../">HOME</a></li>
                <li><a href="../pide-online">PIDE ON-LINE</a></li>
                <li><a href="../sushi">MENU-SUSHI</a></li>
                <li><a href="../bar">MENU-BAR</a></li>
                <li><a href="../contactos">CONTÁCTANOS</a></li>
                <li><a href="../login">LOG-IN</a></li>
                <li><a class="link-act" aria-disabled="true">SIGN-UP</a></li>
            </ul>
        </div>

        <!--Menu para PC-->
        <div class="hidden sticky lg:flex text-white fuente-A text-xl w-full flex-grow md:items-center md:w-auto md:justify-between mx-auto">
            <div class="pc-nav-menu px-8">
                <a href="../" class="px-4 py-3">HOME</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../pide-online" class="px-4 py-3">PIDE ON-LINE</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../sushi" class="px-4 py-3">MENÚ-SUSHI</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../bar" class="px-4 py-3">MENÚ-BAR</a>
                <span class="border-l-2 pr-2"></span>
                <a href="../contactos" class="px-4 py-3">CONTÁCTANOS</a>
            </div>
            
            <div class="px-8 pc-nav-menu">
                <a href="../login" class="px-6 py-3">LOG-IN</a>
                <span class="border-l-2 pr-1"></span>
                <a class="px-4 py-3 link-act" aria-disabled="true"">SIGN-UP</a>
            </div>
        </div>

    `;

    //*menú para movil:

    const hamburguesa = document.querySelector('#hamburguesa');
    const menu = document.querySelector('.menu');
    
    hamburguesa.addEventListener('click', ()=>{
        hamburguesa.classList.toggle('activo');
        menu.classList.toggle('activo');
        body.classList.toggle('overflow-hidden');
    })
 
}


function crearNavPickDelv(){
    navBar.innerHTML = `
    
    <!--Menu-->
        <div class="flex text-white fuente-A text-xl w-full items-center justify-between">

            <div class="pc-nav-menu px-0 md:px-8 flex">

                <a href="../" class="pl-4 pr-5 py-3">HOME</a>
                <span class="border-l-2 pr-2 my-2"></span>

                <div class="flex items-center cursor-pointer relative categorias-btn">
                    <a href="#" class="px-4 py-3 relative">CATEGORÍAS</a>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flechita w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flechita2 w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    
                </div>
                
            
                
            </div>

            <!--Menu Categorias-->

            <div id="categorias-menu">
                <ul>

                    <li class="hover:bg-blue-600 py-2 px-2 w-full"><a href="#" id="cat-1">BEBIDAS</a></li>
                    <li class="hover:bg-blue-600 py-2 px-2 w-full"><a href="#" id="cat-2">ROLES FRÍOS</a></li>
                    <li class="hover:bg-blue-600 py-2 px-2 w-full"><a href="#" id="cat-3">TEMPURA ROLLS</a></li>
                    <li class="hover:bg-blue-600 py-2 px-2 w-full"><a href="#" id="cat-4">NIGIRI SUSHI</a></li>
                    <li class="hover:bg-blue-600 py-2 px-2 w-full"><a href="#" id="cat-5">TEMAKI SUSHI</a></li>
                    <li class="hover:bg-blue-600 py-2 px-2 w-full"><a href="#" id="cat-6">ENTRADAS</a></li>
                    <li class="hover:bg-blue-600 py-2 px-2 w-full"><a href="#" id="cat-7">POSTRES</a></li>

                </ul>

            </div>



            <!--Menu Carrito-->
            
            <div class="mr-5 lg:mr-16">

            <div class="submenu">
                <ul>
                    <img src="../menu-img/cart.png" alt="icono de carrito de compras" class="cursor-pointer relative">
                    <div class="indicador"></div>

                            <div id="carrito">
                                    
                                    <table id="lista-carrito" class="w-full box-border">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>

                                    <div class="flex justify-center items-center pt-20 vacio">
                                    <p>Todavía no has agregado nada al carrito</p>
                                    </div>

                                    <div class="flex justify-center items-center py-10">
                                        <a href="#" id="comprar-btn" class="w-full hidden box-border py-2 px-10 border-2 rounded-3xl text-center hover:bg-white hover:text-blue-500">Realizar Compra</a>
                                    </div>
                            </div>
                </ul>
            </div>

                
            </div>
        </div>
    
    `


    //CATEGORIAS DROPDOWN MENU:

    const categoriaBtn = document.querySelector('.categorias-btn');
    const categoriaMenu = document.querySelector('#categorias-menu');

    const flecha1 = document.querySelector('.flechita');
    const flecha2 = document.querySelector('.flechita2');

    
    categoriaBtn.addEventListener('click', e => {
        e.preventDefault();
        categoriaMenu.classList.toggle('activo');
        flecha1.classList.toggle('activo');
        flecha2.classList.toggle('activo');

    });

};


//* agregar las rutas para los componentes:
if(window.location.pathname === '/'){
    crearNavHome();
}else if(window.location.pathname === '/bar/'){
    crearNavBar();
}else if(window.location.pathname === '/sushi/'){
    crearNavSushi();
}else if(window.location.pathname === '/pide-online/'){
    crearNavPide();
}else if(window.location.pathname === '/contactos/'){
    crearNavContact();
}else if(window.location.pathname === '/login/'){
    crearNavLogin();
}else if(window.location.pathname === '/signup/'){
    crearNavSignin();
}else if(window.location.pathname === '/delivery/' || window.location.pathname === '/pick-up/'){
    crearNavPickDelv();
}


//================================================================================================



//*NAV-BAR PARA LA SESIÓN DEL USUARIO:
document.addEventListener('DOMContentLoaded', async () => {

    try{

        const usuario = await axios.get('/api/users/galleta');

        const user = usuario.data.data;

        //*HOME PAGE:
        async function userHome(){

            navBar.innerHTML = `
            
            <!--Menu Hamburguesa-->
            <div class="flex items-center justify-center h-16">
        
                <div id="hamburguesa" class="toggle px-3 py-2 lg:hidden z-50"></div>
                
            </div>
        
            <!--Menu para el movil-->
            <div class="menu">
                <ul class="pt-10 uppercase">
                    <li><a href="../pide-online">PIDE ON-LINE</a></li>
                    <li><a href="../sushi">MENU-SUSHI</a></li>
                    <li><a href="../bar">MENU-BAR</a></li>
                    <li><a href="../contactos">CONTÁCTANOS</a></li>
                    <li><a href="/panel-usuario" class="gap-2"><i class='bx bxs-user'></i> ${user.name}</a></li>
                </ul>
            </div>
        
                <!--Menu para PC-->
                <div class="hidden sticky lg:flex text-white fuente-A text-xl w-full flex-grow md:items-center md:w-auto md:justify-between mx-auto">
                    <div class="pc-nav-menu px-8">
                        <a href="../pide-online" class="px-4 py-3">PIDE ON-LINE</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../sushi" class="px-4 py-3">MENÚ-SUSHI</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../bar" class="px-4 py-3">MENÚ-BAR</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../contactos" class="px-4 py-3">CONTÁCTANOS</a>
                    </div>
                    
                    <div class="px-8 pc-nav-menu">
                        <a href="/panel-usuario" class="px-6 py-3 uppercase"><i class='bx bxs-user'></i> ${user.name}</a>
                    </div>
                </div>
        
            `;
        
            //*menú para movil:
        
            const hamburguesa = document.querySelector('#hamburguesa');
            const menu = document.querySelector('.menu');
            
            hamburguesa.addEventListener('click', ()=>{
                hamburguesa.classList.toggle('activo');
                body.classList.toggle('overflow-hidden');
                menu.classList.toggle('activo');
            })
        
        }

        //*MENU-BAR:
        function userBar(){

            navBar.innerHTML = `
            
            <!--Menu Hamburguesa-->
            <div class="flex items-center justify-center h-16">
        
                <div id="hamburguesa" class="toggle px-3 py-2 lg:hidden z-50"></div>
                
            </div>
        
            <!--Menu para el movil-->
                <div class="menu">
                    <ul class="pt-10 uppercase">
                        <li><a href="../">HOME</a></li>
                        <li><a href="../pide-online">PIDE ON-LINE</a></li>
                        <li><a href="../sushi">MENU-SUSHI</a></li>
                        <li><a class="link-act" aria-disabled="true">MENU-BAR</a></li>
                        <li><a href="../contactos">CONTÁCTANOS</a></li>
                        <li><a href="/panel-usuario" class="gap-2"><i class='bx bxs-user'></i> ${user.name}</a></li>
                    </ul>
                </div>
        
                <!--Menu para PC-->
                <div class="hidden sticky lg:flex text-white fuente-A text-xl w-full flex-grow md:items-center md:w-auto md:justify-between mx-auto">
                    <div class="pc-nav-menu px-8">
                        <a href="../" class="px-4 py-3">HOME</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../pide-online" class="px-4 py-3">PIDE ON-LINE</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../sushi" class="px-4 py-3">MENÚ-SUSHI</a>
                        <span class="border-l-2 pr-2"></span>
                        <a class="px-4 py-3 link-act" aria-disabled="true">MENÚ-BAR</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../contactos" class="px-4 py-3">CONTÁCTANOS</a>
                    </div>
                    
                    <div class="px-8 pc-nav-menu">
                        <a href="/panel-usuario" class="px-6 py-3 uppercase"><i class='bx bxs-user'></i> ${user.name}</a>
                    </div>
                </div>
        
            `;
        
            //*menú para movil:
        
            const hamburguesa = document.querySelector('#hamburguesa');
            const menu = document.querySelector('.menu');
            
            hamburguesa.addEventListener('click', ()=>{
                hamburguesa.classList.toggle('activo');
                menu.classList.toggle('activo');
                body.classList.toggle('overflow-hidden');
            })
        
        };
        
        //*MENU SUSHI
        function userSushi(){
            navBar.innerHTML = `
            
            <!--Menu Hamburguesa-->
            <div class="flex items-center justify-center h-16">
        
                <div id="hamburguesa" class="toggle px-3 py-2 lg:hidden z-50"></div>
                
            </div>
        
            <!--Menu para el movil-->
                <div class="menu">
                    <ul class="pt-10 uppercase">
                        <li><a href="../">HOME</a></li>
                        <li><a href="../pide-online">PIDE ON-LINE</a></li>
                        <li><a class="link-act" aria-disabled="true">MENU-SUSHI</a></li>
                        <li><a href="../bar">MENU-BAR</a></li>
                        <li><a href="../contactos">CONTÁCTANOS</a></li>
                        <li><a href="/panel-usuario" class="gap-2"><i class='bx bxs-user'></i> ${user.name}</a></li>
                    </ul>
                </div>
        
                <!--Menu para PC-->
                <div class="hidden sticky lg:flex text-white fuente-A text-xl w-full flex-grow md:items-center md:w-auto md:justify-between mx-auto">
                    <div class="pc-nav-menu px-8">
                        <a href="../" class="px-4 py-3">HOME</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../pide-online" class="px-4 py-3">PIDE ON-LINE</a>
                        <span class="border-l-2 pr-2"></span>
                        <a class="px-4 py-3 link-act" aria-disabled="true">MENÚ-SUSHI</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../bar" class="px-4 py-3">MENÚ-BAR</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../contactos" class="px-4 py-3">CONTÁCTANOS</a>
                    </div>
                    
                    <div class="px-8 pc-nav-menu">
                        <a href="/panel-usuario" class="px-6 py-3 uppercase"><i class='bx bxs-user'></i> ${user.name}</a>
                    </div>
                </div>
        
            `;
        
            //*menú para movil:
        
            const hamburguesa = document.querySelector('#hamburguesa');
            const menu = document.querySelector('.menu');
            
            hamburguesa.addEventListener('click', ()=>{
                hamburguesa.classList.toggle('activo');
                menu.classList.toggle('activo');
                body.classList.toggle('overflow-hidden');
            })
         
        }

        //*PIDE ONLINE:
        function userPide(){
            navBar.innerHTML = `
            
            <!--Menu Hamburguesa-->
            <div class="flex items-center justify-center h-16">
        
                <div id="hamburguesa" class="toggle px-3 py-2 lg:hidden z-50"></div>
                
            </div>
        
            <!--Menu para el movil-->
                <div class="menu">
                    <ul class="pt-10 uppercase">
                        <li><a href="../">HOME</a></li>
                        <li><a class="link-act" aria-disabled="true">PIDE ON-LINE</a></li>
                        <li><a href="../sushi">MENU-SUSHI</a></li>
                        <li><a href="../bar">MENU-BAR</a></li>
                        <li><a href="../contactos">CONTÁCTANOS</a></li>
                        <li><a href="/panel-usuario" class="gap-2"><i class='bx bxs-user'></i> ${user.name}</a></li>
                    </ul>
                </div>
        
                <!--Menu para PC-->
                <div class="hidden lg:flex text-white fuente-A text-xl w-full flex-grow md:items-center md:w-auto md:justify-between mx-auto">
                    <div class="pc-nav-menu px-8">
                        <a href="../" class="px-4 py-3">HOME</a>
                        <span class="border-l-2 pr-2"></span>
                        <a class="px-4 py-3 link-act" aria-disabled="true"">PIDE ON-LINE</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../sushi" class="px-4 py-3">MENÚ-SUSHI</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../bar" class="px-4 py-3">MENÚ-BAR</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../contactos" class="px-4 py-3">CONTÁCTANOS</a>
                    </div>
                    
                    <div class="px-8 pc-nav-menu">
                        <a href="/panel-usuario" class="px-6 py-3 uppercase"><i class='bx bxs-user'></i> ${user.name}</a>
                    </div>
                </div>
        
            `;
        
            //*menú para movil:
        
            const hamburguesa = document.querySelector('#hamburguesa');
            const menu = document.querySelector('.menu');
            
            hamburguesa.addEventListener('click', ()=>{
                hamburguesa.classList.toggle('activo');
                menu.classList.toggle('activo');
                body.classList.toggle('overflow-hidden');
            })
         
        };
        
        //*CONTACTOS:
        function userContact(){
            navBar.innerHTML = `
            
            <!--Menu Hamburguesa-->
            <div class="flex items-center justify-center h-16">
        
                <div id="hamburguesa" class="toggle px-3 py-2 lg:hidden z-50"></div>
                
            </div>
        
            <!--Menu para el movil-->
            <div class="menu">
                <ul class="pt-10 uppercase">
                    <li><a href="../">HOME</a></li>
                    <li><a href="../pide-online">PIDE ON-LINE</a></li>
                    <li><a href="../sushi">MENU-SUSHI</a></li>
                    <li><a href="../bar">MENU-BAR</a></li>
                    <li><a class="link-act" aria-disabled="true">CONTÁCTANOS</a></li>
                    <li><a href="/panel-usuario" class="gap-2"><i class='bx bxs-user'></i> ${user.name}</a></li>
                </ul>
            </div>
        
                <!--Menu para PC-->
                <div class="hidden sticky lg:flex text-white fuente-A text-xl w-full flex-grow md:items-center md:w-auto md:justify-between mx-auto">
                    <div class="pc-nav-menu px-8">
                        <a href="../" class="px-4 py-3">HOME</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../pide-online" class="px-4 py-3">PIDE ON-LINE</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../sushi" class="px-4 py-3">MENÚ-SUSHI</a>
                        <span class="border-l-2 pr-2"></span>
                        <a href="../bar" class="px-4 py-3">MENÚ-BAR</a>
                        <span class="border-l-2 pr-2"></span>
                        <a class="px-4 py-3 link-act" aria-disabled="true"">CONTÁCTANOS</a>
                    </div>
                    
                    <div class="px-8 pc-nav-menu">
                        <a href="/panel-usuario" class="px-6 py-3 uppercase"><i class='bx bxs-user'></i> ${user.name}</a>
                    </div>
                </div>
        
            `;
        
            //*menú para movil:
        
            const hamburguesa = document.querySelector('#hamburguesa');
            const menu = document.querySelector('.menu');
            
            hamburguesa.addEventListener('click', ()=>{
                hamburguesa.classList.toggle('activo');
                menu.classList.toggle('activo');
                body.classList.toggle('overflow-hidden');
            })
         
        }


        //*CONFIRMAR COMPRA:
        function userConfirm(){
            navBar.innerHTML = `
            
            <!--Menu Hamburguesa-->
            <div class="flex items-center justify-center h-16">
        
                <div id="hamburguesa" class="toggle px-3 py-2 lg:hidden z-50"></div>
                
            </div>
        
            <!--Menu para el movil-->
            <div class="menu">
                <ul class="pt-10 uppercase">
                    <li><a href="../">VOLVER AL HOME</a></li>
                    <li><a href="/panel-usuario" class="gap-2"><i class='bx bxs-user'></i> ${user.name}</a></li>
                </ul>
            </div>
        
                <!--Menu para PC-->
                <div class="hidden sticky lg:flex text-white fuente-A text-xl w-full flex-grow md:items-center md:w-auto md:justify-between mx-auto">
                    <div class="pc-nav-menu px-8">
                        <a href="../" class="px-4 py-3">VOLVER AL HOME</a>
                    </div>
                    
                    <div class="px-8 pc-nav-menu">
                        <a href="/panel-usuario" class="px-6 py-3 uppercase"><i class='bx bxs-user'></i> ${user.name}</a>
                    </div>
                </div>
        
            `;
        
            //*menú para movil:
        
            const hamburguesa = document.querySelector('#hamburguesa');
            const menu = document.querySelector('.menu');
            
            hamburguesa.addEventListener('click', ()=>{
                hamburguesa.classList.toggle('activo');
                menu.classList.toggle('activo');
                body.classList.toggle('overflow-hidden');
            })
         
        }
        


        
        //*RUTAS DE SESION DE USUARIO: 
        if(user && window.location.pathname === '/'){
            userHome();
        }else if(user && window.location.pathname === '/bar/'){
            userBar();
        }else if(user && window.location.pathname === '/sushi/'){
            userSushi();
        }else if(user && window.location.pathname === '/pide-online/'){
            userPide();
        }else if(user && window.location.pathname === '/contactos/'){
            userContact();
        }else if(user && window.location.pathname === '/caja/'){
            userConfirm();
        };



    }catch(error){

        console.log(error)

    }

})

