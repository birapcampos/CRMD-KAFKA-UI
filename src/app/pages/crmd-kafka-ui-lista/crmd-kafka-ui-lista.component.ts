import { CrmdKafkaUiService } from '../../service/crmd-kafka-ui.service';
import { Component, OnInit, Input, SystemJsNgModuleLoader } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Topico } from '../../model/topico';
import { TopicoSave } from '../../model/topicoSave';
import { TopicoHist } from '../../model/topicoHist';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crmd-kafka-ui-lista',
  templateUrl: 'crmd-kafka-ui-lista.component.html'
})
export class CrmdKafkaUiListaComponent implements OnInit {

  constructor(private crmdKafkaUiService: CrmdKafkaUiService,
            private router: Router,
            private toastr: ToastrService ) { }

  topicoList: Topico[];
  topicoListSave: TopicoSave[] = new Array();
  topicoHistList: TopicoHist[];
  topicoSave : TopicoSave;
  motivoMudanca: string;

  ngOnInit() {

    this.getTopicos();

  }

  title = 'CRMD-KAFKA-UI';
  private clikSalvar : boolean=true;
  private progressBar : boolean=false;
  private desabilitaMotivo : boolean = true;
  private isFocus : boolean = false;


 getTopicos(): void {
  this.crmdKafkaUiService.getTopicos()
    .subscribe(result =>
      {
        this.topicoList=result;
      },
    error => {
     if (error.status == 401) {
        setTimeout(() => {
          this.router.navigate(['/erroAutenticacao']);
        }, 10);
      }
    }
    );
}

 salvar(form : NgForm){
    console.log('Salvando: ' + this.motivoMudanca);
    this.clikSalvar=false;
    this.progressBar=true;
    this.topicoList.forEach(topico => {

    this.topicoSave = new TopicoSave();
    this.topicoSave.id=topico.id;
    this.topicoSave.status=topico.status;
    this.topicoSave.horaInicio=topico.horaInicio;
    this.topicoSave.horaParada=topico.horaParada;
    this.topicoSave.motivoParada=topico.motivoParada;
    this.topicoSave.loginUsuario="Kroll";

    this.topicoListSave.push(this.topicoSave);

      /*
      topico.datAlteracao=new Date();
      topico.loginUsuario="Kroll";
      topico.motivoParada=this.motivoMudanca;
      topico.datAlteracao= new Date();
      */
    });

    this.topicoListSave.forEach(topicosave => {
      console.log(topicosave);
    });

    this.crmdKafkaUiService.update(this.topicoListSave)
      .subscribe(parametro =>  {
        this.toastr.success('Tópicos atualizados com sucesso.');
        this.clikSalvar=true;
        this.progressBar=false;
      },
      error => {

        if (error.status == 401) {
          this.progressBar=false;
            setTimeout(() => {this.router.navigate(['/erroAutenticacao']);}, 10);

        }
        else{
            this.progressBar=false;
            this.toastr.success('Erro Status : ' + error.status, ' Mensagem: ' + error.message);
        }
      }
      );
 }

 StartServico(idparam : number){
  this.desabilitaMotivo=true;
  this.isFocus=false;
  console.log('Serviço Iniciado...');
  console.log('Id no Start: ' + idparam);
  this.topicoList.forEach(topico =>
  {
     if(idparam == topico.id){
      topico.status = "ATIVO";
      console.log('Start novo Status ' + topico.status);
     }

  });
 }

 StopServico(idparam : number){
    this.desabilitaMotivo=false;
    this.isFocus=true;
    console.log('Serviço Parado...');
    console.log('Id no Stop: ' + idparam);
    this.topicoList.forEach(topico =>
    {
       if(idparam == topico.id){
        topico.status = "INATIVO";
        console.log('Stop Novo Status ' + topico.status);
       }

    });
 }


HistoricoTopico(idparam: number){
  this.router.navigate(['/historicoTipico'], { queryParams: { idhist: idparam } });
}

getHora(topico: Topico): string {

  let newdata = new Date(topico.datAlteracao);
  let hora = newdata.getHours().toString();
  let minuto = newdata.getUTCMinutes().toString();
  const paddedMinuto: string = `0${minuto}`;

  if(minuto=='0')
    return `${hora}:${paddedMinuto}`;
  else
    return `${hora}:${minuto}`;

}

getDataHora(horaparam: string): Date {
  let horaAgenda = new Date();
  let ano: string = horaAgenda.getFullYear().toString();
  let mes: string = horaAgenda.getMonth().toString();
  let dia: string = horaAgenda.getDate().toString();
  const paddedMonth: string = `0${mes}`;
  return new Date(`${ano}-${paddedMonth}-${dia} ${horaparam}`);
 }

}
