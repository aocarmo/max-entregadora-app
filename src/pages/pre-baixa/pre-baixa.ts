import { CameraService } from './../../providers/camera/camera-service';
import { FuncoesProvider } from './../../providers/funcoes/funcoes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ModalController } from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImagemModalPage } from '../imagem-modal/imagem-modal';
import { File } from '@ionic-native/file';
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


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _fb: FormBuilder,
              private funcoes: FuncoesProvider,
              public file: File,
              public actionSheet: ActionSheet,
              public camera: CameraService,
              private sanitizer: DomSanitizer,
              public modalCtrl: ModalController) {

   this.entrega = this.navParams.get('entrega');

  }

  ngOnInit() {
    this.langForm = this._fb.group({
      diligencia: ['', Validators.compose([
        Validators.required
      ])],
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
      this.langForm.get('motivo').disable();
      this.langForm.get('observacao').disable();
    }else{
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
        
        let loading = this.funcoes.showLoading("Armazenando a foto...");
               
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


}
