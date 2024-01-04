const state={
    view:{
        quadrados: document.querySelectorAll(".quadrado"),
        inimigo: document.querySelector(".inimigo"),
        tempoRestante: document.querySelector("#tempoRestante"),
        placar:document.querySelector("#placar"),
        recorde:document.querySelector("#recorde"),
        vidas:document.querySelector("#vidas"),
    },
    values:{        
        velocidade: 800,
        clicado: 0,
        placar: 0,
        recorde: 0,
        tempoAtual: 10,
        tempoInicial: 10,
        vidas: 3,
    },
    acoes:{
        timerId: setInterval(quadradoAleatorio, 1000),
        contagemTemporizador: setInterval(tempo,1000),
    }
}

let contador=1

function quadradoAleatorio(){
    state.view.quadrados.forEach((quadrado)=>{
        quadrado.classList.remove("inimigo");
    });
    let numeroAleatorio = Math.floor(Math.random() * 9);
    let quadradoAleatorio = state.view.quadrados[numeroAleatorio];
    quadradoAleatorio.classList.add("inimigo");
    state.values.clicado = quadradoAleatorio.id;
}

function tocarSom(som){
    let audio = new Audio(`./src/audios/${som}.mp3`);
    audio.volume = 0.2;
    audio.play();
}

function tempo(){
    state.values.tempoAtual--;
    state.view.tempoRestante.textContent = state.values.tempoAtual;
    if (state.values.tempoAtual <= 0){
        tocarSom("fim");
        alert("Placar da Fase: " + state.values.placar);
        state.values.vidas--;
        if (state.values.vidas > 0){
            state.view.vidas.textContent=state.values.vidas;
            state.values.tempoAtual = state.values.tempoInicial;
            state.view.tempoRestante.textContent = state.values.tempoAtual;
            state.values.placar = 0;
            state.view.placar.textContent = state.values.placar;
        }
        else{
            alert("Fim de jogo! Recorde: " + state.values.recorde);
            clearInterval(state.acoes.timerId);
            clearInterval(state.acoes.contagemTemporizador);
        }
    }
}

function addListnerClique(){
    state.view.quadrados.forEach((quadrado)=>{
        quadrado.addEventListener("mousedown",()=>{
            if(quadrado.id === state.values.clicado){
                state.values.placar++
                state.view.placar.textContent=state.values.placar;
                state.values.clicado = null;
                if (state.values.recorde < state.values.placar){
                    state.values.recorde = state.values.placar;
                    state.view.recorde.textContent=state.values.recorde;
                }
                tocarSom("ponto");
            }
            else{
                tocarSom("bater");
            }
        })
    });
}

function iniciar(){
    addListnerClique();
}

iniciar();