const Cuerpo = document.querySelector('body');

const createNotificacion = (isError, message) => {

    const div = document.createElement('div');

    div.classList.add('fixed', 'top-5', 'right-0', 'left-0', 'z-50', 'w-full');

    if(isError){

        div.innerHTML = `
        
        <div class="w-full mx-auto px-4 flex justify-center">
            <p class="bg-red-500 p-4 w-3/4 rounded-lg font-bold text-white text-center uppercase">${message}</p>
        </div>

        `
        setTimeout(()=>{
            div.remove();
        },2000);

    }else{
        div.innerHTML = `
        
        <div class="w-full mx-auto px-4 flex justify-center">
            <p class="bg-green-400 p-4 w-3/4 rounded-lg font-bold text-white text-center uppercase">${message}</p>
        </div>
        
        `

        setTimeout(()=>{
            div.remove();
        },2000);

    }

    Cuerpo.appendChild(div);

}