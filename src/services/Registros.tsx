export interface IRegistro {
    reg: Array<number>,
    setter: any
}

let registros: IRegistro = {
    reg: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    setter: null
};

export const IniciarRegistradores = function(setter: React.Dispatch<any>) {
    registros.setter = setter;
    UpdateRegistradoresArr([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

export const ReiniciarRegistradores = function() : void {
    registros.setter(null);
    registros.reg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    UpdateRegistradoresArr([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

export const GetReg = function(indice: number): number {
    return registros.reg[indice];
};

export const GetRegistros = function(): Array<number> {
    return registros.reg;
};

export const CopiaRegs = function(): number[] {
    return [...registros.reg];
}

export const UpdateRegistradores = function(indice: number, valor: number) {
    registros.reg[indice] = valor;
    registros.setter(registros.reg);
};

export const UpdateRegistradoresArr = function(array: Array<number>) {
    registros.setter(array);
    registros.reg = array;
}
