
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
  private token: string = null;

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
     
      this.storage.get(Constantes.STORAGE_TOKEN).then((data:any)=>{
          this.token  = data;        
     }).catch((err:any)=>{

     });
    
  }

  public login(crendenciais){

    
      return new Promise(resolve => {
        
        this.http.post(Constantes.API_LOGIN,crendenciais,this.httpOptions).timeout(Constantes.TIMEOUT_RESQUEST)
        .subscribe(async (data:any)=>{
            
          if(data.ok){
            await  this.authSuccess(data.retorno.token);
              this.loggedIn = true;
              this.logger.next(this.loggedIn);    
          }
            
            resolve(data);
        }), err => {
      
          resolve(err);
       
        };
  
      });
       
  }


  public RecuperarSenha(email){
    
    return new Promise(resolve => {
      
      this.http.post(Constantes.API_RECUPERAR_SENHA,email,this.httpOptions).timeout(Constantes.TIMEOUT_RESQUEST)
      .subscribe(async (data:any)=>{          
        resolve(data);
      }), err => {    
        resolve(err);     
      };

    });
     
}


  public async authSuccess(token) {
    
    this.token = token;
    await this.storage.set(Constantes.STORAGE_TOKEN, token);
    this.usuario = this.jwtHelper.decodeToken(token); 

    
    await this.storage.set(Constantes.STORAGE_USER, this.usuario);

  }

  public getUser(token): any {
    this.usuario = this.jwtHelper.decodeToken(token); 
    return  this.usuario;
  }

  authenticated() {
    /*if(this.token == null){
      return false;
    }*/
      return this.jwtHelper.isTokenExpired(this.token)
    
  }

  isTokenExpired() {
    /*if(this.token == null){
      return false;
    }*/
      return this.jwtHelper.isTokenExpired(this.token)
    
  }

  getToken() {
        return this.token;
  }

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }

  public async doLogout(){

    await this.storage.remove(Constantes.STORAGE_TOKEN);
    await this.storage.remove(Constantes.STORAGE_USER);

    this.loggedIn = false;
    this.logger.next(this.loggedIn);
    
    
    
  }

  permanecerLogado(condicao: boolean){
    this.loggedIn = condicao;
    this.logger.next(this.loggedIn);    
  }


}
