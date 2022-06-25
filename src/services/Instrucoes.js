let copiadora = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
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

    Update : function(copia, copiadora, setRegistradores){
        for (let i = 0; i < 16; i++){
            copia[i] = copiadora[i];
        }
        console.log(copia);
        setRegistradores(copia);
    },

    // Variáveis
    setRegistrar : function(op, instrucao, registradores, setRegistradores) {
        let ope = parseInt(op[1], 16);
        let valor = parseInt(op.slice(-2), 16);
        let copia = [...registradores];
        copiadora[ope] = valor;
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    setOR : function(op, instrucao, registradores, setRegistradores) {
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        let valor = parseInt(copiadora[ope1], 16) | parseInt(copiadora[ope2], 16);
        copiadora[ope1] = valor;
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    setAND : function(op, instrucao, registradores, setRegistradores) {
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        let valor = parseInt(copiadora[ope1], 16) & parseInt(copiadora[ope2], 16);
        copiadora[ope1] = valor;
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    setXOR : function(op, instrucao, registradores, setRegistradores) {
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        let valor = parseInt(copiadora[ope1], 16) ^ parseInt(copiadora[ope2], 16);
        copiadora[ope1] = valor;
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    setAdd : function(op, instrucao, registradores, setRegistradores) {
        let ope = parseInt(op[1], 16);
        let valor = parseInt(op.slice(-2), 16);
        let copia = [...registradores];
        copiadora[ope] += valor;
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    setIgual : function(op, instrucao, registradores, setRegistradores){
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        copiadora[ope1] = copiadora[ope2];
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    setAddop : function(op, instrucao, registradores, setRegistradores) { 
        //VF is set to 1 when there's a carry, and to 0 when there is not.
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        copiadora[ope1] += copiadora[ope2];
        if (copiadora[ope1] > parseInt(255, 16)) {
            copiadora[15] = parseInt(1, 16);
            console.log(copiadora[15]);
        }
        console.log(copia);
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    setSubop : function(op, instrucao, registradores, setRegistradores) { 
        //VF is set to 0 when there's a borrow, and 1 when there is not.
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        copiadora[ope1] -= copiadora[ope2];
        if (copiadora[ope1] > parseInt(255, 16)) {
            copiadora[15] = 0;
            console.log(copiadora[15]);
        }
        console.log(copia);
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    setRestop : function(op, instrucao, registradores, setRegistradores){
        //VF is set to 0 when there's a borrow, and 1 when there is not.
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        copiadora[ope1] = copiadora[ope2] - copiadora[ope1];
        if (copiadora[ope1] > parseInt(255, 16)) {
            copiadora[15] = 0;
            console.log(copiadora[15]);
        }
        console.log(copia);
        this.Update(copia, copiadora, setRegistradores)
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
