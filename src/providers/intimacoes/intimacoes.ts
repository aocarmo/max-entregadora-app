import { AutenticacaoProvider } from './../autenticacao/autenticacao';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Storage } from "@ionic/storage";

import 'rxjs/add/operator/map'
import { Constantes } from '../../constantes/constantes';
import { RequestOptions } from '@angular/http';
import { Usuario } from '../../model/usuario.model';
import { File } from '@ionic-native/file';


/*
  Generated class for the IntimacoesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IntimacoesProvider {

  private token: string = null;
  public usuario : Usuario;
  constructor(public http: HttpClient,private storage: Storage,public autenticacaoProvider: AutenticacaoProvider, public file: File){
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

public ObterTipoEntrega() {

  let token =this.autenticacaoProvider.getToken();

  this.usuario = this.autenticacaoProvider.getUser(token);

   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + token
     })
   };

   return new Promise(resolve => {

     this.http.post(Constantes.API_OBTER_TIPOS_ENTREGA,"", httpOptions).timeout(Constantes.TIMEOUT_RESQUEST).subscribe((data: any) => {
    
       resolve(data);

     }, err => {
       console.log(JSON.stringify(err));
       resolve(err);

     });
   });
 

  
}



public RegistrarPreBaixa(dadosPrebaixa: any) {

  let token =this.autenticacaoProvider.getToken();

  this.usuario = this.autenticacaoProvider.getUser(token);

   const httpOptions = {
     headers: new HttpHeaders({      
       'Authorization': 'Bearer ' + token
     })
   };
   
 
   let postData = new FormData();
   postData.append('intimacao_id', dadosPrebaixa.intimacao_id);
   postData.append('diligente_id', dadosPrebaixa.diligente_id);
   postData.append('tentativa_entrega_id', dadosPrebaixa.tentativa_entrega_id);
   postData.append('tipo_diligencia_id', dadosPrebaixa.tipo_diligencia_id);
   postData.append('motivo_entrega_id', dadosPrebaixa.motivo_entrega_id);
   postData.append('observacao', dadosPrebaixa.observacao);
   postData.append('usuario_id', dadosPrebaixa.motivo_entrega_id);
   postData.append('latitude', dadosPrebaixa.latitude);
   postData.append('longitude', dadosPrebaixa.longitude);

   
   if(dadosPrebaixa.arquivos != []){
     
     dadosPrebaixa.arquivos.forEach(async foto => {
        let i = 1;
        //let correctPath = foto.fotoPath.substr(0, foto.fotoPath.lastIndexOf('/') + 1);
        let nomeArquivo = foto.substring(foto.lastIndexOf('/')+1);
        let caminho = foto.substring(0,foto.lastIndexOf('/')+1);
        
        await this.file.readAsDataURL(caminho,nomeArquivo).then((data:any )=>{ 
           
             postData.append('foto_' + i, data);
             i++;
        });

     });

   }
   console.log(postData.get("intimacao_id"));

   return new Promise(resolve => {

     this.http.post(Constantes.API_REGISTRAR_PRE_BAIXA,postData, httpOptions).timeout(Constantes.TIMEOUT_RESQUEST).subscribe((data: any) => {
      
       resolve(data);

     }, err => {
       console.log(JSON.stringify(err));
       resolve(err);

     });
   });
 

  
}




}
