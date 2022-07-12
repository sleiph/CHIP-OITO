// constantes e variaveis
let registradores = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let display = Array.from(Array(32), () => Array.from(Array(64), () => 0));
let copiaDisplay = [...display];
let timer = 0;
let subtimer;
let go = true;

let sprites = [
    [ // um quadradinho
        [1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ],
    [ // um quadradão
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1]
    ],
    [ // space-invader só de exemplo
        [0,0,0,1,1,0,0,0],
        [0,0,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,0],
        [1,1,0,1,1,0,1,1],
        [1,1,1,1,1,1,1,1],
        [0,0,1,0,0,1,0,0],
        [0,1,0,1,1,0,1,0],
        [1,0,1,0,0,1,0,1]
    ]
] // esse arquivo ta ficando gigante

let posicao;

const Instrucoes = {
    redSignal : function (signal) {
        go = signal;
    },

    sendSignal : function(){
        return go;
    },
      
    // Melhoria de código
    UpdateRegistradores : function(copia, setRegistradores) {
        setRegistradores(copia);
        registradores = copia;
    },

    UpdateDisplay : function(setDisplay, sprite, x, y, n, copia) {
        for (let i=0; i<n; i++) {
            for (let j=0; j<8; j++) {
                if (display[(y+i)%32][(x+j)%64] != 0 && sprite) copia[15] = 1;
                display[(y+i)%32][(x+j)%64] = sprite[i][j]
            }
        }
        setDisplay(display);
    },
    
    updateTimer : function () {
        if (timer > 0){
            if (subtimer < 60)  subtimer++;
            else {
                subtimer = 0;
                timer--;
            }
        }
        console.log(timer);
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
    Desenha : function (anterior, x, y, n, setDisplay, setRegistradores) {
        let copia = [...registradores];
        let vX = registradores[x];
        let vY = registradores[y];
        copia[15] = 0;
        this.UpdateDisplay(setDisplay, sprites[0], vX, vY, n, copia)
        this.UpdateRegistradores(copia, setRegistradores);
        return anterior + 0x002;
    },


    // Teclado
    

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

    // Memória

}

export default Instrucoes;
