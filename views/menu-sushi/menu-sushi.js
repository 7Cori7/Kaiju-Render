const categFrios = document.querySelector('#lista-frios');
const categFritos = document.querySelector('#lista-fritos');
const categNigiri = document.querySelector('#lista-nigiri');
const categTemaki = document.querySelector('#lista-temaki');
const categEntradas = document.querySelector('#lista-entradas');
const categPostres = document.querySelector('#lista-postres');


//*IMPRIMIR MENÚ:
document.addEventListener('DOMContentLoaded', async () => {


    try{

        //Categoria Roles-Frios:
        const productosFrios = await axios.get('/api/menus/categ/frios');

        const menuFrios = productosFrios.data.data;

        menuFrios.forEach( i => {

            const {nombre, ingredientes, precio} = i;

            const tarjetaFrio = document.createElement('div');

            tarjetaFrio.classList.add('border-2', 'p-4', 'h-full', 'w-full', 'lg:w-[32%]', 'md:w-[48%]', 'rounded-lg');

            tarjetaFrio.innerHTML += `

            <div class="text-white azul h-full w-full rounded-lg p-10 relative">
                <h2 class="uppercase">${nombre}</h2>
                <P class="font-extralight text-lg">${ingredientes}</P>
                <P>$ ${precio}</P>
                <img src="/imagenes/icono-1.png" alt="icono de rol frio" class="absolute right-0 z-10">
            </div>

            `

            categFrios.appendChild(tarjetaFrio);

        });


        //Categoría Roles Tempurizados:
        const productosFritos = await axios.get('/api/menus/categ/fritos');

        const menuFritos = productosFritos.data.data;

        menuFritos.forEach( i => {
            const {nombre, ingredientes, precio} = i;
            const tarjetaTempura = document.createElement('div');
            tarjetaTempura.classList.add('border-2', 'p-4', 'h-full', 'w-full', 'lg:w-[32%]', 'md:w-[48%]', 'rounded-lg');

            tarjetaTempura.innerHTML += `
            
            <div class="text-white azul h-full w-full rounded-lg p-10 relative">
                <h2 class="uppercase">${nombre}</h2>
                <P class="font-extralight text-lg">${ingredientes}</P>
                <P>$ ${precio}</P>
                <img src="/imagenes/icono-2.png" alt="icono de rol frito" class="absolute right-0 z-10">
            </div>

            `
            categFritos.appendChild(tarjetaTempura);
        });


        //Categoria Nigiri Sushi:
        const productosNigiri = await axios.get('/api/menus/categ/nigiri');
        const menuNigiri = productosNigiri.data.data;

        menuNigiri.forEach( i => {
            const {nombre, ingredientes, precio} = i;
            const tarjetaNigiri = document.createElement('div');
            tarjetaNigiri.classList.add('border-2', 'p-4', 'h-full', 'w-full', 'lg:w-[32%]', 'md:w-[48%]', 'rounded-lg');

            tarjetaNigiri.innerHTML +=`
            
            <div class="text-white azul h-full w-full rounded-lg p-10 relative">
                <h2 class="uppercase">${nombre}</h2>
                <P class="font-extralight text-lg">${ingredientes}</P>
                <P>$ ${precio}</P>
                <img src="/imagenes/icono-3.png" alt="icono de nigiri" class="absolute right-0 z-10">
            </div>

            `

            categNigiri.appendChild(tarjetaNigiri);
        });

        //Categoria Temaki Rolls:
        const productosTemaki = await axios.get('/api/menus/categ/temaki');
        const menuTemaki = productosTemaki.data.data;

        menuTemaki.forEach( i => {
            const {nombre, ingredientes, precio} = i;
            const tarjetaTemaki = document.createElement('div');
            tarjetaTemaki.classList.add('border-2', 'p-4', 'h-full', 'w-full', 'lg:w-[32%]', 'md:w-[48%]', 'rounded-lg');

            tarjetaTemaki.innerHTML +=`
            
            <div class="text-white azul h-full w-full rounded-lg p-10 relative">
                <h2 class="uppercase">${nombre}</h2>
                <P class="font-extralight text-lg">${ingredientes}</P>
                <P>$ ${precio}</P>
                <img src="/imagenes/icono-4.png" alt="icono de temaki" class="absolute right-0 z-10">
            </div>

            `
            categTemaki.appendChild(tarjetaTemaki);
        });


        //Categoria de Entradas:
        const productosEntradas = await axios.get('/api/menus/categ/entradas');
        const menuEntradas = productosEntradas.data.data;

        menuEntradas.forEach( i => {
            const {nombre, ingredientes, precio} = i;
            const tarjetaEntradas = document.createElement('div');
            tarjetaEntradas.classList.add('border-2', 'p-4', 'h-full', 'w-full', 'lg:w-[32%]', 'md:w-[48%]', 'rounded-lg');

            tarjetaEntradas.innerHTML +=`
            
            <div class="text-white azul h-full w-full rounded-lg p-10 relative">
                <h2 class="uppercase">${nombre}</h2>
                <P class="font-extralight text-lg">${ingredientes}</P>
                <P>$ ${precio}</P>
                <img src="/imagenes/icono-5.png" alt="icono de sopa" class="absolute right-0 z-10">
            </div>
            `
            categEntradas.appendChild(tarjetaEntradas);

        });


        //Categoria de Postres:
        const productosPostres = await axios.get('/api/menus/categ/postres');
        const menuPostres = productosPostres.data.data;

        menuPostres.forEach( i => {
            const {nombre, ingredientes, precio} = i;
            const tarjetaPostres = document.createElement('div');
            tarjetaPostres.classList.add('border-2', 'p-4', 'h-full', 'w-full', 'lg:w-[32%]', 'md:w-[48%]', 'rounded-lg');

            tarjetaPostres.innerHTML +=`
            
            <div class="text-white azul h-full w-full rounded-lg p-10 relative">
                <h2 class="uppercase">${nombre}</h2>
                <P class="font-extralight text-lg">${ingredientes}</P>
                <P>$ ${precio}</P>
                <img src="/imagenes/icono-6.png" alt="icono de flor" class="absolute right-0 z-10">
            </div>
            `
            
            categPostres.appendChild(tarjetaPostres);
        });


    }catch(error){
        console.log(error);
        createNotificacion(true,error.response.data.error);
    }

});