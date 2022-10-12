const Registros = {
    registradores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    setter: null,

    Iniciar: function(setter) {
        this.setter = setter;
        this.UpdateRegistradoresArr([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    },

    UpdateRegistradores : function(indice, valor) {
        this.registradores[indice] = valor;
        this.setter(this.registradores);
    },

    UpdateRegistradoresArr : function(array) {
        this.setter(array);
        this.registradores = array;
    },
}

export default Registros;