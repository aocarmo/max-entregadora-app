import { FuncoesProvider } from './../funcoes/funcoes';

import { Injectable } from '@angular/core';

import { HttpHeaders ,HttpClient} from '@angular/common/http';

import {JwtHelper} from "angular2-jwt";
import {Storage} from "@ionic/storage";

import 'rxjs/add/operator/map'
import { Constantes } from '../../constantes/constantes';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../../model/usuario.model';
import { JSONPBackend } from '@angular/http';
import { AutenticacaoProvider } from '../autenticacao/autenticacao';
/*
  Generated class for the PerfilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PerfilProvider {
  public usuario : Usuario;
  constructor(public http: HttpClient,
              public funcoes: FuncoesProvider,
              public autenticacaoProvider: AutenticacaoProvider) {
   
  }


  
  alterFoto(base64Image: string) {

    let token =this.autenticacaoProvider.getToken();
    this.usuario = this.autenticacaoProvider.getUser(token);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    let jsonFoto =  {       
        "id":this.usuario.id,
        "foto": base64Image      
      };

   // let urlParams  = this.funcoes.JSON_to_URLEncoded(jsonLogin,null);

    return new Promise(resolve => {

      this.http.post(Constantes.API_ALTERAR_USUARIO,jsonFoto,httpOptions).timeout(Constantes.TIMEOUT_RESQUEST).subscribe(data => {

        resolve(data);

      }, err => {
        resolve(err);       
      });
    });
  }

}
