const aside = document.querySelector('aside');

function crearDashBarAdmin(){
    
    aside.innerHTML = `
    
            <div class="menu-dash pt-5 pb-10 text-3xl">
            <a href="#">
                <i class='bx bx-menu'></i>
            </a>
        </div>

        <ul>
            <li>
                <a href="/calamar" class="link-act" aria-disabled="true">
                    <i class='bx bxs-grid-alt'></i>
                    <span class="link-name">Productos</span>
                </a>
                <span class="tool-tip">Productos</span>
            </li>
            <li>
                <a href="/clientes">
                    <i class='bx bxs-user'></i>
                    <span class="link-name">Clientes</span>
                </a>
                <span class="tool-tip">Clientes</span>
            </li>
            <li>
                <a href="/pedidos">
                    <i class='bx bxs-cart'></i>
                    <span class="link-name">Pedidos</span>
                </a>
                <span class="tool-tip">Pedidos</span>
            </li>
            <li>
                <a href="/reservaciones">
                    <i class='bx bxs-book-alt'></i>
                    <span class="link-name">Reservaciones</span>
                </a>
                <span class="tool-tip">Reservaciones</span>
            </li>
            <li>
                <a href="/analiticas">
                <i class='bx bxs-bar-chart-alt-2'></i>
                    <span class="link-name">Analiticas</span>
                </a>
                <span class="tool-tip">Analiticas</span>
            </li>
            <li>
                <a href="/opciones">
                    <i class='bx bxs-cog'></i>
                    <span class="link-name">Opciones</span>
                </a>
                <span class="tool-tip">Opciones</span>
            </li>
            <li>
                <a href="/api/users/cerrar">
                    <i class='bx bxs-log-out' ></i>
                    <span class="link-name">Salir</span>
                </a>
                <span class="tool-tip">Salir</span>
            </li>
        </ul>
    
    `

    //FUNCIONES:

    const div = document.querySelector('.menu-dash');
    const menuDash = div.querySelector('a');
    const cerrar = menuDash.querySelector('i');
    const sidebar = document.querySelector('.sidebar');
    const contenido = document.querySelector('.seccion-contenido')
    const links = document.querySelectorAll('a');

    menuDash.addEventListener('click', e => {
        e.preventDefault();

        sidebar.classList.toggle('open');
        contenido.classList.toggle('open');

        menuChange();
  
    })

    function menuChange(){
        if(sidebar.classList.contains('open')){
            cerrar.classList.replace('bx-menu','bx-x');
        }else{
            cerrar.classList.replace('bx-x','bx-menu');
        }
    };


}


function crearDashBarAdminClients(){

    aside.innerHTML = `
    
            <div class="menu-dash pt-5 pb-10 text-3xl">
            <a href="#">
                <i class='bx bx-menu'></i>
            </a>
        </div>

        <ul>
            <li>
                <a href="/calamar">
                    <i class='bx bxs-grid-alt'></i>
                    <span class="link-name">Productos</span>
                </a>
                <span class="tool-tip">Productos</span>
            </li>
            <li>
                <a href="/clientes" class="link-act" aria-disabled="true">
                    <i class='bx bxs-user'></i>
                    <span class="link-name">Clientes</span>
                </a>
                <span class="tool-tip">Clientes</span>
            </li>
            <li>
                <a href="/pedidos">
                    <i class='bx bxs-cart'></i>
                    <span class="link-name">Pedidos</span>
                </a>
                <span class="tool-tip">Pedidos</span>
            </li>
            <li>
                <a href="/reservaciones">
                    <i class='bx bxs-book-alt'></i>
                    <span class="link-name">Reservaciones</span>
                </a>
                <span class="tool-tip">Reservaciones</span>
            </li>
            <li>
                <a href="/analiticas">
                <i class='bx bxs-bar-chart-alt-2'></i>
                    <span class="link-name">Analiticas</span>
                </a>
                <span class="tool-tip">Analiticas</span>
            </li>
            <li>
                <a href="/opciones">
                    <i class='bx bxs-cog'></i>
                    <span class="link-name">Opciones</span>
                </a>
                <span class="tool-tip">Opciones</span>
            </li>
            <li>
                <a href="/api/users/cerrar">
                    <i class='bx bxs-log-out' ></i>
                    <span class="link-name">Salir</span>
                </a>
                <span class="tool-tip">Salir</span>
            </li>
        </ul>
    
    `

    //FUNCIONES:

    const div = document.querySelector('.menu-dash');
    const menuDash = div.querySelector('a');
    const cerrar = menuDash.querySelector('i');
    const sidebar = document.querySelector('.sidebar');
    const contenido = document.querySelector('.seccion-contenido')

    menuDash.addEventListener('click', e => {
        e.preventDefault();

        sidebar.classList.toggle('open');
        contenido.classList.toggle('open');

        menuChange();
  
    })

    function menuChange(){
        if(sidebar.classList.contains('open')){
            cerrar.classList.replace('bx-menu','bx-x');
        }else{
            cerrar.classList.replace('bx-x','bx-menu');
        }
    };
}


function crearDashBarAdminPedidos(){

    aside.innerHTML = `
        
                <div class="menu-dash pt-5 pb-10 text-3xl">
                <a href="#">
                    <i class='bx bx-menu'></i>
                </a>
            </div>

            <ul>
                <li>
                    <a href="/calamar">
                        <i class='bx bxs-grid-alt'></i>
                        <span class="link-name">Productos</span>
                    </a>
                    <span class="tool-tip">Productos</span>
                </li>
                <li>
                    <a href="/clientes">
                        <i class='bx bxs-user'></i>
                        <span class="link-name">Clientes</span>
                    </a>
                    <span class="tool-tip">Clientes</span>
                </li>
                <li>
                    <a href="/pedidos" class="link-act" aria-disabled="true">
                        <i class='bx bxs-cart'></i>
                        <span class="link-name">Pedidos</span>
                    </a>
                    <span class="tool-tip">Pedidos</span>
                </li>
                <li>
                    <a href="/reservaciones">
                        <i class='bx bxs-book-alt'></i>
                        <span class="link-name">Reservaciones</span>
                    </a>
                    <span class="tool-tip">Reservaciones</span>
                </li>
                <li>
                    <a href="/analiticas">
                    <i class='bx bxs-bar-chart-alt-2'></i>
                        <span class="link-name">Analiticas</span>
                    </a>
                    <span class="tool-tip">Analiticas</span>
                </li>
                <li>
                    <a href="/opciones">
                        <i class='bx bxs-cog'></i>
                        <span class="link-name">Opciones</span>
                    </a>
                    <span class="tool-tip">Opciones</span>
                </li>
                <li>
                    <a href="/api/users/cerrar">
                        <i class='bx bxs-log-out' ></i>
                        <span class="link-name">Salir</span>
                    </a>
                    <span class="tool-tip">Salir</span>
                </li>
            </ul>
        
        `

        //FUNCIONES:

        const div = document.querySelector('.menu-dash');
        const menuDash = div.querySelector('a');
        const cerrar = menuDash.querySelector('i');
        const sidebar = document.querySelector('.sidebar');
        const contenido = document.querySelector('.seccion-contenido')

        menuDash.addEventListener('click', e => {
            e.preventDefault();

            sidebar.classList.toggle('open');
            contenido.classList.toggle('open');

            menuChange();
    
        })

        function menuChange(){
            if(sidebar.classList.contains('open')){
                cerrar.classList.replace('bx-menu','bx-x');
            }else{
                cerrar.classList.replace('bx-x','bx-menu');
            }
        };
}


function crearDashBarAdminReservas(){

    aside.innerHTML = `
        
                <div class="menu-dash pt-5 pb-10 text-3xl">
                <a href="#">
                    <i class='bx bx-menu'></i>
                </a>
            </div>

            <ul>
                <li>
                    <a href="/calamar">
                        <i class='bx bxs-grid-alt'></i>
                        <span class="link-name">Productos</span>
                    </a>
                    <span class="tool-tip">Productos</span>
                </li>
                <li>
                    <a href="/clientes">
                        <i class='bx bxs-user'></i>
                        <span class="link-name">Clientes</span>
                    </a>
                    <span class="tool-tip">Clientes</span>
                </li>
                <li>
                    <a href="/pedidos">
                        <i class='bx bxs-cart'></i>
                        <span class="link-name">Pedidos</span>
                    </a>
                    <span class="tool-tip">Pedidos</span>
                </li>
                <li>
                    <a href="/reservaciones" class="link-act" aria-disabled="true">
                        <i class='bx bxs-book-alt'></i>
                        <span class="link-name">Reservaciones</span>
                    </a>
                    <span class="tool-tip">Reservaciones</span>
                </li>
                <li>
                    <a href="/analiticas">
                    <i class='bx bxs-bar-chart-alt-2'></i>
                        <span class="link-name">Analiticas</span>
                    </a>
                    <span class="tool-tip">Analiticas</span>
                </li>
                <li>
                    <a href="/opciones">
                        <i class='bx bxs-cog'></i>
                        <span class="link-name">Opciones</span>
                    </a>
                    <span class="tool-tip">Opciones</span>
                </li>
                <li>
                    <a href="/api/users/cerrar">
                        <i class='bx bxs-log-out' ></i>
                        <span class="link-name">Salir</span>
                    </a>
                    <span class="tool-tip">Salir</span>
                </li>
            </ul>
        
        `

        //FUNCIONES:

        const div = document.querySelector('.menu-dash');
        const menuDash = div.querySelector('a');
        const cerrar = menuDash.querySelector('i');
        const sidebar = document.querySelector('.sidebar');
        const contenido = document.querySelector('.seccion-contenido')

        menuDash.addEventListener('click', e => {
            e.preventDefault();

            sidebar.classList.toggle('open');
            contenido.classList.toggle('open');

            menuChange();
    
        })

        function menuChange(){
            if(sidebar.classList.contains('open')){
                cerrar.classList.replace('bx-menu','bx-x');
            }else{
                cerrar.classList.replace('bx-x','bx-menu');
            }
        };
}


function crearDashBarAdminOpciones(){

    aside.innerHTML = `
        
                <div class="menu-dash pt-5 pb-10 text-3xl">
                <a href="#">
                    <i class='bx bx-menu'></i>
                </a>
            </div>

            <ul>
                <li>
                    <a href="/calamar">
                        <i class='bx bxs-grid-alt'></i>
                        <span class="link-name">Productos</span>
                    </a>
                    <span class="tool-tip">Productos</span>
                </li>
                <li>
                    <a href="/clientes">
                        <i class='bx bxs-user'></i>
                        <span class="link-name">Clientes</span>
                    </a>
                    <span class="tool-tip">Clientes</span>
                </li>
                <li>
                    <a href="/pedidos">
                        <i class='bx bxs-cart'></i>
                        <span class="link-name">Pedidos</span>
                    </a>
                    <span class="tool-tip">Pedidos</span>
                </li>
                <li>
                    <a href="/reservaciones">
                        <i class='bx bxs-book-alt'></i>
                        <span class="link-name">Reservaciones</span>
                    </a>
                    <span class="tool-tip">Reservaciones</span>
                </li>
                <li>
                    <a href="/analiticas">
                    <i class='bx bxs-bar-chart-alt-2'></i>
                        <span class="link-name">Analiticas</span>
                    </a>
                    <span class="tool-tip">Analiticas</span>
                </li>
                <li>
                    <a href="/opciones" class="link-act" aria-disabled="true">
                        <i class='bx bxs-cog'></i>
                        <span class="link-name">Opciones</span>
                    </a>
                    <span class="tool-tip">Opciones</span>
                </li>
                <li>
                    <a href="/api/users/cerrar">
                        <i class='bx bxs-log-out' ></i>
                        <span class="link-name">Salir</span>
                    </a>
                    <span class="tool-tip">Salir</span>
                </li>
            </ul>
        
        `

        //FUNCIONES:

        const div = document.querySelector('.menu-dash');
        const menuDash = div.querySelector('a');
        const cerrar = menuDash.querySelector('i');
        const sidebar = document.querySelector('.sidebar');
        const contenido = document.querySelector('.seccion-contenido')

        menuDash.addEventListener('click', e => {
            e.preventDefault();

            sidebar.classList.toggle('open');
            contenido.classList.toggle('open');

            menuChange();
    
        })

        function menuChange(){
            if(sidebar.classList.contains('open')){
                cerrar.classList.replace('bx-menu','bx-x');
            }else{
                cerrar.classList.replace('bx-x','bx-menu');
            }
        };
};


function crearDashBarAnali(){

    aside.innerHTML = `
        
                <div class="menu-dash pt-5 pb-10 text-3xl">
                <a href="#">
                    <i class='bx bx-menu'></i>
                </a>
            </div>

            <ul>
                <li>
                    <a href="/calamar">
                        <i class='bx bxs-grid-alt'></i>
                        <span class="link-name">Productos</span>
                    </a>
                    <span class="tool-tip">Productos</span>
                </li>
                <li>
                    <a href="/clientes">
                        <i class='bx bxs-user'></i>
                        <span class="link-name">Clientes</span>
                    </a>
                    <span class="tool-tip">Clientes</span>
                </li>
                <li>
                    <a href="/pedidos">
                        <i class='bx bxs-cart'></i>
                        <span class="link-name">Pedidos</span>
                    </a>
                    <span class="tool-tip">Pedidos</span>
                </li>
                <li>
                    <a href="/reservaciones">
                        <i class='bx bxs-book-alt'></i>
                        <span class="link-name">Reservaciones</span>
                    </a>
                    <span class="tool-tip">Reservaciones</span>
                </li>
                <li>
                    <a href="/analiticas" class="link-act" aria-disabled="true">
                    <i class='bx bxs-bar-chart-alt-2'></i>
                        <span class="link-name">Analiticas</span>
                    </a>
                    <span class="tool-tip">Analiticas</span>
                </li>
                <li>
                    <a href="/opciones">
                        <i class='bx bxs-cog'></i>
                        <span class="link-name">Opciones</span>
                    </a>
                    <span class="tool-tip">Opciones</span>
                </li>
                <li>
                    <a href="/api/users/cerrar">
                        <i class='bx bxs-log-out' ></i>
                        <span class="link-name">Salir</span>
                    </a>
                    <span class="tool-tip">Salir</span>
                </li>
            </ul>
        
        `

        //FUNCIONES:

        const div = document.querySelector('.menu-dash');
        const menuDash = div.querySelector('a');
        const cerrar = menuDash.querySelector('i');
        const sidebar = document.querySelector('.sidebar');
        const contenido = document.querySelector('.seccion-contenido')

        menuDash.addEventListener('click', e => {
            e.preventDefault();

            sidebar.classList.toggle('open');
            contenido.classList.toggle('open');

            menuChange();
    
        })

        function menuChange(){
            if(sidebar.classList.contains('open')){
                cerrar.classList.replace('bx-menu','bx-x');
            }else{
                cerrar.classList.replace('bx-x','bx-menu');
            }
        };
};




//*RUTAS:

if(window.location.pathname === '/calamar/'){
    crearDashBarAdmin();
}else if(window.location.pathname === '/clientes/'){
    crearDashBarAdminClients();
}else if(window.location.pathname === '/pedidos/'){
    crearDashBarAdminPedidos();
}else if(window.location.pathname === '/reservaciones/'){
    crearDashBarAdminReservas();
}else if(window.location.pathname === '/opciones/'){
    crearDashBarAdminOpciones();
}else if(window.location.pathname === '/analiticas/'){
    crearDashBarAnali();
}