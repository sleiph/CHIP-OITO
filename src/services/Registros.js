const Registros = {
    reg: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    setter: null,

    Iniciar: function(setter) {
        this.setter = setter;
        this.UpdateRegistradoresArr([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    },

    UpdateRegistradores : function(indice, valor) {
        this.reg[indice] = valor;
        this.setter(this.reg);
    },

    UpdateRegistradoresArr : function(array) {
        this.setter(array);
        this.reg = array;
    },
}

export default Registros;