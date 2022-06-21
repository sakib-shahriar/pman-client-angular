import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../services/token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class IsAuthenticated implements CanActivate {
    constructor(private tokenStorage : TokenStorageService, private router : Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.tokenStorage.getUser()) {
            return true
        }
        this.router.navigateByUrl("/login")
        return false
    }
}