import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';

import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
import { CrmdKafkaUiListaComponent } from './crmd-kafka-ui-lista/crmd-kafka-ui-lista.component';

import {InputTextareaModule} from 'primeng/inputtextarea';

import { FormsModule } from '@angular/forms';
import { SetFocusDirective } from './set-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    CrmdKafkaUiListaComponent,
    SetFocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextareaModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
