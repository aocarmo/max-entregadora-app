import { FuncoesProvider } from './../../providers/funcoes/funcoes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';

/**
 * Generated class for the PreBaixaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


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
  
  public fotosExibir;
  public entrega: any;
  langs;
  langForm;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _fb: FormBuilder,
              private funcoes: FuncoesProvider,
            //  public file: File,
              public actionSheet: ActionSheet) {

   this.entrega = this.navParams.get('entrega');

  }

  ngOnInit() {
    this.langForm = this._fb.group({
      diligencia: ['', Validators.compose([
        Validators.required
      ])],
      motivo: ['', Validators.compose([
        Validators.required
      ])],
      observacao: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreBaixaPage');
  }

  /*removerFoto(e, foto: FotoObjeto, perguntaId: string) {

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

        for (let pergunta of this.perguntas) {
          if (pergunta.id == perguntaId) {


            for (let fotoArray of pergunta.fotosExibir) {

              if (foto.fotoPath == fotoArray.fotoPath) {

                pergunta.fotosExibir.splice(i, 1);

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
        }

      }

    });

  }*/

}
