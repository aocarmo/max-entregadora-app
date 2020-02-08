import { Notificacao } from './../../model/notificacao.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage({
	name: 'page-message-detail',
	segment: 'message/:id'
})

@Component({
  selector: 'page-message-detail',
  templateUrl: 'message-detail.html'
})

export class MessageDetailPage {
	notificacao: Notificacao;
	message: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.notificacao = this.navParams.get('notificacao');
  	
  }

}
