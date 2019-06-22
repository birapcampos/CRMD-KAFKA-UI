import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './crmd-kafka-ui.component.html',
  styleUrls: ['./crmd-kafka-ui.component.css']
})
export class AppComponent {
  title = 'CRMD-KAFKA-UI';

  topicos = [
    {nome: 'NOVO CLINTE', tipo: 'NA', status: 'Ativo', horastart: '18:30'},
    {nome: 'PROPOSTA', tipo: 'NA', status: 'Ativo', horastart: '19:00'},
    {nome: 'MANUTENÇÃO', tipo: 'NA', status: 'Ativo', horastart: '20:00'}
 ];

}
