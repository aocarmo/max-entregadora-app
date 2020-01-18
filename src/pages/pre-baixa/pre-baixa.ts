import { HomePage } from './../home/home';
import { AutenticacaoProvider } from './../../providers/autenticacao/autenticacao';
import { Usuario } from './../../model/usuario.model';
import { Intimacao } from './../../model/intimacao.model';
import { Login1Page } from './../extras/login1/login1';
import { NetworkProvider } from './../../providers/network/network';
import { Constantes } from './../../constantes/constantes';
import { TipoEntrega } from './../../model/tipoEntrega.model';
import { CameraService } from './../../providers/camera/camera-service';
import { FuncoesProvider } from './../../providers/funcoes/funcoes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ModalController, AlertController } from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImagemModalPage } from '../imagem-modal/imagem-modal';
import { File } from '@ionic-native/file';
import { IntimacoesProvider } from '../../providers/intimacoes/intimacoes';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PreBaixaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
export class FotoDiligencia {
  fotoExibir: SafeUrl;
  fotoPath: string;
} 
@IonicPage({
  name: 'page-pre-baixa',
  segment: 'preBaixa',
  priority: 'high'
})
@Component({
  selector: 'page-pre-baixa',
  templateUrl: 'pre-baixa.html',
})
export class PreBaixaPage {
  
  public fotosExibir:FotoDiligencia [] = [];
  public foto :FotoDiligencia = new FotoDiligencia();
  public entrega: any;
  langs;
  langForm;
  private win: any = window;
  public tipoDiligencia : number = 1;
  public listaTipoEntrega: TipoEntrega [] = [];
  public usuario: Usuario;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _fb: FormBuilder,
              private funcoes: FuncoesProvider,
              public file: File,
              public actionSheet: ActionSheet,
              public camera: CameraService,
              private sanitizer: DomSanitizer,
              public modalCtrl: ModalController,
              public storage: Storage,
              public networkProvider: NetworkProvider,
              public intimacoesProvider: IntimacoesProvider,
              public autenticacaoProvider: AutenticacaoProvider,
              public alertCtrl: AlertController
              ) {

   this.entrega = this.navParams.get('entrega');

   

  }



  async ionViewWillEnter() {
    let loading = this.funcoes.showLoading("Carregando...");

    await this.storage.get(Constantes.STORAGE_USER).then(async (data: any) => {
      this.usuario = data; 
      await this.AtualizarListaTipoEntrega().then((data: any) => {
        loading.dismiss();
      });

    });

  }

  ngOnInit() {
    this.langForm = this._fb.group({    
      motivo: ['',  Validators.compose([
        Validators.required

      ])],
      observacao: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.langForm.get('motivo').disable();
    this.langForm.get('observacao').disable();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreBaixaPage');
  }

  onChange(isChecked) {
    
    if(isChecked){
      this.tipoDiligencia = 1;
     this.langForm.reset();
      this.langForm.get('motivo').disable();    
      this.langForm.get('observacao').disable();
    

    }else{
      this.tipoDiligencia = 2;
      this.langForm.get('motivo').enable();
      this.langForm.get('observacao').enable();
    }

   
  }
  removerFoto(e, foto: FotoDiligencia) {

    let options: ActionSheetOptions = {
      title: 'Deseja excluir a imagem?',
      buttonLabels: [],
      addCancelButtonWithLabel: 'Cancelar',
      addDestructiveButtonWithLabel: 'Excluir',
      destructiveButtonLast: true
    };

    this.actionSheet.show(options).then((buttonIndex: number) => {

      if (buttonIndex == 1) {
        let loading = this.funcoes.showLoading("Excluindo imagem...");
        let nomeArquivo = foto.fotoPath.replace(/^.*[\\\/]/, '');
        let i = 0;
        
          for (let fotoArray of this.fotosExibir) {

             if (foto.fotoPath == fotoArray.fotoPath) {

                this.fotosExibir.splice(i, 1);

                this.file.removeFile(cordova.file.dataDirectory, nomeArquivo).then((data: any) => {

                  loading.dismiss();
                }).catch((err: any) => {
                  loading.dismiss();
                  this.funcoes.showAlert("Ocorreu um erro ao excluir a imagem: " + JSON.stringify(err));
                });
              }
              i++;
            }
       

      }

    });

  }

  tirarFoto(): void {
    let loading = this.funcoes.showLoading("Tirando a foto...");
    let buttonLabels = ['Tirar Foto'];

    const options: ActionSheetOptions = {
      title: 'Como gostaria de obter a imagem?',
      subtitle: 'Escolha uma opção',
      buttonLabels: buttonLabels,
      addCancelButtonWithLabel: 'Cancelar',
      // addDestructiveButtonWithLabel: 'Delete',
      // androidTheme: this.actionSheet.ANDROID_THEMES.THEME_HOLO_DARK,
      destructiveButtonLast: true
    };

    this.actionSheet.show(options).then((buttonIndex: number) => {

      this.camera.takePicture(buttonIndex).then((data: string) => {
        
        //Transformando o retorno em objeto para validar o retorno
        let retorno = JSON.parse(data);
        
     
               
        if (retorno.status == "true") {

          this.fotosExibir.push(
            {
              fotoExibir: this.sanitizer.bypassSecurityTrustUrl(this.win.Ionic.WebView.convertFileSrc(retorno.pathImage)),
              fotoPath: retorno.pathImage

            });
              
          loading.dismiss();

        } else {
          loading.dismiss();
          this.funcoes.showAlert(retorno.mensagem);
        }

      });

    });


}

public abrirImagem(foto: SafeUrl) {
  let loading = this.funcoes.showLoading("");
  var data = { fotoURL: foto };
  var modalPage = this.modalCtrl.create(ImagemModalPage, data);
  loading.dismiss();
  modalPage.present();
}

public convertURLImgToBase64(foto: FotoDiligencia){
  //let correctPath = foto.fotoPath.substr(0, foto.fotoPath.lastIndexOf('/') + 1);
  let nomeArquivo = foto.fotoPath.substring(foto.fotoPath.lastIndexOf('/')+1);
  let caminho = foto.fotoPath.substring(0,foto.fotoPath.lastIndexOf('/')+1);
  
   this.file.readAsDataURL(caminho,nomeArquivo).then((data:any )=>{ 
     console.log(JSON.stringify(data));
     
  });
}

registrarPreBaixa(){
   console.log(JSON.stringify(this.langForm.value.motivo));
   
  let loading = this.funcoes.showLoading('Salvando...');
  //Salvando fotos no array;
  let fotos = [];
  if(this.fotosExibir != []){
    this.fotosExibir.forEach(foto => {
      fotos.push(foto.fotoPath);
    });  
  }

  let dadosDiligencia = {

    intimacao_id : this.entrega.idIntimacao,
    diligente_id: this.usuario.idDiligente,
    tentativa_entrega_id: this.entrega.idTentativaEntrega,
    tipo_diligencia_id : this.tipoDiligencia,
    motivo_entrega_id: this.langForm.value.motivo == null ? "" : this.langForm.value.motivo,
    observacao: this.langForm.value.observacao,
    usuario_id: this.usuario.id,
    latitude: this.autenticacaoProvider.latitudeAtual,
    longitude: this.autenticacaoProvider.longitiudeAtual,
    arquivos : fotos   

   }
   


  
   this.intimacoesProvider.RegistrarPreBaixa(dadosDiligencia).then((data:any) =>{
    loading.dismiss();
    if(data.ok){

      const confirm = this.alertCtrl.create({
        title: data.msg,     
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.navCtrl.setRoot('page-home', {"usuario" : this.usuario});
            }
          }       
        ]
      });

      confirm.present();
    }else{
      
      this.funcoes.showAlert(data.msg)
    }
    
 
   }).catch((err:any)=>{
    loading.dismiss();
     alert('Ocorreu algum arro ao salvar o registro de pré baixa: ' + JSON.stringify(err));
   })
   
  
  
}


async AtualizarListaTipoEntrega(): Promise<any> {


  await this.storage.get(Constantes.TIPOS_ENTREGA).then(async (tiposEntrega: any) => {

    if (tiposEntrega != null) {
      
      let arrIdTipoEntrega =  Object.keys(tiposEntrega);
      console.log(JSON.stringify(tiposEntrega));
      

      arrIdTipoEntrega.forEach(id => {
        let tipoEntrega : TipoEntrega = new TipoEntrega();
        tipoEntrega.id = id;
        tipoEntrega.descricao = tiposEntrega[id];
        
        this.listaTipoEntrega.push(tipoEntrega);      
          
      });
   
      this.listaTipoEntrega.sort((a, b) => (a.descricao > b.descricao) ? 1 : -1)
  
      if (this.networkProvider.previousStatus == 0) {
        this.ObterListaTipoEntrega();
      }

    } else {

      if (this.networkProvider.previousStatus == 0) {

        await this.intimacoesProvider.ObterTipoEntrega().then(async (tiposEntrega: any) => {

          if (tiposEntrega.ok) {
            this.storage.set(Constantes.TIPOS_ENTREGA, tiposEntrega.retorno);
            
            let arrIdTipoEntrega =  Object.keys(tiposEntrega.retorno);
         
      
            arrIdTipoEntrega.forEach(id => {
              let tipoEntrega : TipoEntrega = new TipoEntrega();
              tipoEntrega.id = id;
              tipoEntrega.descricao = tiposEntrega.retorno[id];
              
              this.listaTipoEntrega.push(tipoEntrega);      
                
            });
         
            this.listaTipoEntrega.sort((a, b) => (a.descricao > b.descricao) ? 1 : -1)

          } else {

            this.funcoes.showAlert(tiposEntrega.msg);

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

ObterListaTipoEntrega() {

  this.intimacoesProvider.ObterTipoEntrega().then(async (tiposEntrega: any) => {

    if (tiposEntrega.ok) {

      this.storage.set(Constantes.TIPOS_ENTREGA, tiposEntrega.retorno);
      //this.entregas = intimacoesAPI.retorno; 
    }

  }).catch((err) => {
    console.log(JSON.stringify(err));

  });
};



}
