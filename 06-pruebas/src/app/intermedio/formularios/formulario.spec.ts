import { FormularioRegister } from './formulario';
import { FormBuilder } from '@angular/forms';


describe( 'Formularios', () => {

    let component: FormularioRegister;

    beforeEach( () => {
        component = new FormularioRegister( new FormBuilder() );
    } );

    it( 'Debe de crear un formulario con dos campos, email y password', () => {

        expect( component.form.contains('email') ).toBeTruthy();
        expect( component.form.contains('password') ).toBeTruthy();

    } );

    it( 'El email debe de ser obligatorio', () => {

        const control = component.form.get('email');
        control!.setValue('');

        expect( control!.valid ).toBeFalsy();

    } );

    it( 'El email debe de ser un correo válido', () => {

        const control = component.form.get('email');
        control!.setValue('richard@gmail.com');
        expect( control!.valid ).toBeTruthy();

    } );    

} )