import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl : string = "https://jsonplaceholder.typicode.com"
  constructor(private httpClient : HttpClient) { }

  public callGet(url : string, params : any, callBack : any) {
    const getUrl : string = this.baseUrl + url
    params = params ?? {}
    this.httpClient.get(getUrl, {params: params}).pipe(catchError(this.handleError)).subscribe(callBack)
  }

  public callPost(url : string, body : any, callBack : any) {
    const postUrl : string = this.baseUrl + url
    body = body ?? {}
    this.httpClient.post(postUrl, body).pipe(catchError(this.handleError))
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } 
    else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
