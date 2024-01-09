const aside = document.querySelector('aside');

function dashBarUser(){
    
    aside.innerHTML = `
    
            <div class="menu-dash pt-5 pb-10 text-3xl">
            <a href="#">
                <i class='bx bx-menu'></i>
            </a>
        </div>

        <ul>
            <li>
                <a href="/">
                    <i class='bx bxs-home'></i>
                    <span class="link-name">Home Page</span>
                </a>
                <span class="tool-tip">Home Page</span>
            </li>
            <li>
                <a href="/panel-usuario" class="link-act" aria-disabled="true">
                    <i class='bx bxs-grid-alt'></i>
                    <span class="link-name">Dash-Board</span>
                </a>
                <span class="tool-tip">Dash-Board</span>
            </li>
            <li>
                <a href="/perfil-usuario">
                    <i class='bx bxs-user'></i>
                    <span class="link-name">Perfil</span>
                </a>
                <span class="tool-tip">Perfil</span>
            </li>
            <li>
                <a href="/carrito-usuario">
                    <i class='bx bxs-cart'></i>
                    <span class="link-name">Carrito</span>
                </a>
                <span class="tool-tip">Carrito</span>
            </li>
            <li>
                <a href="/booking-usuario">
                    <i class='bx bxs-book-alt'></i>
                    <span class="link-name">Reservaciones</span>
                </a>
                <span class="tool-tip">Reservaciones</span>
            </li>
            <li>
                <a href="/pedidos-usuario">
                <i class='bx bxs-shopping-bag'></i>
                    <span class="link-name">Pedidos</span>
                </a>
                <span class="tool-tip">Pedidos</span>
            </li>
            <li>
                <a href="/historial-usuario">
                <i class='bx bx-history'></i>
                    <span class="link-name">Historial</span>
                </a>
                <span class="tool-tip">Historial</span>
            </li>
            <li>
                <a href="/api/users/logout">
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


};

function dashBarUserPerfil(){
    
    aside.innerHTML = `
    
            <div class="menu-dash pt-5 pb-10 text-3xl">
            <a href="#">
                <i class='bx bx-menu'></i>
            </a>
        </div>

        <ul>
            <li>
                <a href="/">
                    <i class='bx bxs-home'></i>
                    <span class="link-name">Home Page</span>
                </a>
                <span class="tool-tip">Home Page</span>
            </li>
            <li>
                <a href="/panel-usuario">
                    <i class='bx bxs-grid-alt'></i>
                    <span class="link-name">Dash-Board</span>
                </a>
                <span class="tool-tip">Dash-Board</span>
            </li>
            <li>
                <a href="/perfil-usuario" class="link-act" aria-disabled="true">
                    <i class='bx bxs-user'></i>
                    <span class="link-name">Perfil</span>
                </a>
                <span class="tool-tip">Perfil</span>
            </li>
            <li>
                <a href="/carrito-usuario">
                    <i class='bx bxs-cart'></i>
                    <span class="link-name">Carrito</span>
                </a>
                <span class="tool-tip">Carrito</span>
            </li>
            <li>
                <a href="/booking-usuario">
                    <i class='bx bxs-book-alt'></i>
                    <span class="link-name">Reservaciones</span>
                </a>
                <span class="tool-tip">Reservaciones</span>
            </li>
            <li>
                <a href="/pedidos-usuario">
                <i class='bx bxs-shopping-bag'></i>
                    <span class="link-name">Pedidos</span>
                </a>
                <span class="tool-tip">Pedidos</span>
            </li>
            <li>
                <a href="/historial-usuario">
                <i class='bx bx-history'></i>
                    <span class="link-name">Historial</span>
                </a>
                <span class="tool-tip">Historial</span>
            </li>
            <li>
                <a href="/api/users/logout">
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


};


function dashBarUserCarrito(){
    
    aside.innerHTML = `
    
            <div class="menu-dash pt-5 pb-10 text-3xl">
            <a href="#">
                <i class='bx bx-menu'></i>
            </a>
        </div>

        <ul>
            <li>
                <a href="/">
                    <i class='bx bxs-home'></i>
                    <span class="link-name">Home Page</span>
                </a>
                <span class="tool-tip">Home Page</span>
            </li>
            <li>
                <a href="/panel-usuario">
                    <i class='bx bxs-grid-alt'></i>
                    <span class="link-name">Dash-Board</span>
                </a>
                <span class="tool-tip">Dash-Board</span>
            </li>
            <li>
                <a href="/perfil-usuario">
                    <i class='bx bxs-user'></i>
                    <span class="link-name">Perfil</span>
                </a>
                <span class="tool-tip">Perfil</span>
            </li>
            <li>
                <a href="/carrito-usuario" class="link-act" aria-disabled="true"> 
                    <i class='bx bxs-cart'></i>
                    <span class="link-name">Carrito</span>
                </a>
                <span class="tool-tip">Carrito</span>
            </li>
            <li>
                <a href="/booking-usuario">
                    <i class='bx bxs-book-alt'></i>
                    <span class="link-name">Reservaciones</span>
                </a>
                <span class="tool-tip">Reservaciones</span>
            </li>
            <li>
                <a href="/pedidos-usuario">
                <i class='bx bxs-shopping-bag'></i>
                    <span class="link-name">Pedidos</span>
                </a>
                <span class="tool-tip">Pedidos</span>
            </li>
            <li>
                <a href="/historial-usuario">
                <i class='bx bx-history'></i>
                    <span class="link-name">Historial</span>
                </a>
                <span class="tool-tip">Historial</span>
            </li>
            <li>
                <a href="/api/users/logout">
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


};


function dashBarUserBooking(){
    
    aside.innerHTML = `
    
            <div class="menu-dash pt-5 pb-10 text-3xl">
            <a href="#">
                <i class='bx bx-menu'></i>
            </a>
        </div>

        <ul>
            <li>
                <a href="/">
                    <i class='bx bxs-home'></i>
                    <span class="link-name">Home Page</span>
                </a>
                <span class="tool-tip">Home Page</span>
            </li>
            <li>
                <a href="/panel-usuario">
                    <i class='bx bxs-grid-alt'></i>
                    <span class="link-name">Dash-Board</span>
                </a>
                <span class="tool-tip">Dash-Board</span>
            </li>
            <li>
                <a href="/perfil-usuario">
                    <i class='bx bxs-user'></i>
                    <span class="link-name">Perfil</span>
                </a>
                <span class="tool-tip">Perfil</span>
            </li>
            <li>
                <a href="/carrito-usuario"> 
                    <i class='bx bxs-cart'></i>
                    <span class="link-name">Carrito</span>
                </a>
                <span class="tool-tip">Carrito</span>
            </li>
            <li>
                <a href="/booking-usuario" class="link-act" aria-disabled="true">
                    <i class='bx bxs-book-alt'></i>
                    <span class="link-name">Reservaciones</span>
                </a>
                <span class="tool-tip">Reservaciones</span>
            </li>
            <li>
                <a href="/pedidos-usuario">
                <i class='bx bxs-shopping-bag'></i>
                    <span class="link-name">Pedidos</span>
                </a>
                <span class="tool-tip">Pedidos</span>
            </li>
            <li>
                <a href="/historial-usuario">
                <i class='bx bx-history'></i>
                    <span class="link-name">Historial</span>
                </a>
                <span class="tool-tip">Historial</span>
            </li>
            <li>
                <a href="/api/users/logout">
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


};


function dashBarUserPedidos(){
    
    aside.innerHTML = `
    
            <div class="menu-dash pt-5 pb-10 text-3xl">
            <a href="#">
                <i class='bx bx-menu'></i>
            </a>
        </div>

        <ul>
            <li>
                <a href="/">
                    <i class='bx bxs-home'></i>
                    <span class="link-name">Home Page</span>
                </a>
                <span class="tool-tip">Home Page</span>
            </li>
            <li>
                <a href="/panel-usuario">
                    <i class='bx bxs-grid-alt'></i>
                    <span class="link-name">Dash-Board</span>
                </a>
                <span class="tool-tip">Dash-Board</span>
            </li>
            <li>
                <a href="/perfil-usuario">
                    <i class='bx bxs-user'></i>
                    <span class="link-name">Perfil</span>
                </a>
                <span class="tool-tip">Perfil</span>
            </li>
            <li>
                <a href="/carrito-usuario"> 
                    <i class='bx bxs-cart'></i>
                    <span class="link-name">Carrito</span>
                </a>
                <span class="tool-tip">Carrito</span>
            </li>
            <li>
                <a href="/booking-usuario">
                    <i class='bx bxs-book-alt'></i>
                    <span class="link-name">Reservaciones</span>
                </a>
                <span class="tool-tip">Reservaciones</span>
            </li>
            <li>
                <a href="/pedidos-usuario" class="link-act" aria-disabled="true">
                <i class='bx bxs-shopping-bag'></i>
                    <span class="link-name">Pedidos</span>
                </a>
                <span class="tool-tip">Pedidos</span>
            </li>
            <li>
                <a href="/historial-usuario">
                <i class='bx bx-history'></i>
                    <span class="link-name">Historial</span>
                </a>
                <span class="tool-tip">Historial</span>
            </li>
            <li>
                <a href="/api/users/logout">
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


};


function dashBarUserHistory(){
    
    aside.innerHTML = `
    
            <div class="menu-dash pt-5 pb-10 text-3xl">
            <a href="#">
                <i class='bx bx-menu'></i>
            </a>
        </div>

        <ul>
            <li>
                <a href="/">
                    <i class='bx bxs-home'></i>
                    <span class="link-name">Home Page</span>
                </a>
                <span class="tool-tip">Home Page</span>
            </li>
            <li>
                <a href="/panel-usuario">
                    <i class='bx bxs-grid-alt'></i>
                    <span class="link-name">Dash-Board</span>
                </a>
                <span class="tool-tip">Dash-Board</span>
            </li>
            <li>
                <a href="/perfil-usuario">
                    <i class='bx bxs-user'></i>
                    <span class="link-name">Perfil</span>
                </a>
                <span class="tool-tip">Perfil</span>
            </li>
            <li>
                <a href="/carrito-usuario"> 
                    <i class='bx bxs-cart'></i>
                    <span class="link-name">Carrito</span>
                </a>
                <span class="tool-tip">Carrito</span>
            </li>
            <li>
                <a href="/booking-usuario">
                    <i class='bx bxs-book-alt'></i>
                    <span class="link-name">Reservaciones</span>
                </a>
                <span class="tool-tip">Reservaciones</span>
            </li>
            <li>
                <a href="/pedidos-usuario">
                <i class='bx bxs-shopping-bag'></i>
                    <span class="link-name">Pedidos</span>
                </a>
                <span class="tool-tip">Pedidos</span>
            </li>
            <li>
                <a href="/historial-usuario" class="link-act" aria-disabled="true">
                <i class='bx bx-history'></i>
                    <span class="link-name">Historial</span>
                </a>
                <span class="tool-tip">Historial</span>
            </li>
            <li>
                <a href="/api/users/logout">
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


};




//*RUTAS:
if(window.location.pathname === '/panel-usuario/'){
    dashBarUser();
}else if(window.location.pathname === '/perfil-usuario/'){
    dashBarUserPerfil();
}else if(window.location.pathname === '/carrito-usuario/'){
    dashBarUserCarrito();
}else if(window.location.pathname === '/booking-usuario/'){
    dashBarUserBooking();
}else if(window.location.pathname === '/pedidos-usuario/'){
    dashBarUserPedidos();
}else if(window.location.pathname ==='/historial-usuario/'){
    dashBarUserHistory();
}