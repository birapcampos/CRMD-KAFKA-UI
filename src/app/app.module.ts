import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';

import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
import { CrmdKafkaUiListaComponent } from './pages/crmd-kafka-ui-lista/crmd-kafka-ui-lista.component';

import {InputTextareaModule} from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import {InputMaskModule} from 'primeng/inputmask';

import {ProgressBarModule} from 'primeng/progressbar';

import { ErroAutenticacaoComponent } from './erro-autenticacao/erro-autenticacao.component';

import { CrmdKafkaUiService } from './service/crmd-kafka-ui.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule }    from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { HistoricoTopicoComponent } from './pages/historico-topico/historico-topico.component';

@NgModule({
  declarations: [
    AppComponent,
    CrmdKafkaUiListaComponent,
    ErroAutenticacaoComponent,
    HistoricoTopicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextareaModule,
    FormsModule,
    InputMaskModule,
    HttpClientModule,
    ProgressBarModule,
    ToastrModule.forRoot()
  ],
  providers: [CrmdKafkaUiService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
