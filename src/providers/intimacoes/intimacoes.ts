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
  public usuario: Usuario;

  constructor(public http: HttpClient, private storage: Storage, public autenticacaoProvider: AutenticacaoProvider, public file: File) {
    this.storage.get(Constantes.STORAGE_TOKEN).then((data: any) => {
      this.token = data;

    }).catch((err: any) => {

    });

  }

  public ObterListaIntimacoes() {
    let token = this.autenticacaoProvider.getToken();


    this.usuario = this.autenticacaoProvider.getUser(token);

    let dados = { "diligente_id": this.usuario.idDiligente };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return new Promise(resolve => {

      this.http.post(Constantes.OBTER_LISTA_INTIMACOES, dados, httpOptions).timeout(Constantes.TIMEOUT_RESQUEST).subscribe((data: any) => {

        resolve(data);

      }, err => {
        console.log(JSON.stringify(err));
        resolve(err);

      });
    });



  }

  public ObterTipoEntrega() {

    let token = this.autenticacaoProvider.getToken();

    this.usuario = this.autenticacaoProvider.getUser(token);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return new Promise(resolve => {

      this.http.post(Constantes.API_OBTER_TIPOS_ENTREGA, "", httpOptions).timeout(Constantes.TIMEOUT_RESQUEST).subscribe((data: any) => {

        resolve(data);

      }, err => {
        console.log(JSON.stringify(err));
        resolve(err);

      });
    });



  }

  public ObterNotificacoes() {

    let token = this.autenticacaoProvider.getToken();

    this.usuario = this.autenticacaoProvider.getUser(token);
    let dados = { "usuario_id": this.usuario.id };
  

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return new Promise(resolve => {

      this.http.post(Constantes.API_OBTER_NOTIFICACOES, dados, httpOptions).timeout(Constantes.TIMEOUT_RESQUEST).subscribe((data: any) => {

        resolve(data);

      }, err => {
        console.log(JSON.stringify(err));
        resolve(err);

      });
    });



  }



  async RegistrarPreBaixa(dadosPrebaixa: any) {

    let token = this.autenticacaoProvider.getToken();

    this.usuario = this.autenticacaoProvider.getUser(token);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,

      })
    };


    let postData = new FormData();
    postData.append('intimacao_id', dadosPrebaixa.intimacao_id);
    postData.append('diligente_id', dadosPrebaixa.diligente_id);
    postData.append('tentativa_entrega_id', dadosPrebaixa.tentativa_entrega_id);
    postData.append('tipo_diligencia_id', dadosPrebaixa.tipo_diligencia_id);
    postData.append('motivo_entrega_id', dadosPrebaixa.motivo_entrega_id);
    postData.append('observacao', dadosPrebaixa.observacao);
    postData.append('usuario_id', dadosPrebaixa.usuario_id);
    postData.append('latitude', dadosPrebaixa.latitude);
    postData.append('longitude', dadosPrebaixa.longitude);


    if (dadosPrebaixa.arquivos != []) {

      for (var i = 0; i < dadosPrebaixa.arquivos.length; i++) {
        let foto = dadosPrebaixa.arquivos[i];
        //let correctPath = foto.fotoPath.substr(0, foto.fotoPath.lastIndexOf('/') + 1);
        let nomeArquivo = foto.substring(foto.lastIndexOf('/') + 1);
        let caminho = foto.substring(0, foto.lastIndexOf('/') + 1);

        await this.file.readAsDataURL(caminho, nomeArquivo).then(async (data: any) => {
       
            var block = data.split(";");
            // Get the content type of the image
            var contentType = block[0].split(":")[1];// In this case "image/gif"
            // get the real base64 content of the file
            var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
    
            // Convert it to a blob to upload
            var blob = this.b64toBlob(realData, contentType,512);
            
            postData.append('foto_' + i, blob,nomeArquivo);

        });

      }


    }


    return new Promise(resolve => {

      this.http.post(Constantes.API_REGISTRAR_PRE_BAIXA, postData, httpOptions).timeout(Constantes.TIMEOUT_RESQUEST).subscribe((data: any) => {
        
        resolve(data);

      }, err => {
        console.log(JSON.stringify(err));
        resolve(err);

      });
    });



  }



  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);


    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });


    return blob;
  }

  
  public ExcluirNotificacoes(idNotificacao : number) {

    let token = this.autenticacaoProvider.getToken();

    this.usuario = this.autenticacaoProvider.getUser(token);
    let dados = { "notificacao_id": idNotificacao };
  

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return new Promise(resolve => {

      this.http.post(Constantes.API_EXCLUIR_NOTIFICACOES, dados, httpOptions).timeout(Constantes.TIMEOUT_RESQUEST).subscribe((data: any) => {

        resolve(data);

      }, err => {
        console.log(JSON.stringify(err));
        resolve(err);

      });
    });



  }




}
