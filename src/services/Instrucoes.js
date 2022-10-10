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
    // constantes e variaveis
    posicaoSub: 0x200,

    // Instruções e subrotinas
    /// ex. Opcode: ONNN
    Vazio : function(anterior) {
        return anterior + 0x002;
    },

    /// ex. Opcode: 00EE
    Retorna : function() {
        return this.posicaoSub;
    },

    /// ex. Opcode: 1NNN
    StrHex : function(x) {
        return Tratamento.HexPraInt(x);
    },

    /// ex. Opcode: 2NNN
    StrRot : function(x, instrucao) {
        this.posicaoSub = instrucao + 0x002;
        return Tratamento.HexPraInt(x);
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
    setAddop : function(indice, ope2, instrucao) { 
        //VF is set to 1 when there's a carry, and to 0 when there is not.
        let temp = (Registros.registradores[indice] + Registros.registradores[ope2]);
        if (temp > 255) {
            temp -= 256;
            Registros.UpdateRegistradores(15, 1);
        } else {
            Registros.UpdateRegistradores(15, 0);
        }
        Registros.UpdateRegistradores(indice, temp);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY5
    setSubop : function(indice, ope2, instrucao) {
        let temp = Registros.registradores[indice] - Registros.registradores[ope2];
        //VF is set to 0 when there's a borrow, and 1 when there is not.
        if (temp < 0) {
            temp = 0xff + temp;
            Registros.UpdateRegistradores(15, 1);
        } else {
            Registros.UpdateRegistradores(15, 0);
        }
        Registros.UpdateRegistradores(indice, temp);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY6
    setRightShift : function(indice, instrucao) {
        let temp = Registros.registradores[indice] >> 1;
        Registros.UpdateRegistradores(indice, temp);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY7
    setRestop : function(indice, ope2, instrucao){
        //VF is set to 0 when there's a borrow, and 1 when there is not.
        let temp = Registros.registradores[ope2] - Registros.registradores[indice];
        if (temp > 255) {
            Registros.UpdateRegistradores(15, 0);
        } else {
            Registros.UpdateRegistradores(15, 1);
        }
        Registros.UpdateRegistradores(indice, temp);
        return instrucao + 0x002;
    },
     
    /// ex. Opcode: 8XYE
    setLeftShift : function(indice, instrucao) {
        let temp = Registros.registradores[indice] << 1;
        Registros.UpdateRegistradores(indice, temp);
        return instrucao + 0x002;
    },
  
    // Condicionais
    setJump : function(op, ope1, valor, instrucao){
        switch(op[0]) {
            case '3':
                /// ex. Opcode: 3XNN
                if (Registros.registradores[ope1] === valor)
                    return instrucao + 0x004;
                return instrucao + 0x002;
            case '4':
                /// ex. Opcode: 4XNN
                if (Registros.registradores[ope1] !== valor)
                    return instrucao + 0x004;
                return instrucao + 0x002;
            case '5':
                /// ex. Opcode: 5XY0
                if (Registros.registradores[ope1] === Registros.registradores[valor])
                    return instrucao + 0x004;
                return instrucao+ 0x002;
            case '9':
                /// ex. Opcode: 9XY0
                if (Registros.registradores[ope1] !== Registros.registradores[valor])
                    return instrucao + 0x004;
                return instrucao + 0x002;
            default:
                return instrucao + 0x002;
        }
    },

    /// ex. Opcode: BNNN
    setNext : function(next){
        return next + Registros.registradores[0];
    },

    /// ex. Opcode: CXNN
    setRandom : function(indice, valor, anterior) {
        let temp = (Math.floor(Math.random() * 256) & valor) % 256;
        Registros.UpdateRegistradores(indice, temp);
        return anterior + 0x002;
    },
  

    // Display
    /// ex. Opcode: 00E0
    LimpaTela : function(anterior) {
        Display.LimpaTela();
        return anterior + 0x002;
    },

    /// ex. Opcode: DXYN
    Desenha : function (anterior, x, y, n, setRegistradores) {
        let vX = Registros.registradores[x];
        let vY = Registros.registradores[y];
        let sprite = [];
        for (let i = 0; i < n; i++) {
            sprite.push(Memoria.posicoes[Memoria.Indice+i].bin);
        }
        Display.UpdateDisplay(vX, vY, sprite, setRegistradores)
        return anterior + 0x002;
    },

    // Teclado
    /// ex. Opcode: EX9E
    isApertando : function (ope1, anterior) {
        if (Inputs.apertando &&
            Tratamento.HexPraInt(Inputs.apertada) === Registros.registradores[ope1]) {
                return anterior + 0x004;
        }
        return anterior + 0x002;
    },

    /// TODO: fazer essa aqui
    /// ex. Opcode: EXA1
    isNotApertando : function(ope1, anterior) {
        if (Tratamento.HexPraInt(Inputs.apertada) !== Registros.registradores[ope1]) {
                return anterior + 0x004;
        }
        return anterior + 0x002;
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