let resetBtn = document.getElementById("reset");

function startGame(){
    resetBtn.style.display = "none";
    resetBtn.addEventListener("click", reset);    
}

//Inicialización de variables
let tarjetasDestapadas = 0;
let primerResultado = null;
let segundoResultado = null;
let tarjeta1 = null;
let tarjeta2 = null;
let movimientos = 0;
let aciertos = 0;
let timer = false;
let time = 30;
let timeInicial = 30;
let tiempoRegresivoId = null;

let winAudio = new Audio("./sounds/win.wav");
let clickAudio = new Audio("./sounds/click.wav");
let loseAudio = new Audio("./sounds/lose.wav");
let rightAudio = new Audio("./sounds/right.wav");
let wrongAudio = new Audio("./sounds/wrong.wav");


// Apuntando a documentos HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTimer = document.getElementById("timer");

// Generación de números aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

numeros = numeros.sort(()=>{return Math.random()-0.5});

// Funciones

// Función Tiempo
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        time--;
        if(time>=20){
        mostrarTimer.innerHTML = `Tiempo: <span id="seconds" style="color: green;">${time}</span> segundos`;
        }
        else if(time>=10){
        mostrarTimer.innerHTML = `Tiempo: <span id="seconds" style="color: rgb(255,128,0);">${time}</span> segundos`;
        }
        else if(time>0){
        mostrarTimer.innerHTML = `Tiempo: <span id="seconds" style="color: red;">${time}</span> segundos`;
        }
        else{
            mostrarTimer.innerHTML = `Tiempo: <span id="seconds" style="color: white;">${time}</span> segundos`;
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();

            mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😖`;
            mostrarTimer.innerHTML = `<span id="seconds" style="color: red;">Sorry GAME OVER</span>`;
            mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😭`;
        
            resetBtn.style.display = "block";    
        }
    },1000, time);
}

// Función Bloquear Tarjetas
function bloquearTarjetas(){
    for(let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}

// Función Destapar
function destapar(id){

    if(timer==false){
        contarTiempo();
        timer = true;
    }

    tarjetasDestapadas++;

    if(tarjetasDestapadas==1){
        // Monstrar el primer número
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">`;
        clickAudio.play();

        // Deshabilitar primer boton
        tarjeta1.disabled = true;
    }
    else if(tarjetasDestapadas==2){
        //Mostrar segundo número
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt="">`;

        // Deshabilitar segundo boton
        tarjeta2.disabled = true;

        // Incrementar Movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
        
        if(primerResultado==segundoResultado){
            // Encerar contador tarjeta destapada
            tarjetasDestapadas = 0;

            // Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            rightAudio.play();

            if(aciertos==8){
                winAudio.play();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
                mostrarTimer.innerHTML = `Fantastico solo Demoraste <span id="seconds" style="color: green;">${timeInicial-time}</span> segundos 💪🏻`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤘🏻😎`;
                resetBtn.style.display = "block";
            }
        }
        else{
            wrongAudio.play();
            // Mostrar momentaneamente valores y tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = "";
                tarjeta2.innerHTML = "";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
             },800)
        }    
    }
}

function reset(){
    location.reload();
}

window.addEventListener("load", startGame)