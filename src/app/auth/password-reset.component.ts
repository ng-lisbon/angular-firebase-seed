import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../shared/auth.service';
import { AlertsService } from '../shared/alerts/alerts.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styles: []
})
export class PasswordResetComponent implements OnInit {

  constructor(private authService: AuthService,
    private alertsService: AlertsService) { }

  onSubmit(form: NgForm) {
    this.authService.sendPasswordRequestMail(form.value.email)
    .subscribe(
      () => {
        form.reset();
        this.alertsService.addAlert({
          type: 'success',
          message: 'An email to reset your password has been sent. Please check your inbox and click on the link to continue the reset process.'
        }, true);
      }
    );
  }

  ngOnInit() {
  }

}
