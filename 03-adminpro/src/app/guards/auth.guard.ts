import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {
 
  constructor(private usuarioService: UsuarioService,
              private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
 
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
 
}