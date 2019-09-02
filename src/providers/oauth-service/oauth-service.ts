import { Storage } from '@ionic/storage';
import { Injectable, resolveForwardRef } from '@angular/core';
import { Constantes } from './../../constantes/constantes';
import 'rxjs/add/operator/map';
import { HttpHeaders ,HttpClient} from '@angular/common/http';
//import { Usuario } from '../../model/usuario-model';
import { Observable, Subject } from 'rxjs';

/*
  Generated class for the OauthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OauthService{

  public token: string;
  private logger = new Subject<boolean>();
  public loggedIn: boolean;
 // public usuario : Usuario;
  public  httpOptions :any;

  constructor(public http: HttpClient,  public storage: Storage) {
   
    this.httpOptions = {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods': '*'


      })
    };  
  }

  doLogin(usuario: string, senha:string)  {

    let jsonLogin =  {
      "login": usuario,
      "senha": senha
    }
    
    return new Promise(resolve => {

      this.http.post(Constantes.API_LOGIN,jsonLogin,this.httpOptions).timeout(Constantes.TIMEOUT_RESQUEST).subscribe((data:any) => {      
        
      /* if(data.status){     
        this.usuario = new Usuario(data.token,data.dados.id,data.dados.nome,data.dados.login,data.dados.isAdmin,data.dados.avatar,data.dados.info,data.dados.organizationId);
        this.storage.set("usuario", this.usuario).then((data:any)=>{
                    
          this.loggedIn = true;
          this.logger.next(this.loggedIn);    
      
        }).catch((err:any)=>{
          alert("Ocorreu um erro ao salvar o usuário:" + JSON.stringify(err));
        });
      }*/
        console.log(JSON.stringify(data));
        resolve(data);
             
      }, err => {
      
        resolve(err);
     
       
      });
    });
  }

}
