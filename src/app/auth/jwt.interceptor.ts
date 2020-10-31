import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '../core/services/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url

       if (this.authService.isAuthenticated()) {

         const token = this.authService.getToken();

         if (token) {
           request = request.clone({
             setHeaders: {
               Authorization: `Bearer ${token}`
             }
           });
         }
       }
       return next.handle(request);
    }
}
