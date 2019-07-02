import { CrmdKafkaUiService } from '../../service/crmd-kafka-ui.service';
import { Component, OnInit, Input } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Topico } from '../../model/topico';
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
  topicoHistList: TopicoHist[];

  ngOnInit() {

    this.getTopicos();

  }

  title = 'CRMD-KAFKA-UI';
  private motivoMudanca: string = '';
  private progressBar = 'hidden';
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

    this.topicoList.forEach(topico => {
      topico.datAlteracao=new Date();
      topico.loginUsuario="Kroll";
      topico.motivoParada=this.motivoMudanca;

    });

    this.crmdKafkaUiService.update(this.topicoList)
      .subscribe(parametro =>  {
        this.toastr.success('Tópicos atualizados com sucesso.');
      },
      error => {

        if (error.status == 401) {
            setTimeout(() => {this.router.navigate(['/erroAutenticacao']);}, 10);
        }
        else{
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
