import Display from './Display';
import Inputs from './Inputs';
import Memoria from './Memoria';
import Registros from './Registros';
import Timer from './Timer';

/**
 * Instruções que serão usadas no disassembler
 */
const Instrucoes = {

    // Instruções e subrotinas
    /// ex. Opcode: ONNN
    Vazio : function() {
        return 2;
    },

    /// ex. Opcode: 00EE
    Retorna : function() {
        return Memoria.Subrotina;
    },

    /// ex. Opcode: 1NNN
    StrHex : function(nnn) {
        return nnn;
    },

    /// ex. Opcode: 2NNN
    StrRot : function(nnn, instrucao) {
        Memoria.Subrotina = instrucao + 2;
        return nnn;
    },

    /// ex. Opcode: BNNN
    pulaPraNNN : function(nnn){
        return nnn + Registros.reg[0];
    },


    // Variáveis
    /// ex. Opcode: 6XNN
    setRegistrar : function(x, nn) {
        Registros.UpdateRegistradores(x, nn);
        return 2;
    },

    /// ex. Opcode: 7XNN
    setAdd : function(x, nn) {
        let temp = (Registros.reg[x] + nn) & 0xff;
        Registros.UpdateRegistradores(x, temp);
        return 2;
    },

    /// ex. Opcode: 8XY0
    setIgual : function(x, y) {
        Registros.UpdateRegistradores(x, Registros.reg[y]);
        return 2;
    },

    /// ex. Opcode: 8XY1
    setOR : function(x, y) {
        let temp = Registros.reg[x] | Registros.reg[y];
        Registros.UpdateRegistradores(x, temp);
        return 2;
    },

    /// ex. Opcode: 8XY2
    setAND : function(x, y) {
        let temp = Registros.reg[x] & Registros.reg[y];
        Registros.UpdateRegistradores(x, temp);
        return 2;
    },

    /// ex. Opcode: 8XY3
    setXOR : function(x, y) {
        let temp = Registros.reg[x] ^ Registros.reg[y];
        Registros.UpdateRegistradores(x, temp);
        return 2;
    },

    /// ex. Opcode: 8XY4
    setAddop : function(x, y) { 
        let soma = (Registros.reg[x] += Registros.reg[y]);
        if (soma > 0xFF) {
            soma -= 256;
            Registros.UpdateRegistradores(15, 1);
        } else
            Registros.UpdateRegistradores(15, 0);
        Registros.UpdateRegistradores(x, soma);
        return 2;
    },

    /// ex. Opcode: 8XY5
    setSubop : function(x, y) {
        let temp = Registros.reg[x] - Registros.reg[y];
        if (Registros.reg[x] > Registros.reg[y])
            Registros.UpdateRegistradores(15, 1);
        else
            Registros.UpdateRegistradores(15, 0);
        if (temp < 0)
            temp = 0xff + temp;
        Registros.UpdateRegistradores(x, temp);
        return 2;
    },

    /// ex. Opcode: 8XY6
    setRightShift : function(x) {
        let temp = Registros.reg[x] >> 1;
        Registros.UpdateRegistradores(15, Registros.reg[x] & 0x1);
        Registros.UpdateRegistradores(x, temp);
        return 2;
    },

    /// ex. Opcode: 8XY7
    setRestop : function(x, y){
        let temp = Registros.reg[y] - Registros.reg[x];
        if (Registros.reg[y] > Registros.reg[x])
            Registros.UpdateRegistradores(15, 1);
        else
            Registros.UpdateRegistradores(15, 0);
        if (temp < 0)
            temp = 0xff + temp;
        Registros.UpdateRegistradores(x, temp);
        return 2;
    },
     
    /// ex. Opcode: 8XYE
    setLeftShift : function(x) {
        let temp = Registros.reg[x] << 1;
        Registros.UpdateRegistradores(15, Registros.reg[x] & 0x80);
        Registros.UpdateRegistradores(x, temp);
        return 2;
    },

    /// ex. Opcode: CXNN
    setRandom : function(indice, valor) {
        let temp = (Math.floor(Math.random() * 0xFF) & valor) & 0xFF;
        Registros.UpdateRegistradores(indice, temp);
        return 2;
    },
  

    // Condicionais
    /// ex. Opcode: 3XNN
    skipXNNTrue: function(x, nn) {
        if (Registros.reg[x] === nn)
            return 4;
        return 2;
    },

    /// ex. Opcode: 4XNN
    skiptXNNFalse: function(x, nn) {
        if (Registros.reg[x] !== nn)
            return 4;
        return 2;
    },

    /// ex. Opcode: 5XY0
    skipXYTrue: function(x, y) {
        if (Registros.reg[x] === Registros.reg[y])
            return 4;
        return 2;
    },

    /// ex. Opcode: 9XY0
    skipXYFalse : function(x, y) {
        if (Registros.reg[x] !== Registros.reg[y])
            return 4;
        return 2;
    },
  

    // Display
    /// ex. Opcode: 00E0
    LimpaTela : function() {
        Display.LimpaTela();
        return 2;
    },

    /// ex. Opcode: DXYN
    Desenha : function (x, y, n) {
        let vX = Registros.reg[x];
        let vY = Registros.reg[y];
        let sprite = [];
        for (let i = 0; i < n; i++)
            sprite.push(Memoria.pos[Memoria.Indice+i]);
        
        let vf = Display.UpdateDisplay(vX, vY, sprite) ? 1 : 0;
        Registros.UpdateRegistradores(15, vf);
        return 2;
    },


    // Teclado
    /// ex. Opcode: EX9E
    isApertando : function (x) {
        if (Inputs.apertando &&
            Inputs.apertada === Registros.reg[x]) {
                return 4;
        }
        return 2;
    },

    /// TODO: fazer essa aqui
    /// ex. Opcode: EXA1
    isNotApertando : function(x) {
        if (Inputs.apertada !== Registros.reg[x]) {
                return 4;
        }
        return 2;
    },

    /// TODO: fazer essa aqui
    /// ex. Opcode: FX0A
    esperarTecla : function(x) {
        if (Inputs.apertando) {
            Registros.UpdateRegistradores(x, Inputs.apertada);
            return 2;
        }
        return 0;
    },


    // Timers
    /// ex. Opcode: FX07
    registraTimer : function(x) {
        Registros.UpdateRegistradores(x, Timer.DT);
        return 2;
    },

    /// ex. Opcode: FX15
    setTimer : function(x) {
        Timer.setDelay(Registros.reg[x]);
        return 2;
    },


    // Som
    /// ex. Opcode: FX18
    setSound : function(x) {
        Timer.setSom(Registros.reg[x]);
        return 2;
    },

    
    // Memória
    /// ex. Opcode: ANNN
    setIndico : function(nnn) {
        Memoria.UpdateIndice(nnn);
        return 2;
    },

    /// ex. Opcode: FX1E
    setAddIndice : function(x) {
        let temp = (Memoria.Indice + Registros.reg[x]) & 0xfff;
        Memoria.UpdateIndice(temp);
        return 2;
    },

    /// ex. Opcode: FX29
    registraIndice : function(x) {
        let pos = 0x50 + (Registros.reg[x] * 5);
        Memoria.UpdateIndice(pos);
        return 2;
    },

    /// ex. Opcode: FX33
    setBCD : function(x) {
        let pos1 = parseInt(Registros.reg[x] / 100);
        Memoria.pos[Memoria.Indice] = pos1;

        let pos2 = parseInt((Registros.reg[x]%100) / 10);
        Memoria.pos[Memoria.Indice+1] = pos2;

        let pos3 = parseInt(Registros.reg[x] % 10);
        Memoria.pos[Memoria.Indice+2] = pos3;

        return 2;
    },

    /// ex. Opcode: FX55
    save : function(x) { 
        for (let i = 0; i <= x; i++) {
            let pos = Registros.reg[i];
            Memoria.pos[Memoria.Indice+i] = pos;
        }
        return 2;
    },

    /// ex. Opcode: FX65
    load : function(x) { 
        let copia = [...Registros.reg];
        for (let i = 0; i <= x; i++)
            copia[i] = Memoria.pos[Memoria.Indice+i];
        Registros.UpdateRegistradoresArr(copia);
        return 2;
    }
}

export default Instrucoes;