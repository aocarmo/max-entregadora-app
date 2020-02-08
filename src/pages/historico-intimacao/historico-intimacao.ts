import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { HistoricoIntimacao } from '../../model/historicoIntimacao.model';
import { NetworkProvider } from '../../providers/network/network';
import { FuncoesProvider } from './../../providers/funcoes/funcoes';
import { IntimacoesProvider } from './../../providers/intimacoes/intimacoes';
import { Constantes } from '../../constantes/constantes';
/**
 * Generated class for the HistoricoIntimacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-historico-intimacao',
  segment: 'historico-intimacao',
  priority: 'high'
})
@Component({
  selector: 'page-historico-intimacao',
  templateUrl: 'historico-intimacao.html',
})
export class HistoricoIntimacaoPage {

  exibeMenu: boolean = true;
  public historicoIntimacao : HistoricoIntimacao = new HistoricoIntimacao();
  langs;
  langForm;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _fb: FormBuilder,   public networkProvider: NetworkProvider,
              public IntimacoesProvider: IntimacoesProvider, 
              public FuncoesProvider: FuncoesProvider) {

                console.log(this.navParams.get('id'));
                
              
                if(this.navParams.get('id') != null ){
                  this.exibeMenu = false;
                }
             
                
  }

  ngOnInit() {
    this.langForm = this._fb.group({    
      tipoDocumento: ['',  Validators.compose([
        Validators.required

      ])],
      dtInicial: ['', Validators.compose([        
      ])],
      dtFinal: ['', Validators.compose([     
      ])],
      documento: ['', Validators.compose([  
        Validators.required   
      ])]
    });
    this.langForm.get('tipoDocumento').setValue('cpf');
  //  this.langForm.get('tipoDocumento').disable();
   // this.langForm.get('observacao').disable();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricoIntimacaoPage');
  }

  pesquisar(){
    console.log(this.langForm.value.tipoDocumento );
    console.log(this.langForm.value.dtInicial );
    console.log(this.langForm.value.dtFinal );
    console.log(this.langForm.value.documento );

     
    if(this.networkProvider.previousStatus == 0){
      let load = this.FuncoesProvider.showLoading("Aguarde...");
      this.IntimacoesProvider.ObterHistoricoIntimacao(this.FuncoesProvider.formataDataPadraoBR(this.langForm.value.dtInicial),
          this.FuncoesProvider.formataDataPadraoBR(this.langForm.value.dtFinal)
        ,this.langForm.value.documento,this.langForm.value.tipoDocumento).
        then((data: any) =>{
          load.dismiss();
        
          if(data.ok && data.retorno.dadosIntimacao.length == 0){
            this.FuncoesProvider.showAlert("Não foram encontrados registros para as datas informadas.");
          }else if(data.ok &&  data.retorno.dadosIntimacao.length > 0){
            this.historicoIntimacao = data.retorno;
           
            
          }else{
            this.FuncoesProvider.showAlert(data.msg);
          }
        }).catch((err:any)=>{
          load.dismiss();
        });
    }else{
      this.FuncoesProvider.showAlert(Constantes.INTERNET_INDISPONIVEL);
    }
    
  }

  abrirDetalhe(historicoIntimacao: HistoricoIntimacao, dadosIntimacao: any){
      
      this.navCtrl.push('page-detalhe-historico-intimacao',{'historicoIntimacao': historicoIntimacao, 'dadosIntimacao': dadosIntimacao});
      
  }

}
