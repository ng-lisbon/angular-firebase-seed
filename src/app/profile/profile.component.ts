import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../shared/auth.service';
import { AlertsService } from '../shared/alerts/alerts.service';

@Component({
  selector: 'app-tester',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  userEmail = '';
  alerts = [];

  constructor(private authService: AuthService,
    private alertsService: AlertsService) { }

  onChangeMail(form: NgForm) {
    this.authService.setMailAddress(form.value)
    .subscribe(
      () => {
        this.userEmail = form.value.email;
        form.reset();
        this.alertsService.addAlert({
          type: 'success',
          message: 'Your e-mail address was changed successfully.'
        }, true);
      },
      (error) => {
        let message = 'Please check if your new e-mail address is valid.';
        if (error.code == 'auth/wrong-password') {
          message = 'Please check your password.'
        }
        this.alertsService.addAlert({
          type: 'danger',
          message: 'Could not change e-mail address. ' + message
        }, true);
      }
    );
  }

  onChangePassword(form: NgForm) {
    this.authService.setPassword(form.value.oldPassword, form.value.password)
    .first()
    .subscribe(
      () => {
        form.reset()
        this.alertsService.addAlert({
          type: 'success',
          message: 'Your password was changed successfully.'
        }, true);
      },
      (error) => {
        let message = 'Please check that your new password contains at least 6 characters.';
        if (error.code == 'auth/wrong-password') {
          message = 'Please check your old password.'
        }
        this.alertsService.addAlert({
          type: 'danger',
          message: 'Could not change password. ' + message
        }, true);
      }
    );
  }

  ngOnInit() {
    this.authService.getMailAddress().first().subscribe(
      (email) => this.userEmail = email
    )
  }

}
