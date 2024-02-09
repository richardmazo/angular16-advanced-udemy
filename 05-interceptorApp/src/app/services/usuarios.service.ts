import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( private http: HttpClient ) { }

  obtenerUsuarios(){

    let params = new HttpParams().append('page', '1');
    params = params.append('nombre','richard')

    return this.http.get(`https://reqres.in/api/user`, {
      params,
      //headers
    }).pipe(

      
      map( (resp: any) => resp['data'] ),

    );

  }

}

