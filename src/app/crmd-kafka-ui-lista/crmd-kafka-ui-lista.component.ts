import { SetFocusDirective } from './../set-focus.directive';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crmd-kafka-ui-lista',
  templateUrl: './crmd-kafka-ui-lista.component.html'
})
export class CrmdKafkaUiListaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  title = 'CRMD-KAFKA-UI';
  private motivoParada : string = '';
  private desabilitaMotivo : boolean = true;
  private isFocus : boolean = false;

  topicos = [
    {id: '1', nome: 'NOVO CLINTE', tipo: 'Waiting MBIO', status: 'Ativo', horastart: '18:30'},
    {id: '2', nome: 'PROPOSTA', tipo: 'Running', status: 'Ativo', horastart: '19:00'},
    {id: '3', nome: 'MANUTENÇÃO', tipo: 'Error', status: 'Ativo', horastart: '20:00'},
    {id: '4', nome: 'MANUTENÇÃO SOB DEMANDA', tipo: 'Error', status: 'Ativo', horastart: '20:30'},
    {id: '5', nome: 'PESSOA JURIDICA', tipo: 'NA', status: 'Ativo', horastart: '21:30'}
 ];

 salvar(form : NgForm){
    console.log('Salvando: ' + this.motivoParada);
    console.log(form);
 }

 StartServico(idparam : string){
  this.desabilitaMotivo=true;
  this.isFocus=false;
  console.log('Serviço Iniciado...');
  console.log('Id no Start: ' + idparam);
  this.topicos.forEach(topico =>
  {
     if(idparam == topico.id)
        topico.status = "Ativo";
  });
 }

 StopServico(idparam : string){
    this.desabilitaMotivo=false;
    this.isFocus=true;
    console.log('Serviço Parado...');
    console.log('Id no Stop: ' + idparam);
    this.topicos.forEach(topico =>
    {
       if(idparam == topico.id)
          topico.status = "Inativo";
    });
 }
}
