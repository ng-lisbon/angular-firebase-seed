import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HeaderComponent } from './shared/header.component';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { NotAuthGuard } from './shared/notauth.guard';
import { HomeComponent } from './home.component';
import { AlertsService } from './shared/alerts/alerts.service';
import { AlertsComponent } from './shared/alerts/alerts.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TokenInterceptor} from "./shared/interceptors/token-interceptor";



export const firebaseConfig = {
  apiKey: "AIzaSyCQqiJXZ5eqW09b8eXND2FfsVXwGjojnZM",
  authDomain: "realtylandingpage.firebaseapp.com",
  databaseURL: "https://realtylandingpage.firebaseio.com",
  projectId: "realtylandingpage",
  storageBucket: "realtylandingpage.appspot.com",
  messagingSenderId: "529210589827"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertsComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    NgbModule.forRoot(),
    routing
  ],
  providers: [
    AuthService,
    AuthGuard,
    NotAuthGuard,
    AlertsService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
