import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-tester',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  userEmail = '';
  alerts = [];

  constructor(private authService: AuthService) { }

  onCloseAlert(alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  onChangeMail(form: NgForm) {
    this.authService.setMailAddress(form.value)
    .subscribe(
      () => {
        this.userEmail = form.value.email;
        form.reset();
        this.alerts.push({
          type: 'success',
          message: 'Your e-mail address was changed successfully.'
        });
      },
      (error) => {
        let message = 'Please check if your new e-mail address is valid.';
        if (error.code == 'auth/wrong-password') {
          message = 'Please check your password.'
        }
        this.alerts.push({
          type: 'danger',
          message: 'Could not change e-mail address. ' + message
        });
      }
    );
  }

  onChangePassword(form: NgForm) {
    this.authService.setPassword(form.value.oldPassword, form.value.password)
    .first()
    .subscribe(
      () => {
        form.reset()
        this.alerts.push({
          type: 'success',
          message: 'Your password was changed successfully.'
        });
      },
      (error) => {
        let message = 'Please check that your new password contains at least 6 characters.';
        if (error.code == 'auth/wrong-password') {
          message = 'Please check your old password.'
        }
        this.alerts.push({
          type: 'danger',
          message: 'Could not change password. ' + message
        });
      }
    );
  }

  ngOnInit() {
    this.authService.getMailAddress().first().subscribe(
      (email) => this.userEmail = email
    )
  }

}
