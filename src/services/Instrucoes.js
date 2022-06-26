let copiadora = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const Instrucoes = {

    // Melhoria de código
    UpdateRegistradores : function(copia, copiadora, setRegistradores){
        for (let i = 0; i < 16; i++){
            copia[i] = copiadora[i];
        }
        console.log(copia);
        setRegistradores(copia);
    },

    // Instruções e subrotinas
    /// ex. Opcode: ONNN
    Vazio : function(anterior) {
        console.log("vazio");
        return anterior + 0x002;
    },

    /// ex. Opcode: 00EE
    Retorna : function(anterior) {
        //return 0x200;
        return anterior + 0x002;
    },

    /// ex. Opcode: 1NNN
    StrHex : function(x) {
        console.log("goto " + x);
        return parseInt(x, 16);
    },

    // Variáveis
    /// ex. Opcode: 6XNN
    setRegistrar : function(op, instrucao, registradores, setRegistradores) {
        let X = parseInt(op[1], 16);
        let NN = parseInt(op.slice(-2), 16);
        let copia = [...registradores];
        copiadora[X] = NN;
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 7XNN
    setAdd : function(op, instrucao, registradores, setRegistradores) {
        let ope = parseInt(op[1], 16);
        let valor = parseInt(op.slice(-2), 16);
        let copia = [...registradores];
        copiadora[ope] += valor;
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY0
    setIgual : function(op, instrucao, registradores, setRegistradores){
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        copiadora[ope1] = copiadora[ope2];
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY1
    setOR : function(op, instrucao, registradores, setRegistradores) {
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        let valor = parseInt(copiadora[ope1], 16) | parseInt(copiadora[ope2], 16);
        copiadora[ope1] = valor;
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY2
    setAND : function(op, instrucao, registradores, setRegistradores) {
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        let valor = parseInt(copiadora[ope1], 16) & parseInt(copiadora[ope2], 16);
        copiadora[ope1] = valor;
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY3
    setXOR : function(op, instrucao, registradores, setRegistradores) {
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        let valor = parseInt(copiadora[ope1], 16) ^ parseInt(copiadora[ope2], 16);
        copiadora[ope1] = valor;
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY4
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
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY5
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
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY7
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
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },
  
    // Condicionais
    setJump : function(op, instrucao, registradores, setRegistradores){
        switch(op[0]) {
            case '3':
                /// ex. Opcode: 3XNN
                if (copiadora(parseInt(op[1], 16)) === parseInt(op.slice(-2), 16)) {
                    return instrucao.indice + 0x004;
                }
                return instrucao.indice + 0x002;
            case '4':
                /// ex. Opcode: 4XNN
                if (copiadora(parseInt(op[1], 16)) !== parseInt(op.slice(-2), 16)) {
                    return instrucao.indice + 0x004;
                }
                return instrucao.indice + 0x002;
            case '5':
                /// ex. Opcode: 5XY5
                if (copiadora(parseInt(op[1], 16)) === copiadora(parseInt(op[2], 16))) {
                    return instrucao.indice + 0x004;
                }
                return instrucao.indice + 0x002;
            case '9':
                /// ex. Opcode: 9XY0
                if (copiadora(parseInt(op[1], 16)) !== copiadora(parseInt(op[2], 16))) {
                    return instrucao.indice + 0x004;
                }
                return instrucao.indice + 0x002;
            default:
                return instrucao.indice + 0x002;
        }
    },
  
    // Display
    /// ex. Opcode: 00E0
    LimpaTela : function(anterior) {
        console.log("cls()");
        return anterior + 0x002;
    },

    // Teclado
      
    // Timers

}

export default Instrucoes;
