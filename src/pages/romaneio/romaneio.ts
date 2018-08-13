import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the RomaneioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-romaneio',
  templateUrl: 'romaneio.html',
  providers: [

    BarcodeScanner
  
  ]
})
export class RomaneioPage {

  public item_romaneio = {}

  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RomaneioPage');
    
  }

  abrirQrCodeScanner(){

    
    
    this.barcodeScanner.scan().then((barcodeData) => {

      this.item_romaneio = this.converteTextoQrcodeParaJson(barcodeData.text);

    }, (err) => {
      
    });
  }
  
  converteTextoQrcodeParaJson(texto:string){

    //var material = JSON.parse('{ "codigo":"20002056", "descricao":"poste b300", "qntd_pedid":12, "qntd_estoque":568}');

    let array = texto.split(',');

    return JSON.parse('{ "codigo":"'+array[0]+'", "descricao":"'+array[1]+'", "qtd_pedido":"'+array[2]+'", "qtd_estoque":"'+array[3]+'"}');;
  }

}
