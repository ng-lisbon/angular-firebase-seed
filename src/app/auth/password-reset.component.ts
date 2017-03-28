import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styles: []
})
export class PasswordResetComponent implements OnInit {
  alerts = [];

  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    this.authService.sendPasswordRequestMail(form.value.email)
    .subscribe(
      () => {
        form.reset();
        this.alerts.push({
          type: 'success',
          message: 'An email to reset your password has been sent. Please check your inbox and click on the link to continue the reset process.'
        })
      }
    );
  }

  ngOnInit() {
  }

}
