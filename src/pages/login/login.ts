import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {IonicPage, NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import { OauthService } from "../../providers/oauth-service/oauth-service";

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
              public oauthService: OauthService
              ) {
    this.menu.swipeEnable(false);
    this.menu.enable(false);
  }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      usuario: ['', Validators.compose([
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

  // login and go to home page
  login() {
    
    this.oauthService.doLogin(this.onLoginForm.value.usuario, this.onLoginForm.value.senha).then((data:any)=>{
      this.nav.setRoot('page-home');
    }).catch((err:any)=>{
      
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
