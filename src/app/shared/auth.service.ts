import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/Rx';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './user.interface';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.authState;
  }

  registerUser(email: string, password: string): Observable<firebase.User> {
    const promise = this.angularFireAuth.auth.createUserWithEmailAndPassword(
      email, password)
    .then((user) => {
      user.sendEmailVerification();
      this.logout();
      return user;
    })
    // We output the error here for debugging purposes
    .catch((error) => {
      console.log(error);
      throw error;
    });
    return Observable.fromPromise(<Promise<firebase.User>>promise);
  }

  verifyMail(oobCode: string, apiKey: string) {
    const auth = this.angularFireAuth.app.auth();
    return auth.applyActionCode(oobCode)
    .catch((error) => {
      console.log(error);
      throw error;
    });
  }

  verifyPasswordReset(oobCode: string) {
    const auth = this.angularFireAuth.app.auth();
    const promise = auth.verifyPasswordResetCode(oobCode)
    .catch((error) => {
      console.log(error);
      throw error;
    });
    return Observable.fromPromise(<Promise<any>>promise);
  }

  confirmPasswordReset(oobCode: string, newPassword: string) {
    const auth = this.angularFireAuth.app.auth();
    const promise = auth.confirmPasswordReset(oobCode, newPassword)
    .catch((error) => {
      console.log(error);
      throw error;
    });
    return Observable.fromPromise(<Promise<any>>promise);
  }

  loginUser(email: string, password: string): Observable<firebase.User> {
    const promise = this.angularFireAuth.auth.signInWithEmailAndPassword(
      email, password)
    .catch((error) => {
      console.log('Error in auth service, loginUser: ' + error);
      throw error;
    });
    return Observable.fromPromise(<Promise<firebase.User>>promise);
  }

  logout() {
    return this.angularFireAuth.auth.signOut()
    .catch((error) => {
      console.log(error);
      throw error;
    });
  }

  sendPasswordRequestMail(email: string): Observable<any> {
    const auth = this.angularFireAuth.app.auth();
    return Observable.fromPromise(<Promise<any>>auth.sendPasswordResetEmail(email));
  }

  getMailAddress() {
    return this.user.first()
    .map(
      (user: firebase.User) => user.email
    );
  }

  setMailAddress(newUser: User) {
    return this.user.first()
    .flatMap(
      (user: any) => {
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email, newUser.password
        );
        const authenticated = new Subject<firebase.User>();
        user.reauthenticate(credential)
        .then(() => authenticated.next(user))
        .catch((error) => authenticated.error(error));
        return authenticated;
      }
    )
    .flatMap(
      (user) => user.updateEmail(newUser.email)
    );
  }

  setPassword(oldPassword, newPassword) {
    return this.user.first()
    .flatMap(
      (user: any) => {
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email, oldPassword
        );
        const authenticated = new Subject<firebase.User>();
        user.reauthenticate(credential)
        .then(() => authenticated.next(user))
        .catch((error) => authenticated.error(error));
        return authenticated;
      }
    )
    .flatMap(
      (user) => user.updatePassword(newPassword)
    );
  }

  isAuthenticated() {
    return this.user
    .map(
      (user) => {
        if (user == null) {
          return false;
        } else {
          return true;
        }
      }
    );

  }
}
