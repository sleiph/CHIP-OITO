const Instrucoes = {

    Vazio : function(anterior) {
        console.log("vazio");
        return anterior + 0x002;
    },

    StrHex : function(x) {
        console.log("goto " + x);
        return parseInt(x, 16);
    },

    // Instruções e subrotinas
    Retorna : function() {
        return 0x200;
    },
  
    // Variáveis
  
    // Condicionais
  
    // Operações
  
    // Display
    LimpaTela : function(anterior) {
        console.log("cls()");
        return anterior + 0x002;
    },

    // Teclado
      
    // Timers

}

export default Instrucoes;
