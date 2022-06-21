import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

const TOKEN_HEADER_KEY = 'authorization'; 

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl : string = "http://localhost:8080"

  constructor(private httpClient : HttpClient, private tokenStorage: TokenStorageService) { }

  private getHeaders() {
    const token = this.tokenStorage.getToken() ?? ""
    const authHeader = token ? 'Bearer ' + token : ""
    const headres : HttpHeaders = new HttpHeaders().append('Content-Type', 'application/json')
                                                  .append(TOKEN_HEADER_KEY, authHeader)
    return headres
  }

  public callGet(url : string, params : any, callBack : any) {
    const getUrl : string = this.baseUrl + url
    this.httpClient.get(getUrl, {headers: this.getHeaders()}).pipe(catchError(this.handleError)).subscribe(callBack)
  }

  public callPost(url : string, body : any, callBack : any) {
    body = body ?? {}
    const postUrl : string = this.baseUrl + url
    this.httpClient.post(postUrl, body, {headers: this.getHeaders()}).pipe(catchError(this.handleError)).subscribe(callBack)
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
