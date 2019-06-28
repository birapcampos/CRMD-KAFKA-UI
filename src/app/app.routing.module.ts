import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErroAutenticacaoComponent } from './erro-autenticacao/erro-autenticacao.component';

import { HistoricoTopicoComponent } from './pages/historico-topico/historico-topico.component';
import { CrmdKafkaUiListaComponent } from './pages/crmd-kafka-ui-lista/crmd-kafka-ui-lista.component';

const routes: Routes = [
  {
    path: "topicos", component: CrmdKafkaUiListaComponent
  },
  {
    path: "erroAutenticacao", component: ErroAutenticacaoComponent
  },
  {
    path: "historicoTipico", component: HistoricoTopicoComponent
  },
  {
    path: '**', redirectTo: '/', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
