const categCerveza = document.querySelector('#lista-cerveza');
const categCoctel = document.querySelector('#lista-coctel');
const categVino = document.querySelector('#lista-vino');

//*IMPRIMIR MENÚ:
document.addEventListener('DOMContentLoaded', async () => {

    try{

        //Categoria Cervezas:
        const productosCerveza = await axios.get('/api/bares/categ/cerveza');
        const menuCerveza = productosCerveza.data.data;

        menuCerveza.forEach( i => {
            const {nombre, ingredientes, precio} = i;
            const tarjetaCerveza = document.createElement('div');
            tarjetaCerveza.classList.add('border-2', 'p-4', 'h-full', 'w-full', 'lg:w-[32%]', 'md:w-[48%]', 'rounded-lg');

            tarjetaCerveza.innerHTML += `
            <div class="text-white azul h-full w-full rounded-lg p-10 relative">
                <h2 class="uppercase">${nombre}</h2>
                <P class="font-extralight lg:text-lg text-sm">${ingredientes}</P>
                <P>$ ${precio}</P>
                <img src="/imagenes/beer-icon.png" alt="icono de cerveza" class="absolute -bottom-5 -right-5 z-10 w-20 lg:w-auto">
            </div>
            `;
            categCerveza.appendChild(tarjetaCerveza);
        });


        //Categoria Cocteles:
        const productosCocteles = await axios.get('/api/bares/categ/coctel');
        const menuCocteles = productosCocteles.data.data;

        menuCocteles.forEach( i => {
            const {nombre, ingredientes, precio} = i;
            const tarjetaCocteles = document.createElement('div');
            tarjetaCocteles.classList.add('border-2', 'p-4', 'h-full', 'w-full', 'lg:w-[32%]', 'md:w-[48%]', 'rounded-lg');

            tarjetaCocteles.innerHTML +=`
            <div class="text-white azul h-full w-full rounded-lg p-10 relative">
                <h2 class="uppercase">${nombre}</h2>
                <P class="font-extralight lg:text-lg text-sm">${ingredientes}</P>
                <P>$ ${precio}</P>
                <img src="/imagenes/cocktail-icon.png" alt="icono de coctel" class="absolute -bottom-5 right-0 z-10 w-20 lg:w-auto">
            </div>
            `;

            categCoctel.appendChild(tarjetaCocteles);
        });


        //Categoria de Vinos:
        const productosVino = await axios.get('/api/bares/categ/vino');
        const menuVino = productosVino.data.data;

        menuVino.forEach( i => {
            const {nombre, ingredientes, precio} = i;
            const tarjetaVinos = document.createElement('div');
            tarjetaVinos.classList.add('border-2', 'p-4', 'h-full', 'w-full', 'lg:w-[32%]', 'md:w-[48%]', 'rounded-lg');

            tarjetaVinos.innerHTML +=`
            <div class="text-white azul h-full w-full rounded-lg p-10 relative">
                <h2 class="uppercase">${nombre}</h2>
                <P class="font-extralight lg:text-lg text-sm">${ingredientes}</P>
                <P>$ ${precio}</P>
                <img src="/imagenes/wine-icon.png" alt="icono de copa de vino" class="absolute -bottom-5 right-0 z-10 w-12 lg:w-auto">
            </div>
            `;
            
            categVino.appendChild(tarjetaVinos);

        });


    }catch(error){
        console.log(error);
        createNotificacion(true,error.response.data.error);
    }

})