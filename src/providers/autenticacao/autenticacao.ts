
import { HttpHeaders ,HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {JwtHelper} from "angular2-jwt";
import {Storage} from "@ionic/storage";

import 'rxjs/add/operator/map'
import { Constantes } from '../../constantes/constantes';
import { Observable, Subject, Subscription } from 'rxjs';
import { Usuario } from '../../model/usuario.model';
import { JSONPBackend } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';



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
  localizacao: Subscription;
  public latitudeAtual: any = "";
  public longitiudeAtual: any = "";

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

   public constructor(public http: HttpClient,  private storage: Storage, public geolocation: Geolocation) {
     
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
              await this.iniciarLocalizador();
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
   if(this.localizacao != null){
    this.localizacao.unsubscribe();
   }
    
    
  }

  permanecerLogado(condicao: boolean){
    this.loggedIn = condicao;
    this.logger.next(this.loggedIn);    
  }

  public RegistrarLocalizacaoAtual(lat, lon) {
    //Todo Ajustar para quando nao for diligente nem chamar esta função
    let token =this.getToken();
    this.usuario = this.getUser(token);
    let dados = {
                "diligente_id":  this.usuario.idDiligente,
                "latitude" : lat,
                "longitude" : lon,
                };
    
    const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
       })
     };
 
     return new Promise(resolve => {
 
       this.http.post(Constantes.API_LOCALIZACAO_DILIGENTE,dados, httpOptions).timeout(Constantes.TIMEOUT_RESQUEST).subscribe((data: any) => {
      
         resolve(data);
 
       }, err => {
         console.log(JSON.stringify(err));
         resolve(err);
 
       });
     });
   
 
    
}

async iniciarLocalizador(){
  var posOptions = { timeout: 10000, enableHighAccuracy: true };
  this.localizacao = await this.geolocation.watchPosition(posOptions)
            .filter((p) => p.coords !== undefined) //Filter Out Errors
            .subscribe(position => {
              this.latitudeAtual = position.coords.latitude;
              this.longitiudeAtual = position.coords.longitude;
              this.RegistrarLocalizacaoAtual(position.coords.latitude,position.coords.longitude).then((data:any)=>{});
     
    });
}

  async obterLocalizacaoAtual(): Promise<any>{
    
    var posOptions = { timeout: 10000, enableHighAccuracy: true };
    await this.geolocation.getCurrentPosition(posOptions).then((resp)=> {
      this.latitudeAtual = resp.coords.latitude;
      this.longitiudeAtual = resp.coords.longitude;
   
    });
    let location = {
      lat : this.latitudeAtual,
      lng : this.longitiudeAtual
    }
return location;



}



}
