import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService,
               private router: Router ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if( this.usuarioService.role === 'ADMIN_ROLE' ){
      return true;
    } else {
      console.log("adminguard");
      this.router.navigateByUrl('/dashboard');
      return false;
    }

  }
};
