import Display from './Display';
import Inputs from './Inputs';
import Memoria from './Memoria';
import Timer from './Timer';
import Tratamento from './Tratamento';

/**
 * Instruções que serão usadas no disassembler
 */
const Instrucoes = {
    // constantes e variaveis
    registradores: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    posicaoSub: 0x200,
      
    // Melhoria de código
    UpdateRegistradores : function(copia, setRegistradores) {
        setRegistradores(copia);
        this.registradores = copia;
    },

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
    setRegistrar : function(ope1, valor, instrucao, setRegistradores) {
        let copia = [...this.registradores];
        copia[ope1] = valor;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 7XNN
    setAdd : function(ope1, valor, instrucao, setRegistradores) {
        let copia = [...this.registradores];
        copia[ope1] = (copia[ope1] + valor) % 256;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY0
    setIgual : function(ope1, ope2, instrucao, setRegistradores){
        let copia = [...this.registradores];
        copia[ope1] = copia[ope2];
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY1
    setOR : function(ope1, ope2, instrucao, setRegistradores) {
        let copia = [...this.registradores];
        copia[ope1] = (Tratamento.HexPraInt(copia[ope1]) | Tratamento.HexPraInt(copia[ope2])) % 256;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY2
    setAND : function(ope1, ope2, instrucao, setRegistradores) {
        let copia = [...this.registradores];
        let duo = copia[ope1] & copia[ope2];
        copia[ope1] = duo;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY3
    setXOR : function(ope1, ope2, instrucao, setRegistradores) {
        let copia = [...this.registradores];
        let duo = (Tratamento.HexPraInt(copia[ope1]) ^ Tratamento.HexPraInt(copia[ope2]) % 256);
        copia[ope1] = duo;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY4
    setAddop : function(ope1, ope2, instrucao, setRegistradores) { 
        //VF is set to 1 when there's a carry, and to 0 when there is not.
        let copia = [...this.registradores];
        copia[ope1] = (copia[ope1] + copia[ope2]);
        if (copia[ope1] > 255) {
            copia[ope1] -= 256;
            copia[15] = 1;
        } else {
            copia[15] = 0;
        }
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY5
    setSubop : function(ope1, ope2, instrucao, setRegistradores) {
        let copia = [...this.registradores];
        copia[ope1] -= copia[ope2];
        //VF is set to 0 when there's a borrow, and 1 when there is not.
        if (copia[ope1] < 0) {
            copia[ope1] = 0xff + copia[ope1];
            copia[15] = 1;
        } else {
            copia[15] = 0;
        }
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY6
    setRightShift : function(ope1, instrucao, setRegistradores) {
        let copia = [...this.registradores];
        copia[ope1] = Tratamento.HexPraInt(copia[ope1]) >> 1;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY7
    setRestop : function(ope1, ope2, instrucao, setRegistradores){
        //VF is set to 0 when there's a borrow, and 1 when there is not.
        let copia = [...this.registradores];
        copia[ope1] = copia[ope2] - copia[ope1];
        if (copia[ope1] > Tratamento.HexPraInt(255)) {
            copia[15] = 0;
        } else {
            copia[15] = 1;
        }
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },
     
    /// ex. Opcode: 8XYE
    setLeftShift : function(ope1, instrucao, setRegistradores) {
        let copia = [...this.registradores];
        copia[ope1] = Tratamento.HexPraInt(copia[ope1]) << 1;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },
  
    // Condicionais
    setJump : function(op, ope1, valor, instrucao){
        switch(op[0]) {
            case '3':
                /// ex. Opcode: 3XNN
                if (this.registradores[ope1] === valor) {
                    return instrucao + 0x004;
                }
                return instrucao + 0x002;
            case '4':
                /// ex. Opcode: 4XNN
                if (this.registradores[ope1] !== valor) {
                    return instrucao + 0x004;
                }
                return instrucao + 0x002;
            case '5':
                /// ex. Opcode: 5XY0
                if (this.registradores[ope1] === this.registradores[valor]) {
                    return instrucao + 0x004;
                }
                return instrucao+ 0x002;
            case '9':
                /// ex. Opcode: 9XY0
                if (this.registradores[ope1] !== this.registradores[valor]) {
                    return instrucao + 0x004;
                }
                return instrucao + 0x002;
            default:
                return instrucao + 0x002;
        }
    },

    /// ex. Opcode: BNNN
    setNext : function(next){
        return next + this.registradores[0];
    },

    /// ex. Opcode: CXNN
    setRandom : function(ope1, valor, anterior, setRegistradores) {
        let copia = [...this.registradores];
        copia[ope1] = (Math.floor(Math.random() * 256) & valor) % 256;
        this.UpdateRegistradores(copia, setRegistradores);
        return anterior + 0x002;
    },
  

    // Display
    /// ex. Opcode: 00E0
    LimpaTela : function(anterior, setDisplay) {
        setDisplay(Display.original);
        return anterior + 0x002;
    },

    /// ex. Opcode: DXYN
    Desenha : function (anterior, x, y, n, setDisplay, setRegistradores) {
        let vX = this.registradores[x];
        let vY = this.registradores[y];
        let sprite = [];
        for (let i = 0; i < n; i++) {
            try {
                sprite.push(Memoria.posicoes[Memoria.Indice+i].bin);
            } catch (e) {
                console.log("Índice desconhecido da memória: " + Memoria.Indice);
                sprite.push('10000000');
            }
        }
        Display.UpdateDisplay(vX, vY, sprite, setDisplay, setRegistradores)
        return anterior + 0x002;
    },

    // Teclado
    /// ex. Opcode: EX9E
    isApertando : function (ope1, anterior) {
        if (Inputs.apertando &&
            Tratamento.HexPraInt(Inputs.apertada) === this.registradores[ope1]) {
                return anterior + 0x004;
        }
        return anterior + 0x002;
    },

    /// TODO: fazer essa aqui
    /// ex. Opcode: EXA1
    isNotApertando : function(ope1, anterior) {
        if (Tratamento.HexPraInt(Inputs.apertada) !== this.registradores[ope1]) {
                return anterior + 0x004;
        }
        return anterior + 0x002;
    },

    /// TODO: fazer essa aqui
    /// ex. Opcode: FX0A
    esperarTecla : function(ope1, instrucao) {
        Inputs.redSignal();
        return instrucao + 0x002;
    },

    // Timers
    /// ex. Opcode: FX07
    registraTimer : function(ope1, instrucao, setRegistradores) {
        let copia = [...this.registradores];
        copia[ope1] = Timer.DT;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX15
    setTimer : function(ope1, instrucao, setTimers) {
        Timer.DT = this.registradores[ope1];
        Timer.setHook(setTimers);
        return instrucao + 0x002;
    },

    // Som
    /// ex. Opcode: FX18
    setSound : function(ope1, instrucao, setTimers) {
        Timer.ST = this.registradores[ope1];
        Timer.setHook(setTimers);
        return instrucao + 0x002;
    },

    // Memória
    /// ex. Opcode: ANNN
    setIndico : function(x, instrucao, setIndice){
        Memoria.Indice = x;
        setIndice(Memoria.Indice);
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX1E
    setAddIndice : function(ope1, instrucao, setIndice) {
        Memoria.Indice = (Memoria.Indice + this.registradores[ope1]) % 4096;
        setIndice(Memoria.Indice);
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX29
    registraIndice : function(ope1, instrucao, setIndice) {
        let x = this.registradores[ope1];
        let pos = 0x050 + (x*5);
        Memoria.Indice = pos;
        setIndice(Memoria.Indice);
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX33
    setBCD : function(vx, instrucao) {
        let x = this.registradores[vx].toString().padStart(3, '0');
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
            let temp = this.registradores[i];
            let pos = {
                bin: Tratamento.IntPraBin(temp),
                hex: Tratamento.IntPraHex(temp)
            }
            Memoria.posicoes[Memoria.Indice+i] = pos;
        }
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX65
    load : function(ope1, instrucao, setRegistradores) { 
        let copia = [...this.registradores];
        for (let i = 0; i <= ope1; i++) {
            copia[i] = Memoria.posicoes[Memoria.Indice+i].hex;
        }
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    }
}

export default Instrucoes;
