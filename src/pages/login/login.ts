import { AutenticacaoProvider } from './../../providers/autenticacao/autenticacao';
import { Constantes } from './../../constantes/constantes';
import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {IonicPage, NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import { FuncoesProvider } from '../../providers/funcoes/funcoes';


@IonicPage({
  name: 'page-login',
  segment: 'login',
  priority: 'high'
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  constructor(private _fb: FormBuilder, 
              public nav: NavController, 
              public forgotCtrl: AlertController,
              public menu: MenuController, 
              public toastCtrl: ToastController,
              public autenticacao: AutenticacaoProvider,
              public funcoes: FuncoesProvider
              ) {
    this.menu.swipeEnable(false);
    this.menu.enable(false);

    
  }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      login: ['', Validators.compose([
        Validators.required
      ])],
      senha: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  // go to register page
  register() {
    this.nav.setRoot('page-register');
  }



  login() {
   let loading = this.funcoes.showLoading("Autenticando...");
    this.autenticacao.login(this.onLoginForm.value).then((data:any)=>{
      loading.dismiss();
    if(data.ok){
      this.nav.setRoot('page-home');
    
    }else{
      this.funcoes.showAlert(data.msg);
    }
     
    }).catch((err: any)=>{
      loading.dismiss();
      this.funcoes.showAlert("Ocorreu um erro ao fazer o login: " +JSON.stringify(err));
      
    });

    
       
  }


  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Esqueceu a senha?',
      message: "Informe seu e-mail para enviarmos um link de redefinição.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'E-mail de redefinicão enviado!',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
