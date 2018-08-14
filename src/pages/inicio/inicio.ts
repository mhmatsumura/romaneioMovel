import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RomaneioPage } from '../romaneio/romaneio';
import { File } from '@ionic-native/file';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
  providers: [

    
    File
  
  ]
})
export class InicioPage {
  
  private texto: string = "07.08.2018                                      Saída dinâmica de lista                                              1"+
  "-----------------------------------------------------------Página:-    1 ---------------------------------------------"+
  "COPEL WM - SISTEMA OPERACIONAL DE ALMOXARIFADOdo 1304-Cascavel DIS"+
  ""+
  "Empreiteira   147 FCO. BELTRAO DIS"+
  "Nro. Ronameio 733663"+
  "Data execução 07.08.2018"+
  "Hora execução 14:05:56"+
  "----------------------------------------------------------------------------------------------------------------------"+
  "| Material|Texto breve de material                 |Pos.origem|   Estoque| Qt pedida|Qt empenha|Qt faltant|      Peso|"+
  "----------------------------------------------------------------------------------------------------------------------"+
  "| 15002119|ISOLADOR,PINO UNIV.POLIMERI;15KV;RD COMP|RECEBIMENT|   60,000 |   60,000 |   60,000 |    0,000 |   90,000 |"+
  "| 15005471|GANCHO-OLHAL; NTC 812023                |RECEBIMENT|4.968,000 |2.500,000 |2.500,000 |    0,000 |1.550,000 |"+
  "| 15007645|BRACO,ANTIBALANCO;35KV;P/REDE COMPACTA  |01-A-61-AC|   46,000 |   38,000 |   38,000 |    0,000 |   13,680 |"+
  "| 15010424|ISOLADOR,ANC;13,8KV;BASTAO;POLIMERIC;G-O|RECEBIMENT|  450,000 |  444,000 |  444,000 |    0,000 |  599,400 |"+
  "| 15010428|ISOLADOR,ANC;34,5KV;BASTAO;POLIMERIC;G-O|RECEBIMENT|  490,000 |  340,000 |  340,000 |    0,000 |  683,400 |"+
  "| 15011672|ALCA,PREF SERV;CAL 70MM2;NTC 812124     |01-A-57-AC|   41,000 |   41,000 |   41,000 |    0,000 |    6,560 |"+
  "| 15011916|LACO,PREF TOPO;CA=4AWG;CAA=4AWG;D=60MM  |01-A-57-AG|  527,000 |  300,000 |  300,000 |    0,000 |   21,000 |"+
  "| 15015875|ESTRIBO;ACO;ESPACADOR LOSANG;RD COMPACTA|RECEBIMENT|  270,000 |  200,000 |  200,000 |    0,000 |   52,000 |"+
  "| 15018683|CONECTOR,TERMIN;COMPR;1FU;16MM2;NU;COBRE|RECEBIMENT|1.241,000 |1.200,000 |1.200,000 |    0,000 |   96,000 |"+
  "| 15018712|CONECTOR,TERMIN;COMPR;1FU;35MM2;NU;COBRE|RECEBIMENT|  245,000 |   20,000 |   20,000 |    0,000 |    3,920 |"+
  "----------------------------------------------------------------------------------------------------------------------"+
  "|*        |                                        |          |          |5.143,000 |5.143,000 |    0,000 |3.115,960 |"+
  "----------------------------------------------------------------------------------------------------------------------";

  public material: {
    codigo: "",
    descricao: "",
    qtd:"",
    local: ""
  };
  public listaMat = new Array<any>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private file:File) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');

    //this.file.createDir(this.file.externalRootDirectory, 'appRomaneio',false);

    //this.converteParaListaMaterais(this.texto);
    
  }

  converteParaListaMaterais(conteudo: String){

    let arrayPalavras = conteudo.split("|");
    let arrayColunas = new Array<string>();
    let count = 0;
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
          }else if (arrayColunas[j].includes("Material")){
            arrayColunas[j] = "codigo";
          }else if (arrayColunas[j].includes("empenha")){
            arrayColunas[j] = "qtd";
          }else if (arrayColunas[j].includes("origem")){
            arrayColunas[j] = "local";
          }
        }
      }else if (((arrayPalavras[i].length)<=40)&&(terminoArrayColunas)&&(arrayPalavras[i].length!=2)){
        alert("array materiais");
        this.material = JSON.parse('{"'+ arrayColunas[0]+'":"'+arrayPalavras[i]+'","'
                                       + arrayColunas[1]+'":"'+arrayPalavras[i++]+'","'
                                       + arrayColunas[2]+'":"'+arrayPalavras[i++]+'","'
                                       + arrayColunas[3]+'":"'+arrayPalavras[i++]+'"}');
        
                                      alert("array materiais1");
          
        this.listaMat.push(this.material);

        

      }else if((arrayPalavras[i].length>40)&&(countMaiorQuarenta==2)){
        break;
      }

     
      count++;
    }
  }

  abrePaginaRomaneio(){
    this.navCtrl.push(RomaneioPage)
  }

  

}
