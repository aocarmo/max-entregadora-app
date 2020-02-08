import { Usuario } from './../../model/usuario.model';
import { Notificacao } from './../../model/notificacao.model';
import {Component} from "@angular/core";
import { IonicPage, NavController, ViewController, LoadingController, NavParams} from "ionic-angular";
import { IntimacoesProvider } from "../../providers/intimacoes/intimacoes";
import { Storage } from '@ionic/storage';
import { Constantes } from '../../constantes/constantes';

@IonicPage({
  name: 'page-notifications',
  priority: 'high'
})

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})

export class NotificationsPage {
  public notificacoes : Notificacao [] = [];
  public usuario: Usuario;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams,   public intimacoesProvider: IntimacoesProvider,    public storage: Storage, public loadingCtrl: LoadingController) {

    
  }

  close() {
    this.viewCtrl.dismiss();
  }

  messages(notificacoes:Notificacao[]) {
    this.navCtrl.push('page-message-list', {'notificacoes': notificacoes, 'usuario':  this.usuario });
  }

  async ionViewWillEnter(){  
    const loader = this.loadingCtrl.create({});
    loader.present();

    await this.storage.get(Constantes.STORAGE_USER).then(async (user: any) => {
      this.usuario = user;

      await this.storage.get(Constantes.NOTIFICACOES + this.usuario.id.toString()).then(async (notificacoes: any) => {

        if (notificacoes != null) {
          this.notificacoes = notificacoes;
         
        }
        loader.dismiss();
      });

    });

    
    
  }

  obterNotificacoes(){
    
    this.intimacoesProvider.ObterNotificacoes().then((data:any)=>{
      console.log(JSON.stringify(data));
      
      
    }).catch((err:any)=>{

    });

  }
}
