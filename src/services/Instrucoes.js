import guns from '../data/Guns_N_Roses_Paradise_City.mp3';
import Memoria from './Memoria';
import Tratamento from './Tratamento';

// constantes e variaveis
let registradores = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let saveState = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let display = Array.from(Array(32), () => Array.from(Array(64), () => 0));
let Indice = 0;
let copiaDisplay = [...display];
let timer = 0;
let soundtimer = 0;
let wait = false;
let apertando = false;
const sound = new Audio(guns);

let posicao;

/**
 * Instruções que serão usadas no disassembler
 */
const Instrucoes = {
      
    // Melhoria de código
    UpdateRegistradores : function(copia, setRegistradores) {
        setRegistradores(copia);
        registradores = copia;
    },

    UpdateDisplay : function(x, y, sprite, setDisplay, setRegistradores) {
        let copiaRegs = [...registradores];
        let isUnset = false;

        for (let i=0; i<sprite.length; i++) {
            for (let j=0; j<sprite[i].length; j++) {
                if (x+j < 64 && y+i < 32) {
                    let original = parseInt(display[y+i][x+j]);
                    display[y+i][x+j] = parseInt(sprite[i][j]);
                    // VF is set to 1 if any screen pixels are flipped from set to unset when the sprite is drawn,
                    if (original === 1 && sprite[i][j] === 0)
                        isUnset = true;
                }
            }
        }
        //and to 0 if that does not happen
        copiaRegs[15] = isUnset ? 1 : 0;
        setDisplay(display);
        this.UpdateRegistradores(copiaRegs, setRegistradores);
    },
    
    updateTimer : function () {
        if (timer > 0) timer--;

        if (soundtimer > 0){
            sound.play()
            soundtimer--;
        } else sound.pause();
        return timer;
    },

    // Instruções e subrotinas
    /// ex. Opcode: ONNN
    Vazio : function(anterior) {
        return anterior + 0x002;
    },

    /// ex. Opcode: 00EE
    Retorna : function() {
        return posicao;
    },

    /// ex. Opcode: 1NNN
    StrHex : function(x) {
        return Tratamento.HexPraInt(x);
    },

    /// ex. Opcode: 2NNN
    StrRot : function(x, instrucao) {
        posicao = instrucao + 0x002;
        return Tratamento.HexPraInt(x);
    },

    show : function() {
      console.log("Timer: " + timer)
    },


    // Variáveis
    /// ex. Opcode: 6XNN
    setRegistrar : function(ope1, valor, instrucao, setRegistradores) {
        //sound.play()
        let copia = [...registradores];
        copia[ope1] = valor;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 7XNN
    setAdd : function(ope1, valor, instrucao, setRegistradores) {
        let copia = [...registradores];
        copia[ope1] = (copia[ope1] + valor) % 256;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY0
    setIgual : function(ope1, ope2, instrucao, setRegistradores){
        let copia = [...registradores];
        copia[ope1] = copia[ope2];
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY1
    setOR : function(ope1, ope2, instrucao, setRegistradores) {
        let copia = [...registradores];
        copia[ope1] = (Tratamento.HexPraInt(copia[ope1]) | Tratamento.HexPraInt(copia[ope2])) % 256;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY2
    setAND : function(ope1, ope2, instrucao, setRegistradores) {
        let copia = [...registradores];
        let duo = (Tratamento.HexPraInt(copia[ope1]) & Tratamento.HexPraInt(copia[ope2]))  % 256;
        copia[ope1] = duo;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY3
    setXOR : function(ope1, ope2, instrucao, setRegistradores) {
        let copia = [...registradores];
        let duo = (Tratamento.HexPraInt(copia[ope1]) ^ Tratamento.HexPraInt(copia[ope2]) % 256);
        copia[ope1] = duo;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY4
    setAddop : function(ope1, ope2, instrucao, setRegistradores) { 
        //VF is set to 1 when there's a carry, and to 0 when there is not.
        let copia = [...registradores];
        if (copia[ope1] + copia[ope2] > Tratamento.HexPraInt(255)) {
            copia[15] = 1;
        } else {
            copia[15] = 0;
        }
        copia[ope1] = (copia[ope1] + copia[ope2]) % 256;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY5
    setSubop : function(ope1, ope2, instrucao, setRegistradores) {
        let copia = [...registradores];
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
        let copia = [...registradores];
        copia[ope1] = Tratamento.HexPraInt(copia[ope1]) >> 1;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY7
    setRestop : function(ope1, ope2, instrucao, setRegistradores){
        //VF is set to 0 when there's a borrow, and 1 when there is not.
        let copia = [...registradores];
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
        let copia = [...registradores];
        copia[ope1] = Tratamento.HexPraInt(copia[ope1]) << 1;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },
  
    // Condicionais
    setJump : function(op, ope1, valor, instrucao){
        switch(op[0]) {
            case '3':
                /// ex. Opcode: 3XNN
                if (registradores[ope1] === valor) {
                    return instrucao + 0x004;
                }
                return instrucao + 0x002;
            case '4':
                /// ex. Opcode: 4XNN
                if (registradores[ope1] !== valor) {
                    return instrucao + 0x004;
                }
                return instrucao + 0x002;
            case '5':
                /// ex. Opcode: 5XY5
                if (registradores[ope1] === registradores[valor]) {
                    return instrucao + 0x004;
                }
                return instrucao+ 0x002;
            case '9':
                /// ex. Opcode: 9XY0
                if (registradores[ope1] !== registradores[valor]) {
                    return instrucao + 0x004;
                }
                return instrucao + 0x002;
            default:
                return instrucao + 0x002;
        }
    },

    /// ex. Opcode: BNNN
    setNext : function(next){
        return next + registradores[0];
    },

    /// ex. Opcode: CXNN
    setRandom : function(ope1, valor, instrucao, setRegistradores) {
        let copia = [...registradores];
        copia[ope1] = (Math.floor(Math.random() * 256) & valor) % 256;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },
  

    // Display
    /// ex. Opcode: 00E0
    LimpaTela : function(anterior, setDisplay) {
        setDisplay(copiaDisplay);
        return anterior + 0x002;
    },

    /// ex. Opcode: DXYN
    Desenha : function (anterior, x, y, n, setDisplay, setRegistradores) {
        let vX = registradores[x]-1;
        let vY = registradores[y]-1;
        let sprite = [];
        for (let i = 0; i < n; i++) {
            try {
                sprite.push(Memoria.posicoes[Indice].bin);
            } catch (e) {
                console.log("Índice desconhecido da memória: " + Indice);
                sprite.push('10000000');
            }
            
        }
        this.UpdateDisplay(vX, vY, sprite, setDisplay, setRegistradores)
        return anterior + 0x002;
    },

    // Teclado
    registraTecla() {
        if (wait) apertando = true;
    },

    // Timers
    /// ex. Opcode: FX07
    registraTimer : function(ope1, instrucao, setRegistradores){
        let copia = [...registradores];
        copia[ope1] = timer;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX15
    setTimer : function(ope1, instrucao){
        timer = registradores[ope1];
        return instrucao + 0x002;
    },

    // Som
    /// ex. Opcode: FX18
    setSound : function(ope1, instrucao){
        soundtimer = registradores[ope1];
        return instrucao + 0x002;
    },

    // Memória
    /// ex. Opcode: ANNN
    setIndico : function(x, instrucao, setIndice){
        Indice = x;
        setIndice(Indice);
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX1E
    setAddIndice : function(ope1, instrucao, setIndice) {
        Indice = (Indice + registradores[ope1]) % 4096;
        setIndice(Indice);
        return instrucao + 0x002;
    },

    aperta : function(ope1, instrucao) { // há duvidas aqui 
        wait = true;
        if (apertando === false)
            return instrucao;
        wait = false;
        apertando = false;
        //savebutton = registradores[ope1];
        return instrucao + 0x002;  
    },

    /// ex. Opcode: FX29
    registraIndice : function(ope1, instrucao, setIndice) {
        Indice = registradores[ope1];
        setIndice(Indice);
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX33
    setBCD : function(ope1, instrucao, setIndice) {
        const indicando = registradores[ope1].toString().split('');

        const indicado = indicando.map(str => {
            return Number(str);
        });

        if (indicado.lenght >= 3) {
            Indice[0] = indicado[0];
            Indice[1] = indicado[1];   
            Indice[2] = indicado[2];  
        } else {
            Indice[0] =  0;
            if (indicado.lenght === 2) {
                Indice[1] = indicado[0]; 
                Indice[2] = indicado[1]; 
            } else {
                Indice[1] = 0; 
                Indice[2] = indicado[0]; 
            } 
        }

        setIndice(Indice);
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX55
    save : function(ope1, instrucao, setIndice) { 
        for (let i = 0; i <= ope1; i++) {
            saveState[i] = registradores[i];
        }
        setIndice(Indice);
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX65
    load : function(ope1, instrucao, setRegistradores) { 
        let copia = [...registradores];
        for (let i = 0; i <= ope1; i++) {
            copia[i] = saveState[i];
        }
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    }
}

export default Instrucoes;
