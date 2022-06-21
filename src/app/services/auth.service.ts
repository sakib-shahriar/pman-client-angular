import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService : HttpService, private tokenStorage : TokenStorageService, private router : Router) { }

  public login(userName : string, password : string) {
    this.httpService.callPost("/authenticate", {userName: userName, password : password}, (resp : any) => {
      this.tokenStorage.saveToken(resp.jwt)
      this.tokenStorage.saveUser(resp.userName)
      this.router.navigateByUrl("/dashboard")
    })
  }

  public logout() {
    this.tokenStorage.signOut()
    this.router.navigateByUrl("/login")
  }
}
