import { AfterViewInit, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements AfterViewInit {

  public usuario?: Usuario;

  constructor( private usuarioService: UsuarioService, 
               private ngZone: NgZone,
               private router: Router ) {
    this.usuario = usuarioService.usuario;
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '29756273416-l1shjh1uuambqq553disdkjalkned1cp.apps.googleusercontent.com',
    }); 
  }


  logout() {
    
    const email=localStorage.getItem('email')|| '';
    google.accounts.id.revoke(email,()=> {
      this.ngZone.run(()=>{
        this.usuarioService.logout();
      })
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    })
  }

  buscar( termino: string ){

    if( termino.length === 0 ){
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }

}
