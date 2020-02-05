import { Diagnostic } from '@ionic-native/diagnostic';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';
import _ from 'lodash';
import { IntimacoesProvider } from '../../providers/intimacoes/intimacoes';
import { FuncoesProvider } from '../../providers/funcoes/funcoes';
import { Constantes } from '../../constantes/constantes';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../model/usuario.model';
import { Subscription } from 'rxjs/Subscription';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../../providers/network/network';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AutenticacaoProvider } from '../../providers/autenticacao/autenticacao';
/**
 * Generated class for the MinhasEntregasListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-minhas-entregas-list',
  segment: 'list',
  priority: 'high'
})
@Component({
  selector: 'page-minhas-entregas-list',
  templateUrl: 'minhas-entregas-list.html',
})
export class MinhasEntregasListPage {

  public entregas: any = [];
  rootNavCtrl: NavController;
  queryText: string;
  todasEntregas: any;
  public usuario: Usuario;
  public lat: Number;
  public lon: Number;




  constructor(public navCtrl: NavController, public navParams: NavParams, private superTabsCtrl: SuperTabsController,
    public autenticacaoProvider: AutenticacaoProvider,
    public intimacoesProvider: IntimacoesProvider,
    public funcoes: FuncoesProvider,
    public storage: Storage,
    public network: Network,
    public networkProvider: NetworkProvider,
    private iab: InAppBrowser ,
    public alertCtrl: AlertController,
    public diagnostic: Diagnostic) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');
    this.queryText = "";


  }



  async ionViewWillEnter() {
    let load = this.funcoes.showLoading('Carregando...');
    await  this.obterLocalizacao();    
    await this.storage.get(Constantes.STORAGE_USER).then((data :any)=>{
      load.dismiss();
      this.usuario = data;
      if(this.usuario.idPerfil == 5){
        this.AtualizarListaIntimacoes().then((data: any) => {
          console.log(JSON.stringify(this.entregas));
        });
      }
    });

  
    //
  }

  filterCidade(cid: any) {
    let val = cid.target.value;

    if (val && val.trim() != '') {
      this.entregas = _.values(this.todasEntregas);
      this.entregas = this.entregas.filter((entrega) => {
        return (
          entrega.devedor.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          entrega.documento.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          // entrega.protocolo.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          entrega.endereco.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          entrega.dtLimite.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          entrega.dtProtocolo.toLowerCase().indexOf(val.toLowerCase()) > -1
        )
      });
    } else {
      this.entregas = this.todasEntregas;
    }

  }
  verDetalhe(entrega: any) {
    this.rootNavCtrl.push('page-detalhe-entrega', { 'entrega': entrega });
  }

  goToDetails() {
    this.rootNavCtrl.push('NewsDetailsPage');
  }

  setBadge() {
    this.superTabsCtrl.setBadge('aboutTab', 9);
  }

  clearBadge() {
    this.superTabsCtrl.clearBadge('aboutTab');
  }

  jumpToAccount() {
    this.superTabsCtrl.slideTo(2);
  }

  hideToolbar() {
    this.superTabsCtrl.showToolbar(false);
  }

  showToolbar() {
    this.superTabsCtrl.showToolbar(true);
  }

  async AtualizarListaIntimacoes(): Promise<any> {

    let loading = this.funcoes.showLoading("Obtendo intimações...");

    await this.storage.get(this.usuario.id.toString()).then(async (intimacoesLocal: any) => {

      if (intimacoesLocal != null) {

        this.entregas = intimacoesLocal;
      
        if(this.networkProvider.previousStatus == 0){
          this.ObterListaIntimacoes();
        }

        loading.dismiss();

      } else {
        if(this.networkProvider.previousStatus == 0){

          await this.intimacoesProvider.ObterListaIntimacoes().then(async (intimacoesAPI: any) => {
          
            
            if (intimacoesAPI.ok) {

              this.storage.set(this.usuario.id.toString(), intimacoesAPI.retorno);
              this.entregas = intimacoesAPI.retorno;
              loading.dismiss();

            } else {

              this.funcoes.showAlert(intimacoesAPI.msg);
              loading.dismiss();
            }

          }).catch((err) => {
            console.log(JSON.stringify(err));
            loading.dismiss();

          });
        }else{
          this.funcoes.showAlert(Constantes.INTERNET_INDISPONIVEL);
        }
   
      }
      this.todasEntregas = this.entregas;

    }).catch((err: any) => {
      loading.dismiss();

    });


  }

  ObterListaIntimacoes() {

    this.intimacoesProvider.ObterListaIntimacoes().then(async (intimacoesAPI: any) => {

      if (intimacoesAPI.ok) {

        this.storage.set(this.usuario.id.toString(), intimacoesAPI.retorno);
        //   this.entregas = intimacoesAPI.retorno; 
      }

    }).catch((err) => {
      console.log(JSON.stringify(err));

    });
  };



  /*   async ObterListaIntimacoes(): Promise<any> {    
 
       let loading = this.funcoes.showLoading("Carregando o mapa...");
       
        await this.intimacoesProvider.ObterListaIntimacoes().then(async (intimacoesAPI: any) => {
       
           if(intimacoesAPI.ok){
             
             await this.storage.get(Constantes.INTIMACOES).then(async (intimacoesLocal: any) => {      
           
               if(intimacoesLocal != null) {       
       
                 let localJSON = JSON.stringify(intimacoesLocal);
                 let APIJSON = JSON.stringify(intimacoesAPI.retorno);
                 
                 if(APIJSON != localJSON){
               
                   this.storage.set(Constantes.INTIMACOES,intimacoesAPI.retorno);
                   loading.dismiss();
                   this.entregas = intimacoesAPI.retorno;              
                  
                 }else{            
                   loading.dismiss();
                   this.entregas = intimacoesLocal;
                 }
       
               }else{
                 this.storage.set(Constantes.INTIMACOES,intimacoesAPI.retorno);
                 loading.dismiss();
                 this.entregas = intimacoesAPI.retorno;
               }
       
       
             }).catch((err: any) => {
               loading.dismiss();
       
             });      
       
           }
   
           this.todasEntregas = this.entregas;
       
       
           
         }).catch((err) => {
           console.log(JSON.stringify(err));
           loading.dismiss();
       
         });
       }*/

       public abrirNavegacao(entrega :any){

        const browser = this.iab.create('https://www.google.com/maps/dir/?api=1&origin=' + this.autenticacaoProvider.latitudeAtual + ',' + this.autenticacaoProvider.longitiudeAtual + '&destination=' + entrega.location.position.lat + ',' + entrega.location.position.lng,'_system');

 
       }

       async obterLocalizacao(){
    
        await this.diagnostic.isLocationEnabled().then(async (gpsAtivado:boolean)=>{
          
          if(!gpsAtivado){
           
            const confirm = this.alertCtrl.create({
              title: 'Lozalização desativada!',
              message: 'O aplicativo Max Entregadora precisa acessar sua localização para funcionar corretamente. Deseja ativar?',
              buttons: [
                {
                  text: 'Não',
                  handler: () => {
                    console.log('Disagree clicked');
                  }
                },
                {
                  text: 'Sim',
                  handler: () => {
                    this.diagnostic.switchToLocationSettings();
                    
                  }
                }
              ]
            });
            confirm.present();
    
            await this.storage.get("CONFIG").then((data: any)=>{
              let localizacao = JSON.parse(data);
             
              this.lat = localizacao[0].valor;
              this.lon = localizacao[1].valor;
            })
            
          }else{
          await  this.diagnostic.isLocationAuthorized().then(async (gpsAutorizado:any)=>{
            
              if(gpsAutorizado){
            
                await this.autenticacaoProvider.obterLocalizacaoAtual();     
                this.lat = this.autenticacaoProvider.latitudeAtual;
                this.lon = this.autenticacaoProvider.longitiudeAtual;
               
              }else{
               
                //Colocar a latitude padrão
                await this.storage.get("CONFIG").then((data: any)=>{
                  let localizacao = JSON.parse(data);
                 
                  this.lat = localizacao[0].valor;
                  this.lon = localizacao[1].valor;
                })
              }
            });
            
          }
        });
    
      }
}