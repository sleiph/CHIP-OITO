import { LimpaTela, UpdateDisplay } from './Display';
import { isApertando, getIndiceApertadas, getUltimaApertada } from './Inputs';
import { SubrotinaPop, SubrotinaPush, getIndicePos, setIndicePos, getSprites, GetIndice, UpdateIndice } from './Memoria';
import { GetReg, UpdateRegistradores, UpdateRegistradoresArr, CopiaRegs } from './Registros';
import { getDT, setDelay, setSom } from './Timer';

/**
 * Instruções que serão usadas no disassembler
 */
const Instrucoes = {
    // Instruções e subrotinas
    /// ex. Opcode: ONNN
    Vazio : function(): number {
        return 2;
    },

    /// ex. Opcode: 00EE
    Retorna : function(): number {
        let sub = SubrotinaPop();
        return sub;
    },

    /// ex. Opcode: 1NNN
    StrHex : function(nnn: number): number {
        return nnn;
    },

    /// ex. Opcode: 2NNN
    StrRot : function(nnn: number, instrucao: number): number {
        SubrotinaPush(instrucao + 2);
        return nnn;
    },

    /// ex. Opcode: BNNN
    pulaPraNNN : function(nnn: number): number {
        return nnn + GetReg(0);
    },


    // Variáveis
    /// ex. Opcode: 6XNN
    setRegistrar : function(x: number, nn: number): number {
        UpdateRegistradores(x, nn);
        return 2;
    },

    /// ex. Opcode: 7XNN
    setAdd : function(x: number, nn: number): number {
        let temp = (GetReg(x) + nn) & 0xff;
        UpdateRegistradores(x, temp);
        return 2;
    },

    /// ex. Opcode: 8XY0
    setIgual : function(x: number, y: number): number {
        UpdateRegistradores(x, GetReg(y));
        return 2;
    },

    /// ex. Opcode: 8XY1
    setOR : function(x: number, y: number): number {
        let temp = GetReg(x) | GetReg(y);
        UpdateRegistradores(x, temp);
        return 2;
    },

    /// ex. Opcode: 8XY2
    setAND : function(x: number, y: number): number {
        let temp = GetReg(x) & GetReg(y);
        UpdateRegistradores(x, temp);
        return 2;
    },

    /// ex. Opcode: 8XY3
    setXOR : function(x: number, y: number): number {
        let temp = GetReg(x) ^ GetReg(y);
        UpdateRegistradores(x, temp);
        return 2;
    },

    /// ex. Opcode: 8XY4
    setAddop : function(x: number, y: number): number {
        let copia = CopiaRegs();
        let soma = (copia[x] + copia[y]);
        copia[15] = (soma > 0xff) ? 1 : 0;
        copia[x] = soma & 0xff;
        UpdateRegistradoresArr(copia);
        return 2;
    },

    /// ex. Opcode: 8XY5
    setSubop : function(x: number, y: number): number {
        let copia = CopiaRegs();
        copia[15] = (copia[x] >= copia[y]) ? 1 : 0; // antigo: copia[15] = (copia[x] > copia[y]) ? 1 : 0;
        copia[x] -= copia[y];
        if (copia[x] < 0) 
           copia[x] = 0xff + (copia[x] + 1); // antigo: copia[x] = 0xff + copia[x];
        UpdateRegistradoresArr(copia);
        return 2;
    },

    /// ex. Opcode: 8XY6
    setRightShift : function(x: number/*, y: number*/): number { //falta arrumar isso aq
        let copia = CopiaRegs();
        //copia[x] = copia[y];
        const lsb = copia[x] & 0x80;
        copia[x] >>= 1;
        copia[15] = lsb;
        UpdateRegistradoresArr(copia);
        return 2;
    },

    /// ex. Opcode: 8XY7
    setRestop : function(x: number, y: number): number {
        let copia = CopiaRegs();
        copia[15] = (copia[y] > copia[x]) ? 1 : 0;
        copia[x] = copia[y] - copia[x];
        if (copia[x] < 0)
            copia[x] = 0xff + (copia[x] + 1); // antigo: copia[x] = 0xff + copia[x];
        UpdateRegistradoresArr(copia);
        return 2;
    },
     
    /// ex. Opcode: 8XYE
    setLeftShift : function(x: number): number {
        let copia = CopiaRegs();
        copia[15] = copia[x] & 0x80;
        copia[x] <<= 1;
        UpdateRegistradoresArr(copia);
        return 2;
    },

    /// ex. Opcode: CXNN
    setRandom : function(indice: number, valor: number): number {
        let temp = (Math.floor(Math.random() * 0xff) & valor) & 0xff;
        UpdateRegistradores(indice, temp);
        return 2;
    },
  

    // Condicionais
    /// ex. Opcode: 3XNN
    skipXNNTrue: function(x: number, nn: number): number {
        if (GetReg(x) === nn)
            return 4;
        return 2;
    },

    /// ex. Opcode: 4XNN
    skiptXNNFalse: function(x: number, nn: number): number {
        if (GetReg(x) !== nn)
            return 4;
        return 2;
    },

    /// ex. Opcode: 5XY0
    skipXYTrue: function(x: number, y: number): number {
        if (GetReg(x) === GetReg(y))
            return 4;
        return 2;
    },

    /// ex. Opcode: 9XY0
    skipXYFalse : function(x: number, y: number) {
        if (GetReg(x) !== GetReg(y))
            return 4;
        return 2;
    },
  

    // Display
    /// ex. Opcode: 00E0
    LimpaTela : function() {
        LimpaTela();
        return 2;
    },

    /// ex. Opcode: DXYN
    Desenha : function (x: number, y: number, n: number) {
        let vX: number = GetReg(x);
        let vY: number = GetReg(y);
        let sprites: number[] = getSprites(n);
        let vf: number = UpdateDisplay(vX, vY, sprites.map(String)) ? 1 : 0;
        UpdateRegistradores(15, vf);
        return 2;
    },


    // Teclado
    /// ex. Opcode: EX9E
    isApertando : function (x: number) {
        if (isApertando() && getIndiceApertadas(GetReg(x).toString()) !== -1) {
            return 4;
        }
        return 2;
    },

    /// TODO: fazer essa aqui
    /// ex. Opcode: EXA1
    isNotApertando : function(x: number) {
        if (getIndiceApertadas(GetReg(x).toString()) === -1) {
                return 4;
        }
        return 2;
    },

    /// TODO: fazer essa aqui
    /// ex. Opcode: FX0A
    esperarTecla : function(x: number) {
        if (isApertando()) {
            UpdateRegistradores(x, parseInt(getUltimaApertada()));
            return 2;
        }
        return 0;
    },


    // Timers
    /// ex. Opcode: FX07
    registraTimer : function(x: number) {
        UpdateRegistradores(x, getDT());
        return 2;
    },

    /// ex. Opcode: FX15
    setTimer : function(x: number) {
        setDelay(GetReg(x));
        return 2;
    },


    // Som
    /// ex. Opcode: FX18
    setSound : function(x: number) {
        setSom(GetReg(x));
        return 2;
    },

    
    // Memória
    /// ex. Opcode: ANNN
    setIndico : function(nnn: number) {
        UpdateIndice(nnn);
        return 2;
    },

    /// ex. Opcode: FX1E
    setAddIndice : function(x: number) {
        let temp = (GetIndice() + GetReg(x)) & 0xfff;
        UpdateIndice(temp);
        return 2;
    },

    /// ex. Opcode: FX29
    registraIndice : function(x: number) {
        let pos = 0x50 + (GetReg(x) * 5);
        UpdateIndice(pos);
        return 2;
    },

    /// ex. Opcode: FX33
    setBCD : function(x: number) {
        const reg = GetReg(x);

        const pos1 = Math.floor(reg / 100); //o problema era os decimais
        setIndicePos(0, pos1);

        const pos2 = Math.floor((reg % 100) / 10);
        setIndicePos(1, pos2);

        const pos3 = Math.floor(reg % 10);
        setIndicePos(2, pos3);

        return 2;
    },

    /// ex. Opcode: FX55
    save : function(x: number) { 
        for (let i = 0; i <= x; i++) {
            let pos = GetReg(i);
            setIndicePos(i, pos);
        }
        return 2;
    },

    /// ex. Opcode: FX65
    load : function(x: number) {
        let copia = CopiaRegs();
        for (let i = 0; i <= x; i++)
            copia[i] = getIndicePos(i);
        UpdateRegistradoresArr(copia);
        return 2;
    }
}

export default Instrucoes;