import Tratamento from "./Tratamento";

/**
 * Controla a entrada de comandos (teclado) do emulador
 */
const Inputs = {
    teclas: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "q", "w", "e", "a", "s", "d"],
    isJogando : true,
    proximo : false,
    apertando: false,
    apertada: 0,

    /**
     * garante que o pause só seja executado uma vez
     */
    ToggleJogando : function() {
        this.isJogando = !this.isJogando;
    },

    /**
     * Executa ações do teclado
     */
    Teclou : function(tecla) {
        this.apertando = true;
        let indice = this.teclas.indexOf(tecla);
        if (indice !== -1) {
            this.apertada = indice;
        }
    },

    Soltou: function() {
        this.apertando = false;
        this.apertada = '';
    }
    
}

export default Inputs;