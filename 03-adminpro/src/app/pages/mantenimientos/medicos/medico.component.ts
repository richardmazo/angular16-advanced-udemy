import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

import { Hospital } from '../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public hospitalSeleccionado!: Hospital;
  public medicoSeleccionado!: Medico;

  public medicoForm: FormGroup = this.fb.group({
    nombre: [ '', Validators.required ],
    hospital: [ '', Validators.required ],
  });  

  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({ id }) => this.cargarMedico( id ));

    this.cargarHospitales();
    this.medicoForm.get('hospital')?.valueChanges
        .subscribe( hospitalId => {
          this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId )!;
        } )
  }

  cargarMedico( id: string ){

    if( id === 'nuevo' ){
      return;
    }

    this.medicoService.obtenerMedicoPorId(id)
        .subscribe( (medico: any) => {

          if(!medico){
            return this.router.navigateByUrl(`/dashboard/medicos`)
          }

          const { nombre, hospital:{ _id } } = medico;
          console.log(nombre, _id );
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({ nombre , hospital: _id });

          return;
        });
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
        .subscribe( (hospitales: Hospital[]) => {
          console.log(hospitales);
          this.hospitales = hospitales;
        });
  }

  guardarMedico(  ){

    const { nombre } = this.medicoForm.value;

    if( this.medicoSeleccionado ){
      // actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico( data )
          .subscribe( resp => {
            Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
          } );

    } else {
      // crear
      this.medicoService.crearMedico( this.medicoForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
          } );
    }
  }

}
