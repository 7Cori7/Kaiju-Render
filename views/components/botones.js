const reservarBtn = document.querySelector('#reserva-btn');
const pedirBtn = document.querySelector('#pide-btn');

const btnTop = document.querySelector('#to-top');

btnTop.addEventListener('click', () => {
    window.scrollTo(0, 0);
})

reservarBtn.addEventListener('click', e => {
    e.preventDefault();
    window.location.pathname = '../reservar';
})

pedirBtn.addEventListener('click', e => {
    e.preventDefault();
    window.location.pathname = '../pide-online';
})
