// constantes e variaveis
let copiadora = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let display = Array.from(Array(32), () => Array.from(Array(64), () => 0));
let copiaDisplay = [...display];

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
        [1,0,1,0,0,1,0,1],
    ],
] // esse arquivo ta ficando gigante

let posicao;

const Instrucoes = {

    // Melhoria de código
    UpdateRegistradores : function(copia, copiadora, setRegistradores) {
        for (let i = 0; i < 16; i++) {
            copia[i] = copiadora[i];
        }
        setRegistradores(copia);
    },
    UpdateDisplay : function(setDisplay, sprite, x, y, n) {
        for (let i=0; i<n; i++) {
            for (let j=0; j<8; j++) {
                display[(y+i)%32][(x+j)%64] = sprite[i][j]
            }
        }
        setDisplay(display);
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
    setRegistrar : function(ope1, valor, instrucao, registradores, setRegistradores) {
        let copia = [...registradores];
        copiadora[ope1] = valor;
        console.log(ope1, valor );
        this.UpdateRegistradores(copia, copiadora, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 7XNN
    setAdd : function(ope1, valor, instrucao, setRegistradores) {
        copiadora[ope1] = (copiadora[ope1] + valor) %256;
        this.UpdateRegistradores([], copiadora, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY0
    setIgual : function(ope1, ope2, instrucao, registradores, setRegistradores){
        let copia = [...registradores];
        copiadora[ope1] = copiadora[ope2];
        this.UpdateRegistradores(copia, copiadora, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY1
    setOR : function(ope1, ope2, instrucao, registradores, setRegistradores) {
        let copia = [...registradores];
        copiadora[ope1] = (parseInt(copiadora[ope1], 16) | parseInt(copiadora[ope2], 16)) % 256;
        this.UpdateRegistradores(copia, copiadora, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY2
    setAND : function(ope1, ope2, instrucao, registradores, setRegistradores) {
        let copia = [...registradores];
        let duo = (parseInt(copiadora[ope1], 16) & parseInt(copiadora[ope2], 16))  % 256;
        copiadora[ope1] = duo;
        this.UpdateRegistradores(copia, copiadora, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY3
    setXOR : function(ope1, ope2, instrucao, registradores, setRegistradores) {
        let copia = [...registradores];
        let duo = (parseInt(copiadora[ope1], 16) ^ parseInt(copiadora[ope2], 16) % 256);
        copiadora[ope1] = duo;
        this.UpdateRegistradores(copia, copiadora, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY4
    setAddop : function(ope1, ope2, instrucao, registradores, setRegistradores) { 
        //VF is set to 1 when there's a carry, and to 0 when there is not.
        let copia = [...registradores];
        if (copiadora[ope1] + copiadora[ope2] > parseInt(255, 16)) {
            copiadora[15] = parseInt(1, 16);
        } else{
            copiadora[15] = 0;  
        }
        copiadora[ope1] += copiadora[ope2] % 256;
        this.UpdateRegistradores(copia, copiadora, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY5
    setSubop : function(ope1, ope2, instrucao, registradores, setRegistradores) { 
        //VF is set to 0 when there's a borrow, and 1 when there is not.
        let copia = [...registradores];
        if (copiadora[ope1] - copiadora[ope2] < 0) {
            copiadora[ope1] = 256% copiadora[ope2];
            copiadora[15] = 1;            
        } else {
            copiadora[ope1] -= copiadora[ope2];
            copiadora[15] = 0;   
        }
        this.UpdateRegistradores(copia, copiadora, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY6   
    setRightShift : function(ope1, instrucao, registradores, setRegistradores) {
        let copia = [...registradores];
        copiadora[ope1] = parseInt(copiadora[ope1], 16) >> 1;
        this.UpdateRegistradores(copia, copiadora, setRegistradores);
        return instrucao + 0x002;
    },

    /// ex. Opcode: 8XY7
    setRestop : function(ope1, ope2, instrucao, registradores, setRegistradores){
        //VF is set to 0 when there's a borrow, and 1 when there is not.
        let copia = [...registradores];
        copiadora[ope1] = copiadora[ope2] - copiadora[ope1];
        if (copiadora[ope1] > parseInt(255, 16)) {
            copiadora[15] = 0;
        }
        this.UpdateRegistradores(copia, copiadora, setRegistradores);
        return instrucao + 0x002;
    },
     
    /// ex. Opcode: 8XYE
    setLeftShift : function(ope1, instrucao, registradores, setRegistradores) {
        let copia = [...registradores];
        copiadora[ope1] = parseInt(copiadora[ope1], 16) << 1;
        this.UpdateRegistradores(copia, copiadora, setRegistradores);
        return instrucao + 0x002;
    },
  
    // Condicionais
    setJump : function(op, ope1, valor, instrucao){
        switch(op[0]) {
            case '3':
                /// ex. Opcode: 3XNN
                if (copiadora[ope1] === valor) {
                    return instrucao + 0x004;
                }
                return instrucao + 0x002;
            case '4':
                /// ex. Opcode: 4XNN
                if (copiadora[ope1] !== valor) {
                    return instrucao + 0x004;
                }
                return instrucao + 0x002;
            case '5':
                /// ex. Opcode: 5XY5
                if (copiadora[ope1] === copiadora[valor]) {
                    return instrucao + 0x004;
                }
                return instrucao+ 0x002;
            case '9':
                /// ex. Opcode: 9XY0
                if (copiadora[ope1] !== copiadora[valor]) {
                    return instrucao + 0x004;
                }
                return instrucao + 0x002;
            default:
                return instrucao + 0x002;
        }
    },

    setNext : function(next){
        return next + copiadora[0];
    },

    setRandom : function(ope1, valor, instrucao, registradores, setRegistradores) {
        let copia = [...registradores];
        copiadora[ope1] = (Math.floor(Math.random(2) * 256) & valor) % 256;
        this.UpdateRegistradores(copia, copiadora, setRegistradores);
        return instrucao + 0x002;
    },
  

    // Display
    /// ex. Opcode: 00E0
    LimpaTela : function(anterior, setDisplay) {
        setDisplay(copiaDisplay);
        return anterior + 0x002;
    },

    /// ex. Opcpde: DXYN
    Desenha : function (anterior, x, y, n, setDisplay) {
        let vX = copiadora[x];
        let vY = copiadora[y];
        this.UpdateDisplay(setDisplay, sprites[0], vX, vY, n)
        return anterior + 0x002;
    }


    // Teclado
    

    // Timers


    // Memória

}

export default Instrucoes;
