import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class FuncoesProvider {

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) {

  }

  JSON_to_URLEncoded(srcjson, parent=""){
    if(typeof srcjson !== "object")
      if(typeof console !== "undefined"){
        console.log("\"srcjson\" is not a JSON object");
        return null;
    }

    let u = encodeURIComponent;
    let urljson = "";
    let keys = Object.keys(srcjson);

    for(let i=0; i < keys.length; i++){
      let k = parent ? parent + "[" + keys[i] + "]" : keys[i];

      if(typeof srcjson[keys[i]] !== "object"){
        urljson += u(k) + "=" + u(srcjson[keys[i]]);
      } else {
        urljson += this.JSON_to_URLEncoded(srcjson[keys[i]], k)
      }
      if(i < (keys.length-1))urljson+="&";
    }

    return urljson;
}

  //loading da pagina
   showLoading(mensagem: string) {
    let loading = this.loadingCtrl.create({
      content: mensagem
    });

    loading.present();

    return loading;
  }

  showloadingMoto() {
    let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `
      <div align="center" class="custom-spinner-container">
        <img class="loading"  src="assets/img/deliveryguy.gif" />
        <span align="center">Aguarde...</span>
      </div>`
    });
    
    loading.present();
    return loading
}    

  showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    }).present();
  }

  public presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  formataDataPadraoBR (dataCompleta: string) :string{

    let data = dataCompleta.split('T')[0].split('-');
    return data[2] + "/" + data[1] + "/" +data[0];
  }


}