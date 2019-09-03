
import { HttpHeaders ,HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {JwtHelper} from "angular2-jwt";
import {Storage} from "@ionic/storage";

import 'rxjs/add/operator/map'
import { Constantes } from '../../constantes/constantes';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../../model/usuario.model';
import { JSONPBackend } from '@angular/http';

/*
  Generated class for the AutenticacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutenticacaoProvider {

  private logger = new Subject<boolean>();
  loggedIn: boolean;
  public usuario : Usuario;
  private token: string;

  // When the page loads, we want the Login segment to be selected
  authType: string = "login";

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type':  'application/json'
    })
  };  

  error: string;
  jwtHelper = new JwtHelper();
  user: string;

  public constructor(public http: HttpClient,  private storage: Storage) {

  }

  login(crendenciais) {
    
      return new Promise(resolve => {

        this.http.post(Constantes.API_LOGIN,crendenciais,this.httpOptions)
        .subscribe((data:any)=>{

            this.authSuccess(data.retorno.token);
            resolve(data);
        }), err => {
      
          resolve(err);
       
        };
  
      });
       
  }

  public async authSuccess(token) {
    this.token = token;
    this.error = null;
    await this.storage.set('token', token);
    this.user = this.jwtHelper.decodeToken(token).login;  
    this.storage.set('profile', this.user);

  }

  authenticated() {
    return this.jwtHelper.isTokenExpired(this.token);
  }

  getToken() {
        return this.token;
  }

}
