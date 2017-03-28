import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/Rx';

import * as firebase from 'firebase';
import { AngularFire, FirebaseApp, FirebaseAuthState } from 'angularfire2';

import { User } from './user.interface';

@Injectable()
export class AuthService {

  constructor(private angularFire: AngularFire,
      @Inject(FirebaseApp) private fbApp: firebase.app.App) {
  }

  registerUser(user: User): Observable<FirebaseAuthState> {
    const promise = this.angularFire.auth.createUser(user)
    .then((auth) => {
      auth.auth.sendEmailVerification();
      this.logout();
      return auth;
    })
    // We output the error here for debugging purposes
    .catch((error) => {
      console.log(error);
      throw error;
    });
    return Observable.fromPromise(<Promise<FirebaseAuthState>>promise);
  }

  verifyMail(oobCode: string, apiKey: string) {
    const auth = this.fbApp.auth();
    return auth.applyActionCode(oobCode)
    .catch((error) => {
      console.log(error);
      throw error;
    });
  }

  verifyPasswordReset(oobCode: string) {
    const auth = this.fbApp.auth();
    const promise = auth.verifyPasswordResetCode(oobCode)
    .catch((error) => {
      console.log(error);
      throw error;
    });
    return Observable.fromPromise(<Promise<any>>promise);
  }

  confirmPasswordReset(oobCode: string, newPassword: string) {
    const auth = this.fbApp.auth();
    const promise = auth.confirmPasswordReset(oobCode, newPassword)
    .catch((error) => {
      console.log(error);
      throw error;
    });
    return Observable.fromPromise(<Promise<any>>promise);
  }

  loginUser(user: User): Observable<FirebaseAuthState> {
    const promise = this.angularFire.auth.login(user)
    .catch((error) => {
      console.log('Error in auth service, loginUser: ' + error);
      throw error;
    });
    return Observable.fromPromise(<Promise<FirebaseAuthState>>promise);
  }

  logout() {
    return this.angularFire.auth.logout()
    .catch((error) => {
      console.log(error);
      throw error;
    });
  }

  sendPasswordRequestMail(email: string): Observable<any> {
    const auth = this.fbApp.auth();
    return Observable.fromPromise(<Promise<any>>auth.sendPasswordResetEmail(email));
  }

  getMailAddress() {
    return this.angularFire.auth.map(
      (auth) => auth.auth.email
    );
  }

  setMailAddress(newUser: User) {
    return this.angularFire.auth.first()
    .flatMap(
      (auth) => {
        const credential = firebase.auth.EmailAuthProvider.credential(
          auth.auth.email, newUser.password
        );
        const authenticated = new Subject<FirebaseAuthState>();
        auth.auth.reauthenticate(credential)
        .then(() => authenticated.next(auth))
        .catch((error) => authenticated.error(error));
        return authenticated;
      }
    )
    .flatMap(
      (auth) => auth.auth.updateEmail(newUser.email)
    );
  }

  setPassword(oldPassword, newPassword) {
    return this.angularFire.auth.first()
    .flatMap(
      (auth) => {
        const credential = firebase.auth.EmailAuthProvider.credential(
          auth.auth.email, oldPassword
        );
        const authenticated = new Subject<FirebaseAuthState>();
        auth.auth.reauthenticate(credential)
        .then(() => authenticated.next(auth))
        .catch((error) => authenticated.error(error));
        return authenticated;
      }
    )
    .flatMap(
      (auth) => auth.auth.updatePassword(newPassword)
    );
  }

  isAuthenticated() {
    return this.angularFire.auth.map(
      (auth) => {
        if (auth == null) {
          return false;
        } else {
          return true;
        }
      }
    );

  }
}
