let copiadora = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

const Instrucoes = {

    // melhoria de código

    /**
     * Atualiza os Registradores com o valor passado na variável cópia
     */
    UpdateRegistradores : function(copia, copiadora, setRegistradores){
        for (let i = 0; i < 16; i++){
            copia[i] = copiadora[i];
        }
        console.log("updateRegistradores: " + copia);
        setRegistradores(copia);
    },

    // Instruções e subrotinas
    /// ex. Opcode: 0NNN
    Vazio : function(anterior) {
        console.log("vazio");
        return anterior + 0x002;
    },

    /**
     * ex. Opcode: 00EE
     * TODO: Fazer
     * 
     * Retorna pro ponto que chamou a função atual + 0x002(próxima instrução)
     * @param {*} anterior a posição da instrução que chamou Retorna
     * @returns a posição da instrução depois da 2NNN que chamou a subrotina atual
     *   
     */
    Retorna : function(anterior) {
        //return 0x200;
        return anterior + 0x002;
    },

    /// ex. Opcode: 1NNN
    StrHex : function(op) {
        return parseInt(op[1] + op[2] + op[3], 16);
    },

    // Manipulação de variáveis
    /// ex. Opcode: 6XNN
    setRegistrar : function(op, instrucao, registradores, setRegistradores) {
        let ope = parseInt(op[1], 16);
        let valor = parseInt(op.slice(-2), 16);
        let copia = [...registradores];
        copiadora[ope] = valor;
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 7XNN
    setAdd : function(op, instrucao, registradores, setRegistradores) {
        let ope = parseInt(op[1], 16);
        let valor = parseInt(op.slice(-2), 16);
        let copia = [...registradores];
        copiadora[ope] += valor;
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY0
    setIgual : function(op, instrucao, registradores, setRegistradores){
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        copiadora[ope1] = copiadora[ope2];
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY1
    setOR : function(op, instrucao, registradores, setRegistradores) {
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        let valor = parseInt(copiadora[ope1], 16) | parseInt(copiadora[ope2], 16);
        copiadora[ope1] = valor;
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY2
    setAND : function(op, instrucao, registradores, setRegistradores) {
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        let valor = parseInt(copiadora[ope1], 16) & parseInt(copiadora[ope2], 16);
        copiadora[ope1] = valor;
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY3
    setXOR : function(op, instrucao, registradores, setRegistradores) {
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        let valor = parseInt(copiadora[ope1], 16) ^ parseInt(copiadora[ope2], 16);
        copiadora[ope1] = valor;
        this.Update(copia, copiadora, setRegistradores)
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
        }
        this.Update(copia, copiadora, setRegistradores)
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
        }
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    /**
     * ex. Opcode: 8XY6
     * TODO: Fazer
     * 
     * @returns próxima instrução
     */


    /**
     * ex. Opcode: 8XY7
     * 
     * Seta VX pra VY - VX, se tiver algum empréstimo (borrow) seta V15=0, senão seta V15=1
     * @returns próxima instrução
     */
    setRestop : function(op, instrucao, registradores, setRegistradores){
        let ope1 = parseInt(op[1], 16);
        let ope2 = parseInt(op[2], 16);
        let copia = [...registradores];
        copiadora[ope1] = copiadora[ope2] - copiadora[ope1];
        if (copiadora[ope1] > parseInt(255, 16)) {
            copiadora[15] = 0;
        }
        this.Update(copia, copiadora, setRegistradores)
        return instrucao + 0x002;
    },

    // Condicionais

  
    // Display
    /**
     * ex. Opcode: 00E0
     * TODO: Fazer
     * 
     * Limpa o Display
     * @param anterior a posição da instrução que chamou LimpaTela
     * @returns a proxima instrução
     */
    LimpaTela : function(anterior) {
        console.log("cls()");
        return anterior + 0x002;
    },

    // Teclado
      
    // Timers

}

export default Instrucoes;
