import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";
import Tratamento from "./Tratamento";

/**
 * Controla a entrada de comandos (teclado) do emulador
 */
const Inputs = {
    teclas: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "q", "w", "e", "a", "s", "d"],
    go : true,
    bloquear: false,
    continuar : false,
    controlePause : true,
    executarProximo : false,
    apertando: false,
    apertada: '',
    msg: '',
    wait: false,

    /**
     * Alterna entre estado de execução e pausa
     */
    redSignal : function () {
        if (this.controlePause) {
            this.go = !this.go;
            this.controlePause = false;
        }
    },

    /**
     * Permite que FXOA funcione(Instrucoes.js)
     */
    greenSignal : function() {
        this.continuar = false;
        this.bloquear = false;
        return this.msg;
    },

    /**
     * garante que o pause só seja executado uma vez
     * 
     * @returns se pode pausar ou não
     */
    sendSignal : function() {
        this.controlePause = true;
        return this.go;
    },

    sendAnother : function() {
        this.bloquear = true;
        return this.continuar;
    },

    /**
     * Chama só a próxima instrução
     */
    proximo: function() {
        if (this.controlePause)
            this.executarProximo = true;
    },

    /**
     * Executa ações do teclado
     */
    Teclou : function(tecla) {
        this.apertando = true;
        let indice = this.teclas.indexOf(tecla);
        if (indice !== -1) {
            this.apertada = Tratamento.IntPraHex(indice);
            if (this.bloquear) {
                this.continuar = true;
                this.msg = this.apertada; 
            } 
            console.log(this.apertada);
        }
    }
    
}

export default Inputs;
