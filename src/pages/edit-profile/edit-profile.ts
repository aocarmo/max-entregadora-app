import { Usuario } from './../../model/usuario.model';
import { PerfilProvider } from './../../providers/perfil/perfil';
import { FuncoesProvider } from './../../providers/funcoes/funcoes';
import { CameraService } from './../../providers/camera/camera-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import {HomePage} from "../home/home";
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { Constantes } from '../../constantes/constantes';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'page-edit-profile',
  segment: 'edit-profile'
})

@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

  profiledata: Boolean = true;
  public user : Usuario;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController, 
              public toastCtrl: ToastController,
              private actionSheet: ActionSheet,
              public camera: CameraService,
              public funcoes: FuncoesProvider,
              public perfilService: PerfilProvider,
              public storage :Storage,
              public navParams: NavParams, ) {

                this.user = this.navParams.get('usuario');         

  }

  // process send button
  sendData() {
    // send booking info
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    // show message
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      cssClass: 'profile-bg',
      message: 'Your Data was Edited!',
      duration: 3000,
      position: 'bottom'
    });

    loader.present();

    setTimeout(() => {
      loader.dismiss();
      toast.present();
      // back to home page
      this.navCtrl.setRoot(HomePage);
    }, 3000)
  }

  ionViewDidEnter() {


    /*this.connected = this.network.onConnect().subscribe(()=>{      
      this.isOnline = true;       
     });
     this.disconnected = this.network.onDisconnect().subscribe(()=>{
      this.isOnline = false;  
    });      */
  }


  alteraFoto(): void {

   // if (this.isOnline) {

      let buttonLabels = ['Tirar Foto', 'Escolher da Galeria'];

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

        this.camera.obterFotoBase64(buttonIndex).then((data: string) => {

          //Transformando o retorno em objeto para validar o retorno
          let retorno = JSON.parse(data);

          let loading = this.funcoes.showLoading("Alterando foto...");
          //Testando se a foto foi tirada ou selecionada da camera ou biblioteca
          if (retorno.status == "true") {

            //Chamada para requisição alterar foto
            this.perfilService.alterFoto(retorno.base64Image).then((retornoAlterarFoto: any) => {

              //Testando se a requisção foi enviada com sucesso
              if (retornoAlterarFoto.ok) {
                this.user.foto = retornoAlterarFoto.retorno;
                this.storage.set(Constantes.STORAGE_USER,this.user).then(data => {
                  loading.dismiss();
                });

              } else {

                loading.dismiss();
                this.funcoes.showAlert(retornoAlterarFoto.msg);

              }

            }).catch((erro: any) => {
              loading.dismiss();
              this.funcoes.showAlert("Ocorreu um erro ao alterar o usuário: " + erro);
            });
          }else{
            loading.dismiss();
            this.funcoes.showAlert(retorno.mensagem);
          }

        });

      });

   /* } else {
      this.funcoes.showAlert(Constantes.INTERNET_INDISPONIVEL);
    }*/
  }


}
