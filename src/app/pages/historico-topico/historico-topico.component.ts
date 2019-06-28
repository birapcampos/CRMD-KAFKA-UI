import { Component, OnInit } from '@angular/core';

import { TopicoHist } from '../../model/topicoHist';

import { Topico } from 'src/app/model/topico';

import { CrmdKafkaUiService } from '../../service/crmd-kafka-ui.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-historico-topico',
  templateUrl: './historico-topico.component.html'
})
export class HistoricoTopicoComponent implements OnInit {

  idhistorico : number;
  historico: TopicoHist[];

  constructor(private crmdKafkaUiService: CrmdKafkaUiService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
     this.route.queryParams
     .subscribe(params => {
          this.idhistorico = params['idhist'];
      });

      this.getTopicoHist()
  }

  getTopicoHist(): void {
    this.crmdKafkaUiService.getTopicoHist(this.idhistorico)
      .subscribe(result =>
        {
          this.historico=result;
          console.log('Buscando histórico de tópicos hist compoment...');
          console.log(this.historico);
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

  voltar(){
    this.router.navigate(['/topicos']);
  }

}
