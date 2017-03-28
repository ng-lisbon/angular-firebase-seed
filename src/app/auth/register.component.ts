import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  wasRegistered = false;
  alerts = [];

  constructor(private authService: AuthService, private router: Router) { }

  onCloseAlert(alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
  onSubmit(registerForm: NgForm) {
    this.authService.registerUser({ email: registerForm.value.email,
      password: registerForm.value.password }).first()
    .subscribe(
      (auth) => {
        this.wasRegistered = true
      },
      (error) => {
        this.alerts.push({
          type: 'danger',
          message: 'Could not register. Please check if your e-mail address is valid and if your password contains at least 6 characters.'
        })
      }
    );
  }

  ngOnInit() {
  }

}
