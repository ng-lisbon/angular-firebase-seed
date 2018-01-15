import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private angularFireAuth: AngularFireAuth) {}



  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,

  ): Observable<HttpEvent<any>> {

    return next.handle(req).do(evt => {
      if (evt instanceof HttpResponse) {
        this.angularFireAuth.app.auth().currentUser.getIdToken(true).then((token)=> {
          console.log(token);
          console.log('---> status:', evt.status);
          console.log('---> filter:', req.params.get('filter'));
        });
      }
    });

  }
}

