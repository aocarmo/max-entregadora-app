import { Login1Page } from './../extras/login1/login1';

import { Constantes } from './../../constantes/constantes';
import { FuncoesProvider } from './../../providers/funcoes/funcoes';
import { IntimacoesProvider } from './../../providers/intimacoes/intimacoes';
import { Intimacao } from './../../model/intimacao.model';
import { Usuario } from './../../model/usuario.model';
import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NotificationsPage } from '../notifications/notifications';
import { Notificacao } from '../../model/notificacao.model';
import { NetworkProvider } from '../../providers/network/network';
import { Storage } from '@ionic/storage';
import { AutenticacaoProvider } from '../../providers/autenticacao/autenticacao';
import { DadosDiligencia } from '../../model/dadosDiligencia.model';
@IonicPage({
  name: 'page-home',
  segment: 'home',
  priority: 'high'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  public usuario: Usuario;
  public intimacoes: Intimacao[] = [];
  public qtdNotificacoesNaoLidas: number;
  public notificacoes: Notificacao[] = [];
  public listaPreBaixaOffline: DadosDiligencia[] = [];
  public qtdPreBaixasOff: number;
  public pages = [
    { pageName: 'page-minhas-entregas-map', title: 'Mapa', icon: 'map', id: 'newsTab' },
    { pageName: 'page-minhas-entregas-list', title: 'Entregas', icon: 'mail', id: 'aboutTab' }
  ];

  selectedTab = 0;

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public intimacoesProvider: IntimacoesProvider,
    public funcoes: FuncoesProvider,
    public zone: NgZone,
    public storage: Storage,
    public autenticacaoProvider: AutenticacaoProvider,
    public networkProvider: NetworkProvider) {
    this.usuario = this.navParams.get('usuario');

  }

  async ionViewWillEnter() {
    await this.obterConfiguracoes();
    await this.AtualizarNotificacoes();
    await this.obterPreBaixasOff();
    await this.enviarPreBaixaOff();  
 
  }


  onTabSelect(ev: any) {
    if (ev.index === 2) {
      let alert = this.alertCtrl.create({
        title: 'Secret Page',
        message: 'Are you sure you want to access that page?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              this.superTabs.slideTo(this.selectedTab);
            }
          }, {
            text: 'Yes',
            handler: () => {
              this.selectedTab = ev.index;
            }
          }
        ]
      });
      alert.present();
    } else {
      this.selectedTab = ev.index;
      this.superTabs.clearBadge(this.pages[ev.index].id);
    }
  }

  presentNotifications(myEvent) {
    // console.log(myEvent);
    this.qtdNotificacoesNaoLidas = null;
    let popover = this.popoverCtrl.create('page-notifications');
    popover.present({
      ev: myEvent
    });
  }


  async AtualizarNotificacoes(): Promise<any> {


    await this.storage.get(Constantes.NOTIFICACOES + this.usuario.id.toString()).then(async (notificacoes: any) => {

      if (notificacoes != null) {


        let i = 0;

        notificacoes.forEach(notificacao => {

          if (notificacao.lida == false) {
            i++;
          }

        });

        if (i > 0) {
          this.qtdNotificacoesNaoLidas = i
        } else {
          this.qtdNotificacoesNaoLidas = null;
        }



        if (this.networkProvider.previousStatus == 0) {
          this.obterNotificacoes();
        }

      } else {

        if (this.networkProvider.previousStatus == 0) {

          await this.intimacoesProvider.ObterNotificacoes().then(async (notificacoes: any) => {

            if (notificacoes.ok) {

              if (notificacoes.retorno.length > 0) {
                this.notificacoes = notificacoes.retorno;

                this.notificacoes.forEach(notificacao => {
                  notificacao.lida = false;
                });


                this.storage.set(Constantes.NOTIFICACOES + this.usuario.id.toString(), this.notificacoes);
                this.qtdNotificacoesNaoLidas = this.notificacoes.length;

              }


            } else {

              this.funcoes.showAlert(notificacoes.msg);

            }

          }).catch((err) => {
            console.log(JSON.stringify(err));

          });
        } else {
          this.funcoes.showAlert(Constantes.INTERNET_INDISPONIVEL);
        }

      }


    }).catch((err: any) => {


    });


  }

  doRefresh(refresher) {

    this.obterNotificacoes();
    this.enviarPreBaixaOff();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  async obterNotificacoes() {

    let arrNotificacoes: Notificacao[] = [];

    await this.intimacoesProvider.ObterNotificacoes().then(async (notificacoesOnline: any) => {

      if (notificacoesOnline.ok) {

        if (notificacoesOnline.retorno.length > 0) {

          await this.storage.get(Constantes.NOTIFICACOES + this.usuario.id.toString()).then(async (notificacoesCache: any) => {

            if (notificacoesCache != null) {

              arrNotificacoes = notificacoesCache;

              notificacoesOnline.retorno.forEach(notificacaoOnline => {

                notificacaoOnline.lida = false;

                let existe = false;

                notificacoesCache.forEach(notificacaoCache => {

                  if (notificacaoOnline.idNotificacao == notificacaoCache.idNotificacao) {
                    existe = true
                  }

                });

                if (!existe) {
                  arrNotificacoes.push(notificacaoOnline);
                }

              });

              let i = 0;

              arrNotificacoes.forEach(notificacao => {

                if (notificacao.lida == false) {
                  i++;
                }

              });

              if (i > 0) {
                this.qtdNotificacoesNaoLidas = i
              } else {
                this.qtdNotificacoesNaoLidas = null;
              }


              this.storage.set(Constantes.NOTIFICACOES + this.usuario.id.toString(), arrNotificacoes);

            }

          });

        }

      }

    }).catch((err: any) => {

    });

  }


  async obterConfiguracoes() {
    await this.autenticacaoProvider.ObterConfiguracoes("EMPRESA_LATITUDE,EMPRESA_LONGITUDE").then((data: any) => {

      if (data.ok) {
        this.storage.set("CONFIG", JSON.stringify(data.retorno));
        //     alert(JSON.stringify(data.retorno[0].valor));
      }
    });
  }

  async obterPreBaixasOff() {

    await this.storage.get(Constantes.PREBAIXASOFF).then(async (data: any) => {
      this.listaPreBaixaOffline = data;

      let i = 0;
      for (let itemPrebaixa of this.listaPreBaixaOffline) {
        if (!itemPrebaixa.sync) {
          i++;
        } else {
          this.listaPreBaixaOffline.splice(i, 1);
        }
      }


      await this.storage.set(Constantes.PREBAIXASOFF, this.listaPreBaixaOffline).then(async (data: any) => {

      });


      this.qtdPreBaixasOff = i > 0 ? i : null;
    });
  }

  async enviarPreBaixaOff() {
   
    if (this.networkProvider.previousStatus == 0) {
      let load = this.funcoes.showLoading("Sincronizando...");

      await this.storage.get(Constantes.PREBAIXASOFF).then(async (data: any) => {

        if (data != null) {

          this.listaPreBaixaOffline = data;
         
          for (let i = 0; i < this.listaPreBaixaOffline.length; i++) {


            if (!this.listaPreBaixaOffline[i].sync) {

              await this.intimacoesProvider.RegistrarPreBaixa(this.listaPreBaixaOffline[i]).then((data: any) => {

                if (data.ok) {
                  this.listaPreBaixaOffline[i].sync = true;

                }

              }).catch((err: any) => {
                load.dismiss();
                alert('Ocorreu algum arro ao salvar o registro de pré baixa: ' + JSON.stringify(err));
              });

            }
          }
      

          await this.storage.set(Constantes.PREBAIXASOFF, this.listaPreBaixaOffline).then(async (data: any) => {
           
          });
          
          this.obterPreBaixasOff();

          load.dismiss();

        } else {
          load.dismiss();
        }



      });
    } else {
     
      this.funcoes.showAlert(Constantes.INTERNET_INDISPONIVEL);
    }

  }


}