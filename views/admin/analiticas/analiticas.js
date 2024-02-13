const ganacias = document.querySelector('#ganancias');
const pedidos = document.querySelector('#pedidos');
const clients = document.querySelector('#clientes');
const pagos = document.querySelector('#pagos');
const masVendido = document.querySelector('#mas-vendido');
const graficos1 = document.querySelector('#graficos-1');

//*FILTROS:
const filtrosLista = document.querySelector('#filtros-lista');
const filtrosBtn = filtrosLista.querySelectorAll('.filtros');

filtrosBtn.forEach(filtro => {

    filtro.addEventListener('click', e => {
        e.preventDefault();

        const filtrado = e.target.getAttribute('data-filter');

        document.startViewTransition(()=> {

            filtrosLista.querySelector('.filtro-activo').classList.remove('filtro-activo');

            e.target.classList.add('filtro-activo');

            eventoFiltrado(filtrado);
            
        });

    });

});

function eventoFiltrado(filtro){

    if(filtro === 'hoy'){

        calcularGananciaHoy(ventasHoy);

        imprimirPedidosHoy(ventasHoy);

        productoMasVendidoHoy(ventasHoy);

    }else if(filtro === 'todo'){

        calcularGananciaTotal(todaslasventas[0]);

        obtenerPedidos(todaslasventas[0]);

        productoMasVendido(todaslasventas[0]);

    }else if(filtro === 'semana'){

        calcularGananciaSemana(ventasSemana);

        imprimirPedidosSemana(ventasSemana);

        productoMasVendidoSemana(ventasSemana);

    }else if(filtro === 'mes'){

        calcularGananciaMes(ventasMes);

        imprimirPedidosMes(ventasMes);

        productoMasVendidoMes(ventasMes);

    }

};
//------------------------------------------------------


//*TIEMPO:
//definir hoy
var hoy = new Date().toISOString().split("T")[0];

//definir semana
var semana = new Date();
semana.setDate(semana.getDate() - 7);
var Sd = semana.getDate();
var Sm = semana.getMonth()+1;
var Sa = semana.getFullYear();
if(Sd<10){
    Sd = '0'+Sd
}
if(Sm<10){
    Sm = '0'+Sm
}
semana = Sa+'-'+Sm+'-'+Sd;

//definir mes
var mes = new Date();
mes.setDate(mes.getDate() - 30);
var Md = mes.getDate();
var Mm = mes.getMonth()+1;
var Ma = mes.getFullYear();
if(Md<10){
    Md = '0'+Md
}
if(Mm<10){
    Mm = '0'+Mm
}
mes = Ma+'-'+Mm+'-'+Md;

//definir año
var año = hoy.split('-')[0];


//*Arreglos:
//general:
let todaslasventas = [];
//hoy:
let ventasHoy = [];
//semana
let ventasSemana = [];
//mes
let ventasMes = [];
//año pasado:
let ventasPastYear = [];
//año actual:
let ventasThisYear= [];

//*OBTENER LISTA DE LAS VENTAS:
window.addEventListener('load', async () => {

    try{

        const listaVentas = await axios.get('/api/ventas/lista');
        const listVentas = listaVentas.data.data;
        todaslasventas.push(listVentas);

        //*pedidos:
        obtenerPedidos(todaslasventas[0]);


        graficoVentas(todaslasventas[0]);
        graficoGanancias();


        //*pedidos de hoy:
        listVentas.forEach(i => {

            const fecha = i.createdAt.split("T")[0];

            if(fecha === hoy){

                ventasHoy.push(i);
            }

        });


        //*Pedidos de hace 7 días:
        listVentas.forEach(i => {

            const fecha = i.createdAt.split("T")[0];

            if(fecha > semana && fecha < hoy){

                ventasSemana.push(i);
            }

        });

        //*Pedidos de hace 30 días:
        listVentas.forEach(i => {

            const fecha = i.createdAt.split("T")[0];

            if(fecha > mes && fecha < hoy){

                ventasMes.push(i);
            }

        });


        //*ganancia:
        calcularGananciaTotal(todaslasventas[0]);
    
        
        //*ver cuantos productos vendidos:
        productoMasVendido(todaslasventas[0]);


        //*ver tipos de pedidos:
        verTipoDePedido(todaslasventas[0]);
        

        //*forma de pago:
        imprimirFormaDePago(todaslasventas[0]);


        //*OBTENER LISTA DE CLIENTES:
        const clientList = await axios.get('/api/users/lista-users');
        const clientes = clientList.data.data;
        imprimirClientes(clientes);
  

    }catch(error){

        console.log(error)
    }

});


//*FUNCIONES:
//Pedidos totales:
function obtenerPedidos(lista){

    const totalPedidos = lista.length;
    imprimirPedidosTotales(totalPedidos);

};

//Calcular las ganacias:
function calcularGananciaTotal(lista){

    const gananciaTotal = lista.map(i=> i.total).reduce((acc,cur) => acc + cur, 0);
    imprimirGananciaTotal(gananciaTotal);

};
function calcularGananciaHoy(lista){
    const gananciaHoy = lista.map(i => i.total).reduce((acc,curr) => acc + curr, 0);
    imprimirGananciasHoy(gananciaHoy);

};
function calcularGananciaSemana(lista){

    const gananciaSemana = lista.map(i => i.total).reduce((acc,curr) => acc + curr, 0);
    imprimirGananciaSemana(gananciaSemana);

};
function calcularGananciaMes(lista){
    const gananciaMes = lista.map(i => i.total).reduce((acc,curr) => acc + curr, 0);
    imprimirGananciaMes(gananciaMes);
};
//-------------------------------------------


//Tipo de pedidos:
function verTipoDePedido(lista){

    const delivery = lista.filter(i => i.tipo === 'Delivery');

    const pickup = lista.filter(i => i.tipo === 'Pick-Up');

    //*graficos:
    graficosTipodePedido(delivery, pickup);


};


//Calcular los productos más vendidos:
function productoMasVendido(lista){

    if(lista.length <= 0){
        imprimirMasVendido();
    }

    //total:
    const pedidos = lista.map(i => i.pedido);
    const productos = pedidos.flat().map(i => ({producto: i.producto, cantidad: i.cantidad}));
    const p = productos.sort((a,b) => b.cantidad - a.cantidad);
    
    const masVendido = p.reduce((acc,cur) => {

        if(acc[cur.producto]){

            if(cur.cantidad > 1){

                acc[cur.producto] = cur.cantidad + 1;

            }else{

                acc[cur.producto] = acc[cur.producto] + 1;

            }


        }else{

            if(cur.cantidad > 1){

                acc[cur.producto] = cur.cantidad;

            }else{

                acc[cur.producto] = 1;

            }

        }

        return acc;

    }, {});

    let arregloMasVendido = [];

    for (const key in masVendido) {
        const objetos = {key:key, Value:masVendido[key]};
        arregloMasVendido.push(objetos);
    }

    const a = arregloMasVendido.sort((a,b)=> b.Value - a.Value);

    imprimirMasVendido(a[0].key);
   
};
function productoMasVendidoHoy(){

    if(ventasHoy.length <= 0){
        imprimirMasVendidoHoy();
    }

    const pedidosHoy = ventasHoy.map(i => i.pedido);
    const productosHoy = pedidosHoy.flat().map(i => ({producto: i.producto, cantidad: i.cantidad}));
    const pH = productosHoy.sort((a,b) => b.cantidad - a.cantidad);

    //*producto más vendido hoy:
    const masVendido = pH.reduce((acc,cur) => {

        if(acc[cur.producto]){

            if(cur.cantidad > 1){

                acc[cur.producto] = cur.cantidad + 1;

            }else{

                acc[cur.producto] = acc[cur.producto] + 1;

            }


        }else{

            if(cur.cantidad > 1){

                acc[cur.producto] = cur.cantidad;

            }else{

                acc[cur.producto] = 1;

            }

        }

        return acc;

    }, {});

    let arregloMasVendidoHoy = [];

    for (const key in masVendido) {
        const objetos = {key:key, Value:masVendido[key]};
        arregloMasVendidoHoy.push(objetos);
    }

    const a = arregloMasVendidoHoy.sort((a,b)=> b.Value - a.Value);

    imprimirMasVendidoHoy(a[0].key);

};
function productoMasVendidoSemana(){

    if(ventasSemana.length <= 0){
        imprimirMasVendidoSemana();
    }

    const pedidosSemana = ventasSemana.map(i => i.pedido);
    const productosSemana = pedidosSemana.flat().map(i => ({producto: i.producto, cantidad: i.cantidad}));
    const pS = productosSemana.sort((a,b) => b.cantidad - a.cantidad);

    //*producto más vendido semana:
    const masVendido = pS.reduce((acc,cur) => {

        if(acc[cur.producto]){

            if(cur.cantidad > 1){

                acc[cur.producto] = cur.cantidad + 1;

            }else{

                acc[cur.producto] = acc[cur.producto] + 1;

            }


        }else{

            if(cur.cantidad > 1){

                acc[cur.producto] = cur.cantidad;

            }else{

                acc[cur.producto] = 1;

            }

        }

        return acc;

    }, {});

    let arregloMasVendidoSemana = [];

    for (const key in masVendido) {
        const objetos = {key:key, Value:masVendido[key]};
        arregloMasVendidoSemana.push(objetos);
    }

    const a = arregloMasVendidoSemana.sort((a,b)=> b.Value - a.Value);

    imprimirMasVendidoSemana(a[0].key);
};
function productoMasVendidoMes(){

    if(ventasMes.length <= 0){
        imprimirMasVendidoMes();
    }

    const pedidosMes = ventasMes.map(i => i.pedido);
    const productosMes = pedidosMes.flat().map(i => ({producto: i.producto, cantidad: i.cantidad}));
    const pM = productosMes.sort((a,b) => b.cantidad - a.cantidad);

    //*producto más vendido semana:
    const masVendido = pM.reduce((acc,cur) => {

        if(acc[cur.producto]){

            if(cur.cantidad > 1){

                acc[cur.producto] = cur.cantidad + 1;

            }else{

                acc[cur.producto] = acc[cur.producto] + 1;

            }


        }else{

            if(cur.cantidad > 1){

                acc[cur.producto] = cur.cantidad;

            }else{

                acc[cur.producto] = 1;

            }

        }

        return acc;

    }, {});

    let arregloMasVendidoMes = [];

    for (const key in masVendido) {
        const objetos = {key:key, Value:masVendido[key]};
        arregloMasVendidoMes.push(objetos);
    }

    const a = arregloMasVendidoMes.sort((a,b)=> b.Value - a.Value);

    imprimirMasVendidoMes(a[0].key);
};
//------------------------------------------


//*IMPRIMIR EN EL HTML:
//Ganancias:
function imprimirGananciaTotal(total){

    ganacias.querySelector('[data-ganancia-vacio]').innerHTML = `

    <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
        <div>
        <p>Ganacias totales:</p>
        <h3 class="text-black text-3xl font-bold text-end">$${total.toFixed(1)}</h3>
        </div>
    </div>

    `

};
function imprimirGananciasHoy(total){


    ganacias.querySelector('[data-ganancia-vacio]').innerHTML = `

    <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
        <div>
        <p>Ganacias de hoy:</p>
        <h3 class="text-black text-3xl font-bold text-end">$${total.toFixed(1)}</h3>
        </div>
    </div>

    `

    if(total === 0){

        ganacias.querySelector('[data-ganancia-vacio]').innerHTML = `

            <div data-ganancia-vacio>

            <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
                
                <h3>Por los momentos no hay ganancias</h3>
            </div>

            </div>

        `

    }

};
function imprimirGananciaSemana(total){

    ganacias.querySelector('[data-ganancia-vacio]').innerHTML = `

    <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
        <div>
        <p>Ganacias de los últimos 7 días:</p>
        <h3 class="text-black text-3xl font-bold text-end">$${total.toFixed(1)}</h3>
        </div>
    </div>

    `

    if(total === 0){

        ganacias.querySelector('[data-ganancia-vacio]').innerHTML = `

            <div data-ganancia-vacio>

            <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
                
                <h3>Por los momentos no hay ganancias</h3>
            </div>

            </div>

        `

    }

};
function imprimirGananciaMes(total){
    ganacias.querySelector('[data-ganancia-vacio]').innerHTML = `

    <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
        <div>
        <p>Ganacias de los últimos 30 días:</p>
        <h3 class="text-black text-3xl font-bold text-end">$${total.toFixed(1)}</h3>
        </div>
    </div>

    `

    if(total === 0){

        ganacias.querySelector('[data-ganancia-vacio]').innerHTML = `

            <div data-ganancia-vacio>

            <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
                
                <h3>Por los momentos no hay ganancias</h3>
            </div>

            </div>

        `

    }
};
//--------------------------------------------


//Pedidos:
function imprimirPedidosTotales(total){

    pedidos.querySelector('[data-pedidos-vacio]').innerHTML = `

    <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <div>
        <p>Todos los pedidos:</p>
        <h3 class="text-black text-3xl font-bold text-end">${total}</h3>
        </div>

    </div>

    `

};
function imprimirPedidosHoy(lista){
    
    pedidos.querySelector('[data-pedidos-vacio]').innerHTML = `

    <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <div>
        <p>Los pedidos de hoy:</p>
        <h3 class="text-black text-3xl font-bold text-end">${lista.length}</h3>
        </div>

    </div>

    `

    if(lista.length === 0){

        pedidos.querySelector('[data-pedidos-vacio]').innerHTML = `

            <div data-pedidos-vacio>

            <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                
                <h3>Por los momentos no hay pedidos</h3>
            </div>

            </div>
        
        `

    }
};
function imprimirPedidosSemana(lista){
    pedidos.querySelector('[data-pedidos-vacio]').innerHTML = `

    <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <div>
        <p>Pedidos de los últimos 7 días:</p>
        <h3 class="text-black text-3xl font-bold text-end">${lista.length}</h3>
        </div>

    </div>

    `

    if(lista.length === 0){

        pedidos.querySelector('[data-pedidos-vacio]').innerHTML = `

            <div data-pedidos-vacio>

            <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                
                <h3>Por los momentos no hay pedidos</h3>
            </div>

            </div>
        
        `

    }
};
function imprimirPedidosMes(lista){
    pedidos.querySelector('[data-pedidos-vacio]').innerHTML = `

    <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <div>
        <p>Pedidos de los últimos 30 días:</p>
        <h3 class="text-black text-3xl font-bold text-end">${lista.length}</h3>
        </div>

    </div>

    `

    if(lista.length === 0){

        pedidos.querySelector('[data-pedidos-vacio]').innerHTML = `

            <div data-pedidos-vacio>

            <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                
                <h3>Por los momentos no hay pedidos</h3>
            </div>

            </div>
        
        `

    }
};
//------------------------------------------

//Más vendido:
function imprimirMasVendido(producto){

    if(!producto){

        masVendido.querySelector('[data-mas-vendido-vacio]').innerHTML = `
        
            <div data-mas-vendido-vacio>

            <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                
                <h3>Por los momentos no hay producto más vendido</h3>
            </div>

            </div>
        
        `
    }else{

        masVendido.querySelector('[data-mas-vendido-vacio]').innerHTML = `

            <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                
                <div>
                <p>Producto estrella:</p>
                <h3 class="text-black font-bold text-end">${producto}</h3>
                </div>
            </div>

        `

    }

};
function imprimirMasVendidoHoy(producto){

    if(!producto){

        masVendido.querySelector('[data-mas-vendido-vacio]').innerHTML = `
        
            <div data-mas-vendido-vacio>

            <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                
                <h3>Por los momentos no hay producto más vendido</h3>
            </div>

            </div>
        
        `

    }else{

        masVendido.querySelector('[data-mas-vendido-vacio]').innerHTML = `

            <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                
                <div>
                <p>Producto estrella de hoy:</p>
                <h3 class="text-black font-bold text-end">${producto}</h3>
                </div>
            </div>

        `

    }

    

};
function imprimirMasVendidoSemana(producto){

    if(!producto){

        masVendido.querySelector('[data-mas-vendido-vacio]').innerHTML = `
        
            <div data-mas-vendido-vacio>

            <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                
                <h3>Por los momentos no hay producto más vendido</h3>
            </div>

            </div>
        
        `

    }else{

        masVendido.querySelector('[data-mas-vendido-vacio]').innerHTML = `

            <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                
                <div>
                <p>Producto estrella de la semana:</p>
                <h3 class="text-black font-bold text-end">${producto}</h3>
                </div>
            </div>

        `
    }

};
function imprimirMasVendidoMes(producto){

    if(!producto){

        masVendido.querySelector('[data-mas-vendido-vacio]').innerHTML = `
        
            <div data-mas-vendido-vacio>

            <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                
                <h3>Por los momentos no hay producto más vendido</h3>
            </div>

            </div>
        
        `

    }else{

        masVendido.querySelector('[data-mas-vendido-vacio]').innerHTML = `

            <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                
                <div>
                <p>Producto estrella del mes:</p>
                <h3 class="text-black font-bold text-end">${producto}</h3>
                </div>
            </div>

        `
    }
};
//----------------------------------------------



//Clientes:
function imprimirClientes(clientes){

    const div = document.createElement('div');

    div.innerHTML = `
    
    <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">
    
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>

        <p>Todos los usuarios registrados:</p>
        <h3 class="text-black text-3xl font-bold text-end">${clientes.length}</h3>

    </div>
    
    `

    clients.appendChild(div);

    if(clientes){
        clients.querySelector('[data-clientes-vacio]').classList.add('hidden');
    }else{
        clients.querySelector('[data-clientes-vacio]').classList.remove('hidden');
    }
    
};

//Forma de pago:
function imprimirFormaDePago(lista){

    const efectivo = lista.filter(i => i.formaPago === 'En efectivo');
    const paypal = lista.filter(i => i.formaPago === 'paypal');

    const div = document.createElement('div');
        
    //más usada:
    if(efectivo > paypal){

        div.innerHTML = `

        <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
        </svg>

        <p>La forma de pago más usada:</p>
        <h3 class="text-black font-bold text-end">Efectivo</h3>

        </div>

        `
        pagos.appendChild(div);
        
    }else{

        div.innerHTML = `

        <div class="m-10 flex flex-col lg:flex-row gap-5 align-middle text-azul text-xl">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
        </svg>

        <p>La forma de pago más usada:</p>
        <h3 class="text-black font-bold text-end">Paypal (${paypal.length} usos)</h3>

        </div>

        `
        pagos.appendChild(div);
    }

    if(lista.length > 0){
        pagos.querySelector('[data-pagos-vacio]').classList.add('hidden');
    }else{
        pagos.querySelector('[data-pagos-vacio]').classList.remove('hidden');
    }
};






//*GRAFICOS:
function graficoVentas(productos){

    //Pedidos según el año:
    productos.forEach(i => {

        const fecha = i.createdAt.split("T")[0];
        const year = fecha.split('-')[0];

        if(year === '2023'){

            ventasPastYear.push(i);

        }else if( year === '2024'){

            ventasThisYear.push(i);

        }

    });

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Año', 'Sales'],
          ['2023',  ventasPastYear.length],
          ['2024',  ventasThisYear.length]
        ]);

        var options = {
          'title': 'Ventas Totales del Año',
          'hAxis': {title: 'Año',  titleTextStyle: {color: '#333'}},
          'vAxis': {minValue: 0},
          'width':400,
          'height':300,
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
        chart.draw(data, options);

    }
};

function graficosTipodePedido(del, pic){

    google.charts.load('current', {'packages':['corechart']});

    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      // Create the data table.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Tipo de pedido');
      data.addColumn('number', 'Cantidad');
      data.addRows([
        ['Delivery', del.length],
        ['Pick-up', pic.length],
        
      ]);

      // Set chart options
      var options = {'title':'Tipos de pedidos',
                     'width':400,
                     'height':300,
                     'colors': ['#3FA8F4', '#368fce', '#8acaf8'],
                     'is3D': true
                    };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }

};

function graficoGanancias(){

    const ganancia2023 = ventasPastYear.map(i=> i.total).reduce((acc,cur) => acc + cur, 0);
    console.log('ganancia del 2023: $', ganancia2023)
    const gasto2023 = Math.floor(ganancia2023*0.50);

    const ganancia2024 = ventasThisYear.map(i=> i.total).reduce((acc,cur) => acc + cur, 0);
    console.log('ganancia del 2024: $', ganancia2024)
    const gasto2024 = Math.floor(ganancia2024*0.50);

    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Año', 'Gastos', 'Ganancia total'],
          ['2023', '$'+gasto2023, '$'+ganancia2023 ],
          ['2024', '$'+gasto2024, '$'+ganancia2024]
       
        ]);

        var options = {
          width: 800,
          height: 500,
          chart: {
            title: 'Ganancias de la empresa',
            subtitle: 'Ganancias de los años 2023 y 2024'
          }
        };

        var chart = new google.charts.Bar(document.getElementById('chart_div3'));

        chart.draw(data, google.charts.Bar.convertOptions(options));

    }

};





