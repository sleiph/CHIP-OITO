import guns from '../data/Guns_N_Roses_Paradise_City.mp3';
// constantes e variaveis
let registradores = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let saveState = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let display = Array.from(Array(32), () => Array.from(Array(64), () => 0));
let Indice = 0;
let copiaDisplay = [...display];
let timer = 0;
let subtimer;
let soundtimer = 0;
let soundsubtimer;
let save;
let wait = false;
let apertando = false;
const sound = new Audio(guns);

let sprites = [
    [ // 0x0
        [1,1,1,1,0,0,0,0],
        [1,0,0,1,0,0,0,0],
        [1,0,0,1,0,0,0,0],
        [1,0,0,1,0,0,0,0],
        [1,1,1,1,0,0,0,0]
    ],
    [ // 0x1
        [0,1,1,0,0,0,0,0],
        [0,0,1,0,0,0,0,0],
        [0,0,1,0,0,0,0,0],
        [0,0,1,0,0,0,0,0],
        [0,1,1,1,0,0,0,0]
    ],
    [ // 0x2
        [1,1,1,1,0,0,0,0],
        [0,0,0,1,0,0,0,0],
        [1,1,1,1,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,1,1,1,0,0,0,0]
    ],
    [ // 0x3
        [1,1,1,1,0,0,0,0],
        [0,0,0,1,0,0,0,0],
        [1,1,1,1,0,0,0,0],
        [0,0,0,1,0,0,0,0],
        [1,1,1,1,0,0,0,0]
    ],
    [ // 0x4
        [1,0,1,0,0,0,0,0],
        [1,0,1,0,0,0,0,0],
        [1,1,1,1,0,0,0,0],
        [0,0,1,0,0,0,0,0],
        [0,0,1,0,0,0,0,0]
    ],
    [ // 0x5
        [1,1,1,1,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,1,1,1,0,0,0,0],
        [0,0,0,1,0,0,0,0],
        [1,1,1,1,0,0,0,0]
    ],
    [ // 0x6
        [1,1,1,1,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,1,1,1,0,0,0,0],
        [1,0,0,1,0,0,0,0],
        [1,1,1,1,0,0,0,0]
    ],
    [ // 0x7
        [1,1,1,1,0,0,0,0],
        [0,0,0,1,0,0,0,0],
        [0,0,0,1,0,0,0,0],
        [0,0,0,1,0,0,0,0],
        [0,0,0,1,0,0,0,0]
    ],
    [ // 0x8
        [1,1,1,1,0,0,0,0],
        [1,0,0,1,0,0,0,0],
        [1,1,1,1,0,0,0,0],
        [1,0,0,1,0,0,0,0],
        [1,1,1,1,0,0,0,0]
    ],
    [ // 0x9
        [1,1,1,1,0,0,0,0],
        [1,0,0,1,0,0,0,0],
        [1,1,1,1,0,0,0,0],
        [0,0,0,1,0,0,0,0],
        [1,1,1,1,0,0,0,0]
    ],
    [ // 0xA
        [1,1,1,1,0,0,0,0],
        [1,0,0,1,0,0,0,0],
        [1,1,1,1,0,0,0,0],
        [1,0,0,1,0,0,0,0],
        [1,0,0,1,0,0,0,0]
    ],
    [ // 0xB
        [1,1,1,1,0,0,0,0],
        [1,0,0,1,0,0,0,0],
        [0,1,1,1,0,0,0,0],
        [0,1,0,1,0,0,0,0],
        [1,1,1,1,0,0,0,0]
    ],
    [ // 0xC
        [1,1,1,1,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,1,1,1,0,0,0,0]
    ],
    [ // 0xD
        [1,1,1,1,0,0,0,0],
        [0,1,0,1,0,0,0,0],
        [0,1,0,1,0,0,0,0],
        [0,1,0,1,0,0,0,0],
        [1,1,1,1,0,0,0,0]
    ],
    [ // 0xE
        [1,1,1,1,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,1,1,1,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,1,1,1,0,0,0,0]
    ],
    [ // 0xF
        [1,1,1,1,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,1,1,1,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0]
    ]
]

let posicao;

const Instrucoes = {
      
    // Melhoria de código
    UpdateRegistradores : function(copia, setRegistradores) {
        setRegistradores(copia);
        registradores = copia;
    },

    UpdateDisplay : function(setDisplay, sprite, x, y, n, setRegistradores) {
        let copia = [...registradores];
        console.log(sprite);
        for (let i=0; i<n; i++) {
            for (let j=0; j<8; j++) {
                if (display[(y+i)%32][(x+j)%64] === 1 && sprite[i][j] === 1) {
                    display[(y+i)%32][(x+j)%64] = 0;
                    copia[15] = 1;
                } else if (display[(y+i)%32][(x+j)%64] === 0 && sprite[i][j] === 1) {
                    display[(y+i)%32][(x+j)%64] = 1;
                    copia[15] = 0;
                }
            }
        }
        setDisplay(display);
        this.UpdateRegistradores(copia, setRegistradores);
    },
    
    updateTimer : function () {
        if (timer > 0){
            if (subtimer < 60)  subtimer++;
            else {
                subtimer = 0;
                timer--;
            }
        }

        if (soundtimer > 0){
            sound.play()
            if (soundsubtimer < 60)  soundsubtimer++;
            else {
                soundsubtimer = 0;
                soundtimer--;
                if (soundtimer <= 0) sound.pause();
            }
        } 
        console.log(soundtimer);
        return timer;
    },

    updateOps : function(ops){
        let sprite = [];
        for (let k = 0; k < ops.length; k++){
            let separador = ops[k].split("");
            let retorno = [];
            for (let i = 0; i < separador.length; i++) {
                separador[i] = parseInt(separador[i], 16).toString(2).padStart(4 ,'0');
                if (separador[i].length > 0) {
                    for(let j = 0; j < separador[i].length; j++) {
                        const temp= separador[i];
                        retorno.push(parseInt(temp[j]));
                    }
                }
                else retorno.push(parseInt(separador[i]));
            }
            sprite.push(retorno);
        }
        return sprite;
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
        return parseInt(x, 16);
    },

    /// ex. Opcode: 2NNN
    StrRot : function(x, instrucao) {
        posicao = instrucao + 0x002;
        return parseInt(x, 16);
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
        copia[ope1] = (copia[ope1] + valor) %256;
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
        copia[ope1] = (parseInt(copia[ope1], 16) | parseInt(copia[ope2], 16)) % 256;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY2
    setAND : function(ope1, ope2, instrucao, setRegistradores) {
        let copia = [...registradores];
        let duo = (parseInt(copia[ope1], 16) & parseInt(copia[ope2], 16))  % 256;
        copia[ope1] = duo;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY3
    setXOR : function(ope1, ope2, instrucao, setRegistradores) {
        let copia = [...registradores];
        let duo = (parseInt(copia[ope1], 16) ^ parseInt(copia[ope2], 16) % 256);
        copia[ope1] = duo;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY4
    setAddop : function(ope1, ope2, instrucao, setRegistradores) { 
        //VF is set to 1 when there's a carry, and to 0 when there is not.
        let copia = [...registradores];
        console.log('foi1');
        if (copia[ope1] + copia[ope2] > parseInt(255, 16)) {
            copia[15] = parseInt(1, 16);
        } else{
            copia[15] = 0;
        }
        copia[ope1] += copia[ope2] % 256;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY5
    setSubop : function(ope1, ope2, instrucao, setRegistradores) { 
        //VF is set to 0 when there's a borrow, and 1 when there is not.
        let copia = [...registradores];
        console.log('foi2');
        if (copia[ope1] - copia[ope2] < 0) {
            copia[ope1] = 256% copia[ope2];
            copia[15] = 1;            
        } else {
            copia[ope1] -= copia[ope2];
            copia[15] = 0;   
        }
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY6   
    setRightShift : function(ope1, instrucao, setRegistradores) {
        let copia = [...registradores];
        copia[ope1] = parseInt(copia[ope1], 16) >> 1;
        this.UpdateRegistradores(copia, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY7
    setRestop : function(ope1, ope2, instrucao, setRegistradores){
        //VF is set to 0 when there's a borrow, and 1 when there is not.
        let copia = [...registradores];
        console.log('foi3');
        copia[ope1] = copia[ope2] - copia[ope1];
        if (copia[ope1] > parseInt(255, 16)) {
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
        copia[ope1] = parseInt(copia[ope1], 16) << 1;
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
        copia[ope1] = (Math.floor(Math.random(2) * 256) & valor) % 256;
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
    Desenha : function (anterior, x, y, n, setDisplay, setRegistradores, ops) {
        let vX = registradores[x];
        let vY = registradores[y];
        let nemo = [];
        for (let i = 0; i < 16; i+=2) {
            if (ops[Indice + i] !== undefined && ops[Indice + i] !== null)
                nemo.push(ops[Indice + i]);
            else nemo.push("8000");
        }
        const opsx = this.updateOps(nemo);
        this.UpdateDisplay(setDisplay, opsx, vX, vY, n, setRegistradores)
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
        if (x === 700 || x === 1792)
            console.log(x);
        Indice = x;
        setIndice(Indice);
        return instrucao + 0x002;
    },

    /// ex. Opcode: FX1E
    registraIndice : function(ope1, instrucao, setIndice) {
        Indice = registradores[ope1];
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
    setAddIndice : function(ope1, instrucao, setIndice) {
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
