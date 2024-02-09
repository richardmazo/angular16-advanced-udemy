import { mensaje } from "./string";

//describe('pruebas de String');
//it('Debe de ingresar un string');

describe('Pruebas de strings', () => {

    it('Debe de regresar un string', () => {

        const resp = mensaje('Fernando');
        expect( typeof resp ).toBe('string')

    });

    it('Debe de retornar un saludo con el nombre enviado', () => {

        const nombre = 'Juan';
        const resp = mensaje( nombre );
        expect( resp ).toContain( nombre );

    });

});