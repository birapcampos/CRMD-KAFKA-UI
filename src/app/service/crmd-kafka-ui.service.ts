import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, flatMap } from 'rxjs/operators';

import { Topico } from '../model/topico';
import { environment } from '../environments/environment';
import { TopicoHist } from '../model/topicoHist';

@Injectable({
  providedIn: 'root'
})

export class CrmdKafkaUiService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getCookie()
    })
  };

  getTopicos(): Observable<Topico[]> {
    return this.http.get<Topico[]>(this.apiUrl + "/topics" , this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToTopicos)
      );
  }

  getById(id: number): Observable<Topico> {
    return this.http.get<Topico>(this.apiUrl +"/" + id , this.httpOptions)
    .pipe(
      catchError(this.handleError),
      map(this.jsonDataToTopico)
    );
  }

  getTopicoHist(idparam: number): Observable<TopicoHist[]> {
    return this.http.get<TopicoHist[]>(this.apiUrl + "/topics/" + idparam + "/history" , this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToTopicoHist)
      );
  }

  update(topicos: Topico[]): Observable<Topico[]> {
    return this.http.put<Topico[]>(this.apiUrl + "/topics", topicos ,  this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  private jsonDataToTopico(jsonData: any): Topico{
    return jsonData as Topico;
}

  private jsonDataToTopicos(jsonData: any[]): Topico[]{
      const topicos: Topico[] = [];
      jsonData.forEach(element => topicos.push(element as Topico));
      return topicos;
  }

  private jsonDataToTopicoHist(jsonData: any[]): TopicoHist[]{
    const topicohist: TopicoHist[] = [];
    jsonData.forEach(element => topicohist.push(element as TopicoHist));
    return topicohist;
}

  private getCookie(): string {
    return this.cookieService.get(environment.nomeCookie);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro no cliente:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(error);
  };

}
