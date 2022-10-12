import Registros from "./Registros";

const Display = {
    pixels: Array.from(Array(32), () => Array.from(Array(64), () => 0)),
    original: Array.from(Array(32), () => Array.from(Array(64), () => 0)),
    setter: null,
    debug: false,
    ajuda: true,

    Iniciar: function(setter) {
        this.setter = setter;
        this.LimpaTela();
    },

    LimpaTela: function() {
        this.pixels = this.original
        this.setter(this.pixels);
    },

    UpdateDisplay : function(x, y, sprite) {
        let isUnset = false;

        for (let i=0; i<sprite.length; i++) {
            for (let j=0; j<8; j++) {
                if (x+j < 64 && y+i < 32) {
                    let original = parseInt(this.pixels[y+i][x+j]);
                    this.pixels[y+i][x+j] ^= parseInt(sprite[i][j]);
                    // VF is set to 1 if any screen pixels are flipped from set to unset when the sprite is drawn,
                    if (original === 1 && parseInt(this.pixels[y+i][x+j]) === 0)
                        isUnset = true;
                }
            }
        }
        //and to 0 if that does not happen
        let vf = isUnset ? 1 : 0;
        Registros.UpdateRegistradores(15, vf);
        this.setter(this.pixels);
    },
}

export default Display;