import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

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

    BarcodeScanner,
    File,
    FileChooser,
    FilePath
  
  ]
})
export class RomaneioPage {
 

  public item_romaneio = {};
  public romaneio: string="";
  public material: {
    codigo: "",
    descricao: "",
    qtd:"",
    local: ""
  };
  private posicao: number = 0;
  public listaMat = new Array<any>();
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private file: File,
    private fileChooser: FileChooser,
    private filePath: FilePath) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RomaneioPage');
    //this.carregaTxt();
    this.carregaTxtChooser();
    
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

  carregaTxtChooser(){

    
    
    this.fileChooser.open().then(uri =>{

      this.file.resolveLocalFilesystemUrl(uri).then(url=>{
        
        this.posicao = url.nativeURL.lastIndexOf('/');
        
        this.file.readAsText(url.nativeURL.substring(0,this.posicao), url.name).then((conteudoArquivo) => {
        
          
          alert("conteudo arquivo: "+conteudoArquivo);
  
        })
        .catch(err => alert("erro do readastext"+err));

      });

      
      
      

    } )
  .catch(e =>{
    alert(e);
  } );

  }

  carregaTxt(){

  
    //verifica se existe o arquivo romaneio.txt na pasta appRomaneio
    this.file.checkFile(this.file.externalRootDirectory, 'appRomaneio/romaneio.txt').then(_ =>{

      this.file.readAsText(this.file.externalRootDirectory, 'appRomaneio/romaneio.txt').then((conteudoArquivo) => {
        
        
        this.converteParaListaMaterais(conteudoArquivo);

      });

      
    }
      ).catch(err => 
        alert("arquivo não encontrado")); 

   
   
    this.romaneio = "123456";
    
    
  }

  converteParaListaMaterais(conteudo: String){

    let arrayPalavras = conteudo.split("|");
    let arrayColunas = new Array<string>();
    let arrayIndices = [4];
    let count = 0;
    let countLinha = 2;
    let countColunas = 0;
    let countMaiorQuarenta=0;
    let terminoArrayColunas: boolean=false;


    for(var i=0;i<arrayPalavras.length;i++) {
      
      if((arrayPalavras[i].length>40)&&(countMaiorQuarenta==0)){
        countMaiorQuarenta++;
      }else if (((arrayPalavras[i].length)<=40)&&(!terminoArrayColunas)){
        arrayColunas[i-1]=arrayPalavras[i];
      }else if((arrayPalavras[i].length>40)&&(countMaiorQuarenta==1)){
        terminoArrayColunas = true;
        countMaiorQuarenta++;
        for(var j=0;j<arrayColunas.length;j++) {
          
          if (arrayColunas[j].includes("breve")){
            arrayColunas[j] = "descricao";
            arrayIndices[0] = j;
          }else if (arrayColunas[j].includes("Material")){
            arrayColunas[j] = "codigo";
            arrayIndices[1] = j;
          }else if (arrayColunas[j].includes("empenha")){
            arrayColunas[j] = "qtd";
            arrayIndices[2] = j;
          }else if (arrayColunas[j].includes("origem")){
            arrayColunas[3] = "local";
          }
        }
      }else if (((arrayPalavras[i].length)<=40)&&(terminoArrayColunas)&&(arrayPalavras[i].length!=2)){
        
        this.material = JSON.parse('{"'+ arrayColunas[ arrayIndices[0]]+'":"'+arrayPalavras[(arrayIndices[0]+1)*countLinha]+'","'
                                       + arrayColunas[ arrayIndices[1]]+'":"'+arrayPalavras[(arrayIndices[1]+1)*countLinha]+'","'
                                       + arrayColunas[ arrayIndices[2]]+'":"'+arrayPalavras[(arrayIndices[2]+1)*countLinha]+'","'
                                       + arrayColunas[ arrayIndices[3]]+'":"'+arrayPalavras[(arrayIndices[3]+1)*countLinha]+'"}');
        
                                      
        this.listaMat.push(this.material);

        countLinha++;

        i=i+arrayColunas.length+1;

      }else if((arrayPalavras[i].length>40)&&(countMaiorQuarenta==2)){
        break;
      }

     
      count++;
    }
  }

 
}
