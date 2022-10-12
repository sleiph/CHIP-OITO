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
        return instrucao + 0x002;
    },

    /// ex. Opcode: 00EE
    Retorna : function() {
        return Memoria.Subrotina;
    },

    /// ex. Opcode: 1NNN
    StrHex : function(x) {
        return Tratamento.HexPraInt(x);
    },

    /// ex. Opcode: 2NNN
    StrRot : function(x, instrucao) {
        Memoria.Subrotina = instrucao + 0x002;
        return Tratamento.HexPraInt(x);
    },

    /// ex. Opcode: BNNN
    pulaPraNNN : function(nnn){
        return nnn + Registros.registradores[0];
    },


    // Variáveis
    /// ex. Opcode: 6XNN
    setRegistrar : function(indice, valor, instrucao) {
        Registros.UpdateRegistradores(indice, valor);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 7XNN
    setAdd : function(indice, valor, instrucao) {
        let temp = (Registros.registradores[indice] + valor) % 256;
        Registros.UpdateRegistradores(indice, temp);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY0
    setIgual : function(indice, ope2, instrucao){
        let temp = Registros.registradores[ope2];
        Registros.UpdateRegistradores(indice, temp);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY1
    setOR : function(indice, ope2, instrucao) {
        let temp = Registros.registradores[indice] | Registros.registradores[ope2];
        Registros.UpdateRegistradores(indice, temp);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY2
    setAND : function(indice, ope2, instrucao) {
        let temp = Registros.registradores[indice] & Registros.registradores[ope2];
        Registros.UpdateRegistradores(indice, temp);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY3
    setXOR : function(indice, ope2, instrucao) {
        let temp = Registros.registradores[indice] ^ Registros.registradores[ope2];
        Registros.UpdateRegistradores(indice, temp);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY4
    setAddop : function(x, y, instrucao) { 
        //VF is set to 1 when there's a carry, and to 0 when there is not.
        let soma = (Registros.registradores[x] += Registros.registradores[y]);
        if (soma > 0xFF) {
            soma -= 256;
            Registros.UpdateRegistradores(15, 1);
        } else
            Registros.UpdateRegistradores(15, 0);
        Registros.UpdateRegistradores(x, soma);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY5
    setSubop : function(x, y, instrucao) {
        let temp = Registros.registradores[x] - Registros.registradores[y];
        //VF is set to 0 when there's a borrow, and 1 when there is not.
        if (Registros.registradores[x] > Registros.registradores[y])
            Registros.UpdateRegistradores(15, 1);
        else
            Registros.UpdateRegistradores(15, 0);
        if (temp < 0)
            temp = 0xff + temp;
        Registros.UpdateRegistradores(x, temp);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY6
    setRightShift : function(x, instrucao) {
        let temp = Registros.registradores[x] >> 1;
        Registros.UpdateRegistradores(15, Registros.registradores[x] & 0x1);
        Registros.UpdateRegistradores(x, temp);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY7
    setRestop : function(x, y, instrucao){
        //VF is set to 0 when there's a borrow, and 1 when there is not.
        let temp = Registros.registradores[y] - Registros.registradores[x];
        if (Registros.registradores[y] > Registros.registradores[x])
            Registros.UpdateRegistradores(15, 1);
        else
            Registros.UpdateRegistradores(15, 0);
        if (temp < 0)
            temp = 0xff + temp;
        Registros.UpdateRegistradores(x, temp);
        return instrucao + 0x002;
    },
     
    /// ex. Opcode: 8XYE
    setLeftShift : function(indice, instrucao) {
        let temp = Registros.registradores[indice] << 1;
        Registros.UpdateRegistradores(indice, temp);
        return instrucao + 0x002;
    },

    /// ex. Opcode: CXNN
    setRandom : function(indice, valor, instrucao) {
        let temp = (Math.floor(Math.random() * 256) & valor) % 256;
        Registros.UpdateRegistradores(indice, temp);
        return instrucao + 0x002;
    },
  

    // Condicionais
    /// ex. Opcode: 3XNN
    skipXNNTrue: function(x, nn, instrucao) {
        if (Registros.registradores[x] === nn)
            return instrucao + 0x004;
        return instrucao + 0x002;
    },

    /// ex. Opcode: 4XNN
    skiptXNNFalse: function(x, nn, instrucao) {
        if (Registros.registradores[x] !== nn)
            return instrucao + 0x004;
        return instrucao + 0x002;
    },

    /// ex. Opcode: 5XY0
    skipXYTrue: function(x,y,instrucao) {
        if (Registros.registradores[x] === Registros.registradores[y])
            return instrucao + 0x004;
        return instrucao+ 0x002;
    },

    /// ex. Opcode: 9XY0
    skipXYFalse : function(x, y, instrucao){
        if (Registros.registradores[x] !== Registros.registradores[y])
            return instrucao + 0x004;
        return instrucao + 0x002;
    },
  

    // Display
    /// ex. Opcode: 00E0
    LimpaTela : function(instrucao) {
        Display.LimpaTela();
        return instrucao + 0x002;
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
    isApertando : function (ope1, instrucao) {
        if (Inputs.apertando &&
            Tratamento.HexPraInt(Inputs.apertada) === Registros.registradores[ope1]) {
                return instrucao + 0x004;
        }
        return instrucao + 0x002;
    },

    /// TODO: fazer essa aqui
    /// ex. Opcode: EXA1
    isNotApertando : function(ope1, instrucao) {
        if (Tratamento.HexPraInt(Inputs.apertada) !== Registros.registradores[ope1]) {
                return instrucao + 0x004;
        }
        return instrucao + 0x002;
    },

    /// TODO: fazer essa aqui
    /// ex. Opcode: FX0A
    esperarTecla : function(ope1, instrucao) {
        if (Inputs.apertando) {
            let temp = Inputs.apertada;
            Registros.UpdateRegistradores(ope1, temp);
            return instrucao + 0x002;
        }
        return instrucao;
    },


    // Timers
    /// ex. Opcode: FX07
    registraTimer : function(indice, instrucao) {
        let temp = Timer.DT;
        Registros.UpdateRegistradores(indice, temp);
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX15
    setTimer : function(ope1, instrucao) {
        Timer.setDelay(Registros.registradores[ope1]);
        return instrucao + 0x002;
    },


    // Som
    /// ex. Opcode: FX18
    setSound : function(ope1, instrucao) {
        Timer.setSom(Registros.registradores[ope1]);
        return instrucao + 0x002;
    },

    
    // Memória
    /// ex. Opcode: ANNN
    setIndico : function(x, instrucao) {
        Memoria.UpdateIndice(x);
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX1E
    setAddIndice : function(ope1, instrucao) {
        let temp = (Memoria.Indice + Registros.registradores[ope1]) % 4096;
        Memoria.UpdateIndice(temp);
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX29
    registraIndice : function(ope1, instrucao) {
        let x = Registros.registradores[ope1];
        let pos = 0x050 + (x*5);
        Memoria.UpdateIndice(pos);
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX33
    setBCD : function(vx, instrucao) {
        let x = Registros.registradores[vx].toString().padStart(3, '0');
        for (let i=0; i<3; i++) {
            let temp = parseInt(x[i]);
            let pos = {
                bin: Tratamento.IntPraBin(temp),
                hex: Tratamento.IntPraHex(temp)
            }
            Memoria.posicoes[Memoria.Indice+i] = pos;
        }
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX55
    save : function(ope1, instrucao) { 
        for (let i = 0; i <= ope1; i++) {
            let temp = Registros.registradores[i];
            let pos = {
                bin: Tratamento.IntPraBin(temp),
                hex: Tratamento.IntPraHex(temp)
            }
            Memoria.posicoes[Memoria.Indice+i] = pos;
        }
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX65
    load : function(ope1, instrucao) { 
        let copia = [...Registros.registradores];
        for (let i = 0; i <= ope1; i++) {
            copia[i] = Memoria.posicoes[Memoria.Indice+i].hex;
        }
        Registros.UpdateRegistradoresArr(copia);
        return instrucao + 0x002;
    }
}

export default Instrucoes;