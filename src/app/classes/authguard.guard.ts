import { ApiService } from './../api.service';


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';


@Injectable({
providedIn: 'root'
})

export class AuthguardGuard implements CanActivate {
constructor(private apiservice: ApiService,private router: Router ) {}
canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot): boolean {

    const routeurl: string = state.url;
    return this.isLogin(routeurl);
}

isLogin(routeurl: string) {
if (this.apiservice.isLoggedIn()) {
    return true;
}

this.apiservice.redirectUrl = routeurl;
this.router.navigate(['/login']);
}
}