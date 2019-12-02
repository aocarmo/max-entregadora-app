import { Usuario } from './../../model/usuario.model';
import { Notificacao } from './../../model/notificacao.model';
import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {MessageService} from '../../providers/message-service-mock';
import { Constantes } from '../../constantes/constantes';
import { ItemSliding } from 'ionic-angular';


@IonicPage({
	name: 'page-message-list',
	segment: 'message-list'
})

@Component({
    selector: 'page-message-list',
    templateUrl: 'message-list.html'
})
export class MessageListPage {
   
    public notificacoes : Notificacao [] = [];
    public usuario:Usuario;
    constructor(public navCtrl: NavController, public service: MessageService,public navParams: NavParams,  public storage: Storage) {
        this.notificacoes = this.navParams.get('notificacoes');
        this.usuario = this.navParams.get('usuario');
    }

    async itemTapped(notificacao: Notificacao) {

        this.notificacoes.forEach(listaNotificacao => {
            if(listaNotificacao.idNotificacao == notificacao.idNotificacao){
                listaNotificacao.lida = true;
            }
        });

        await this.storage.set(Constantes.NOTIFICACOES + this.usuario.id.toString(), this.notificacoes).then(async (notificacoes: any) => {

        });

        this.navCtrl.push('page-message-detail', {
	      'notificacao': notificacao
	    });
    }

    async  deleteItem(notificacao: Notificacao, slidingItem: ItemSliding) {
        let i= 0;
        this.notificacoes.forEach(listaNotificacao => {

            if(listaNotificacao.idNotificacao == notificacao.idNotificacao){
                this.notificacoes.splice(i,1);
            }
            i++;
        });

        await this.storage.set(Constantes.NOTIFICACOES + this.usuario.id.toString(), this.notificacoes).then(async (notificacoes: any) => {

        });
        slidingItem.close();

    }

   

}
