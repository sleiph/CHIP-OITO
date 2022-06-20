let copiadora = [0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
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
    Retorna : function(anterior) {
        //return 0x200;
        return anterior + 0x002;
    },

    // Variáveis
    setRegistrar : function(op, instrucao, registradores, setRegistradores) {
        let ope = parseInt(op[1], 16);
        let valor = parseInt(op.slice(-2), 16);
        //if (copia.length == 0) copia = [...registradores];
        let copia = [...registradores];
        copiadora[ope] = valor;
        copia = copiadora;
        console.log(copia);
        setRegistradores(copia);
        return instrucao + 0x002;
    },
  
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
