import Display from './Display';
import Inputs from './Inputs';
import Memoria from './Memoria';
import Registros from './Registros';
import Timer from './Timer';
import Tratamento from './Tratamento';

/**
 * Instruções que serão usadas no disassembler
 */
const Instrucoes = {

    // Instruções e subrotinas
    /// ex. Opcode: ONNN
    Vazio : function(instrucao) {
        return instrucao + 2;
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
        return nnn + Registros.registradores[0];
    },


    // Variáveis
    /// ex. Opcode: 6XNN
    setRegistrar : function(x, nn, instrucao) {
        Registros.UpdateRegistradores(x, nn);
        return instrucao + 2;
    },

    /// ex. Opcode: 7XNN
    setAdd : function(x, nn, instrucao) {
        let temp = (Registros.registradores[x] + nn) & 0xff;
        Registros.UpdateRegistradores(x, temp);
        return instrucao + 2;
    },

    /// ex. Opcode: 8XY0
    setIgual : function(x, y, instrucao){
        Registros.UpdateRegistradores(x, Registros.registradores[y]);
        return instrucao + 2;
    },

    /// ex. Opcode: 8XY1
    setOR : function(x, y, instrucao) {
        let temp = Registros.registradores[x] | Registros.registradores[y];
        Registros.UpdateRegistradores(x, temp);
        return instrucao + 2;
    },

    /// ex. Opcode: 8XY2
    setAND : function(x, y, instrucao) {
        let temp = Registros.registradores[x] & Registros.registradores[y];
        Registros.UpdateRegistradores(x, temp);
        return instrucao + 2;
    },

    /// ex. Opcode: 8XY3
    setXOR : function(x, y, instrucao) {
        let temp = Registros.registradores[x] ^ Registros.registradores[y];
        Registros.UpdateRegistradores(x, temp);
        return instrucao + 2;
    },

    /// ex. Opcode: 8XY4
    setAddop : function(x, y, instrucao) { 
        let soma = (Registros.registradores[x] += Registros.registradores[y]);
        if (soma > 0xFF) {
            soma -= 256;
            Registros.UpdateRegistradores(15, 1);
        } else
            Registros.UpdateRegistradores(15, 0);
        Registros.UpdateRegistradores(x, soma);
        return instrucao + 2;
    },

    /// ex. Opcode: 8XY5
    setSubop : function(x, y, instrucao) {
        let temp = Registros.registradores[x] - Registros.registradores[y];
        if (Registros.registradores[x] > Registros.registradores[y])
            Registros.UpdateRegistradores(15, 1);
        else
            Registros.UpdateRegistradores(15, 0);
        if (temp < 0)
            temp = 0xff + temp;
        Registros.UpdateRegistradores(x, temp);
        return instrucao + 2;
    },

    /// ex. Opcode: 8XY6
    setRightShift : function(x, instrucao) {
        let temp = Registros.registradores[x] >> 1;
        Registros.UpdateRegistradores(15, Registros.registradores[x] & 0x1);
        Registros.UpdateRegistradores(x, temp);
        return instrucao + 2;
    },

    /// ex. Opcode: 8XY7
    setRestop : function(x, y, instrucao){
        let temp = Registros.registradores[y] - Registros.registradores[x];
        if (Registros.registradores[y] > Registros.registradores[x])
            Registros.UpdateRegistradores(15, 1);
        else
            Registros.UpdateRegistradores(15, 0);
        if (temp < 0)
            temp = 0xff + temp;
        Registros.UpdateRegistradores(x, temp);
        return instrucao + 2;
    },
     
    /// ex. Opcode: 8XYE
    setLeftShift : function(x, instrucao) {
        let temp = Registros.registradores[x] << 1;
        Registros.UpdateRegistradores(15, Registros.registradores[x] & 0x80);
        Registros.UpdateRegistradores(x, temp);
        return instrucao + 2;
    },

    /// ex. Opcode: CXNN
    setRandom : function(indice, valor, instrucao) {
        let temp = (Math.floor(Math.random() * 0xFF) & valor) & 0xFF;
        Registros.UpdateRegistradores(indice, temp);
        return instrucao + 2;
    },
  

    // Condicionais
    /// ex. Opcode: 3XNN
    skipXNNTrue: function(x, nn, instrucao) {
        if (Registros.registradores[x] === nn)
            return instrucao + 4;
        return instrucao + 2;
    },

    /// ex. Opcode: 4XNN
    skiptXNNFalse: function(x, nn, instrucao) {
        if (Registros.registradores[x] !== nn)
            return instrucao + 4;
        return instrucao + 2;
    },

    /// ex. Opcode: 5XY0
    skipXYTrue: function(x,y,instrucao) {
        if (Registros.registradores[x] === Registros.registradores[y])
            return instrucao + 4;
        return instrucao + 2;
    },

    /// ex. Opcode: 9XY0
    skipXYFalse : function(x, y, instrucao) {
        if (Registros.registradores[x] !== Registros.registradores[y])
            return instrucao + 4;
        return instrucao + 2;
    },
  

    // Display
    /// ex. Opcode: 00E0
    LimpaTela : function(instrucao) {
        Display.LimpaTela();
        return instrucao + 2;
    },

    /// ex. Opcode: DXYN
    Desenha : function (x, y, n, instrucao) {
        let vX = Registros.registradores[x];
        let vY = Registros.registradores[y];
        let sprite = [];
        for (let i = 0; i < n; i++) {
            sprite.push(Memoria.posicoes[Memoria.Indice+i].bin);
        }
        Display.UpdateDisplay(vX, vY, sprite)
        return instrucao + 0x002;
    },


    // Teclado
    /// ex. Opcode: EX9E
    isApertando : function (x, instrucao) {
        if (Inputs.apertando &&
            Inputs.apertada === Registros.registradores[x]) {
                return instrucao + 4;
        }
        return instrucao + 2;
    },

    /// TODO: fazer essa aqui
    /// ex. Opcode: EXA1
    isNotApertando : function(x, instrucao) {
        if (Inputs.apertada !== Registros.registradores[x]) {
                return instrucao + 4;
        }
        return instrucao + 2;
    },

    /// TODO: fazer essa aqui
    /// ex. Opcode: FX0A
    esperarTecla : function(x, instrucao) {
        if (Inputs.apertando) {
            Registros.UpdateRegistradores(x, Inputs.apertada);
            return instrucao + 2;
        }
        return instrucao;
    },


    // Timers
    /// ex. Opcode: FX07
    registraTimer : function(x, instrucao) {
        Registros.UpdateRegistradores(x, Timer.DT);
        return instrucao + 2;
    },

    /// ex. Opcode: FX15
    setTimer : function(x, instrucao) {
        Timer.setDelay(Registros.registradores[x]);
        return instrucao + 2;
    },


    // Som
    /// ex. Opcode: FX18
    setSound : function(x, instrucao) {
        Timer.setSom(Registros.registradores[x]);
        return instrucao + 2;
    },

    
    // Memória
    /// ex. Opcode: ANNN
    setIndico : function(nnn, instrucao) {
        Memoria.UpdateIndice(nnn);
        return instrucao + 2;
    },

    /// ex. Opcode: FX1E
    setAddIndice : function(x, instrucao) {
        let temp = (Memoria.Indice + Registros.registradores[x]) & 0xfff;
        Memoria.UpdateIndice(temp);
        return instrucao + 2;
    },

    /// ex. Opcode: FX29
    registraIndice : function(x, instrucao) {
        let pos = 0x50 + (Registros.registradores[x] * 5);
        Memoria.UpdateIndice(pos);
        return instrucao + 2;
    },

    /// ex. Opcode: FX33
    setBCD : function(x, instrucao) {
        let pos1 = parseInt(Registros.registradores[x] / 100);
        Memoria.posicoes[Memoria.Indice] = Memoria.CriaPosicao(pos1);

        let pos2 = parseInt((Registros.registradores[x]%100) / 10);
        Memoria.posicoes[Memoria.Indice+1] = Memoria.CriaPosicao(pos2);

        let pos3 = parseInt(Registros.registradores[x] % 10);
        Memoria.posicoes[Memoria.Indice+2] = Memoria.CriaPosicao(pos3);

        return instrucao + 2;
    },

    /// ex. Opcode: FX55
    save : function(x, instrucao) { 
        for (let i = 0; i <= x; i++) {
            let temp = Registros.registradores[i];
            let pos = Memoria.CriaPosicao(temp);
            Memoria.posicoes[Memoria.Indice+i] = pos;
        }
        return instrucao + 2;
    },

    /// ex. Opcode: FX65
    load : function(x, instrucao) { 
        let copia = [...Registros.registradores];
        for (let i = 0; i <= x; i++) {
            copia[i] = Tratamento.HexPraInt(Memoria.posicoes[Memoria.Indice+i].hex);
        }
        Registros.UpdateRegistradoresArr(copia);
        return instrucao + 2;
    }
}

export default Instrucoes;