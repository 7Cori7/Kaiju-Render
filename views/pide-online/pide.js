//BOTONES DEL MENU DE CATEGORIAS:
const bebidaBtn = document.querySelector('#cat-1');
const rollBtn = document.querySelector('#cat-2');
const tempuBtn = document.querySelector('#cat-3');
const nigiriBtn = document.querySelector('#cat-4');
const temakiBtn = document.querySelector('#cat-5');
const entraBtn = document.querySelector('#cat-6');
const postreBtn = document.querySelector('#cat-7');

//TARGET DEL SCROLLING:
const menuBebidas = document.querySelector('#cat-Bebidas');
const menuroles = document.querySelector('#cat-roles');
const menuTemp = document.querySelector('#cat-tempura');
const menuNigiri = document.querySelector('#cat-nigiri');
const menuTemaki = document.querySelector('#cat-temakis');
const menuEntra = document.querySelector('#cat-entradas');
const menuPostre = document.querySelector('#cat-postres');


//EVENTOS:
bebidaBtn.addEventListener('click', e => {
    e.preventDefault();
    menuBebidas.scrollIntoView();
})

rollBtn.addEventListener('click', e => {
    e.preventDefault();
    menuroles.scrollIntoView();
})

tempuBtn.addEventListener('click', e => {
    e.preventDefault();
    menuTemp.scrollIntoView();
})


nigiriBtn.addEventListener('click', e => {
    e.preventDefault();
    menuNigiri.scrollIntoView();
})

temakiBtn.addEventListener('click', e => {
    e.preventDefault();
    menuTemaki.scrollIntoView();
})

entraBtn.addEventListener('click', e => {
    e.preventDefault();
    menuEntra.scrollIntoView();
})

postreBtn.addEventListener('click', e => {
    e.preventDefault();
    menuPostre.scrollIntoView();
})




//HORARIOS DROPDOWN:

const botonHorarios = document.querySelector('#horarios-btn');
const horarioMenu = document.querySelector('.horario-menu');

const lunes = document.querySelector('.lunes');
const martes = document.querySelector('.martes');
const miercoles = document.querySelector('.miercoles');
const jueves = document.querySelector('.jueves');
const viernes = document.querySelector('.viernes');
const sabado = document.querySelector('.sabado');
const domingo = document.querySelector('.domingo');

const estado = document.querySelector('.estado');
const estado2 = document.querySelector('.estado2');
const estado3 = document.querySelector('.estado3');
const estado4 = document.querySelector('.estado4');
const estado5 = document.querySelector('.estado5');
const estado6 = document.querySelector('.estado6');
const estado7 = document.querySelector('.estado7');


const hoy = new Date();
const hora = hoy.getHours();
const hoySemana = hoy.getDay();

let abierto = false;

console.log(hora)
console.log(hoySemana)


document.addEventListener('DOMContentLoaded', () => {
    
    if(hoySemana === 1 && hora >= 10 && hora < 22){
        lunes.classList.add('text-azul');
        estado.innerHTML = '- Abierto';
        abierto = true;
    }else if(hoySemana === 2 && hora >= 10 && hora < 22){
        martes.classList.add('text-azul');
        estado2.innerHTML = '- Abierto';
        abierto = true;
    }else if(hoySemana === 3 && hora >= 10 && hora < 22){
        miercoles.classList.add('text-azul');
        estado3.innerHTML = '- Abierto';
        abierto = true;
    }else if(hoySemana === 4 && hora >= 10 && hora < 22){
        jueves.classList.add('text-azul');
        estado4.innerHTML = '- Abierto';
        abierto = true;
    }else if(hoySemana === 5 && hora >= 10 && hora < 22){
        viernes.classList.add('text-azul');
        estado5.innerHTML = '- Abierto';
        abierto = true;
    }else if(hoySemana === 6 && hora >= 10 && hora < 23){
        sabado.classList.add('text-azul');
        estado6.innerHTML = '- Abierto';
        abierto = true;
    }else if(hoySemana === 0 && hora >= 10 && hora < 20){
        domingo.classList.add('text-azul');
        estado7.innerHTML = '- Abierto';
        abierto = true;
    }

    if(abierto){
        console.log('abierto')
        const indicarAbierto = botonHorarios.querySelector('a');
        indicarAbierto.innerHTML = `
            <span>Horarios (Abierto)</span>
        `
    }else{
        console.log('cerrado')
        const indicarCerrado = botonHorarios.querySelector('a');
        indicarCerrado.innerHTML = `
            <span>Horarios (Cerrado)</span>
        `
    }
})


botonHorarios.addEventListener('click', e => {
    e.preventDefault();
    horarioMenu.classList.toggle('activo');

})


