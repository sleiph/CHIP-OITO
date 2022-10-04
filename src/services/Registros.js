const Registros = {
    registradores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    UpdateRegistradoresArr : function(array, setRegistradores) {
        setRegistradores(array);
        this.registradores = array;
    },

    UpdateRegistradores : function(indice, valor, setRegistradores) {
        this.registradores[indice] = valor;
        setRegistradores(this.registradores);
    },
}

export default Registros;