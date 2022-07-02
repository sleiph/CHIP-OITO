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
    setRegistrar : function(ope1, valor, instrucao, registradores, setRegistradores) {
        let copia = [...registradores];
        copiadora[ope1] = valor;
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 7XNN
    setAdd : function(ope1, valor, instrucao, registradores, setRegistradores) {
        let copia = [...registradores];
        copiadora[ope1] += valor;
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY0
    setIgual : function(ope1, ope2, instrucao, registradores, setRegistradores){
        let copia = [...registradores];
        copiadora[ope1] = copiadora[ope2];
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY1
    setOR : function(ope1, ope2, instrucao, registradores, setRegistradores) {
        let copia = [...registradores];
        copiadora[ope1] = parseInt(copiadora[ope1], 16) | parseInt(copiadora[ope2], 16);
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY2
    setAND : function(ope1, ope2, instrucao, registradores, setRegistradores) {
        let copia = [...registradores];
        let valor = parseInt(copiadora[ope1], 16) & parseInt(copiadora[ope2], 16);
        copiadora[ope1] = valor;
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY3
    setXOR : function(ope1, ope2, instrucao, registradores, setRegistradores) {
        let copia = [...registradores];
        let valor = parseInt(copiadora[ope1], 16) ^ parseInt(copiadora[ope2], 16);
        copiadora[ope1] = valor;
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY4
    setAddop : function(ope1, ope2, instrucao, registradores, setRegistradores) { 
        //VF is set to 1 when there's a carry, and to 0 when there is not.
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
    setSubop : function(ope1, ope2, instrucao, registradores, setRegistradores) { 
        //VF is set to 0 when there's a borrow, and 1 when there is not.
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
    setRestop : function(ope1, ope2, instrucao, registradores, setRegistradores){
        //VF is set to 0 when there's a borrow, and 1 when there is not.
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

    setRightShift : function(ope1, instrucao, registradores, setRegistradores) {
        let copia = [...registradores];
        copiadora[ope1] = parseInt(copiadora[ope1], 16) >> 1;
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    setLeftShift : function(ope1, instrucao, registradores, setRegistradores) {
        let copia = [...registradores];
        copiadora[ope1] = parseInt(copiadora[ope1], 16) << 1;
        this.UpdateRegistradores(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },
  
    // Condicionais
    setJump : function(op, ope1, valor, instrucao){
        switch(op[0]) {
            case '3':
                //console.log(ope1);
                console.log(op);
                /// ex. Opcode: 3XNN
                if (copiadora[ope1] === valor) {
                    console.log("foi");
                    return instrucao + 0x004;
                }
                return instrucao + 0x002;
            case '4':
                /// ex. Opcode: 4XNN
                if (copiadora[ope1] !== valor) {
                    return instrucao + 0x004;
                }
                return instrucao + 0x002;
            case '5':
                /// ex. Opcode: 5XY5
                if (copiadora[ope1] === copiadora[valor]) {
                    return instrucao + 0x004;
                }
                return instrucao+ 0x002;
            case '9':
                /// ex. Opcode: 9XY0
                if (copiadora[ope1] !== copiadora[valor]) {
                    return instrucao + 0x004;
                }
                return instrucao + 0x002;
            default:
                return instrucao + 0x002;
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
