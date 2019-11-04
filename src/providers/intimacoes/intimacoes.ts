import { AutenticacaoProvider } from './../autenticacao/autenticacao';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Storage } from "@ionic/storage";

import 'rxjs/add/operator/map'
import { Constantes } from '../../constantes/constantes';
import { RequestOptions } from '@angular/http';
import { Usuario } from '../../model/usuario.model';



/*
  Generated class for the IntimacoesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IntimacoesProvider {

  private token: string = null;
  public usuario : Usuario;
  constructor(public http: HttpClient,private storage: Storage,public autenticacaoProvider: AutenticacaoProvider){
    this.storage.get(Constantes.STORAGE_TOKEN).then((data: any) => {
      this.token = data;
    
    }).catch((err: any) => {

    });

  }

  public ObterListaIntimacoes() {
     let token =this.autenticacaoProvider.getToken();

     
     this.usuario = this.autenticacaoProvider.getUser(token);

     let dados = {"diligente_id":  this.usuario.idDiligente};
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };
  
      return new Promise(resolve => {
  
        this.http.post(Constantes.OBTER_LISTA_INTIMACOES,dados, httpOptions).timeout(Constantes.TIMEOUT_RESQUEST).subscribe((data: any) => {
       
          resolve(data);
  
        }, err => {
          console.log(JSON.stringify(err));
          resolve(err);
  
        });
      });
    
  
     
}




}
