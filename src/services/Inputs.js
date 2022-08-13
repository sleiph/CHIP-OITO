import Instrucoes from "./Instrucoes";

let go = true;
let controlePause = true;
let timerPause = 0;

if (timerPause > 120) controlePause = true;

/**
 * Controla a entrada de comandos (teclado) do emulador
 */
const Inputs = {
    /**
     * Alterna entre estado de execução e pausa
     */
    redSignal : function () {
        if (controlePause) {
            go = !go;
            controlePause = false;
        }
    },

    /**
     * garante que o pause só seja executado uma vez
     * 
     * @returns se pode pausar ou não
     */
    sendSignal : function(){
        if (!controlePause) timerPause++;
        if (timerPause > 10) controlePause = true;
        return go;
    },

    /**
     * Executa ações do teclado
     */
    Teclou : function(tecla) {
        if (tecla === "0") {
            console.log("0");
        } else if (tecla === "1") {
            console.log("1");
        } else if (tecla === "2") {
            console.log("2");
        } else if (tecla === "3") {
            console.log("3");
        } else if (tecla === "4") {
            console.log("4");
        } else if (tecla === "5") {
            console.log("5");
        } else if (tecla === "6") {
            console.log("6");
        } else if (tecla === "7") {
            console.log("7");
        } else if (tecla === "8") {
            console.log("8");
        } else if (tecla === "9") {
            console.log("9");
        } else if (tecla === "q") {
            console.log("A");
        } else if (tecla === "w") {
            console.log("B");
        } else if (tecla === "e") {
            console.log("C");
        } else if (tecla === "a") {
            console.log("D");
        } else if (tecla === "s") {
            console.log("E");
        } else if (tecla === "d") {
            console.log("F");
        }
        Instrucoes.registraTecla();
    }
}

export default Inputs;
