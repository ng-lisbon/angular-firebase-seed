import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { AlertsService } from '../shared/alerts/alerts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  wasRegistered = false;

  constructor(private authService: AuthService, private router: Router,
    private alertsService: AlertsService) { }

  onSubmit(registerForm: NgForm) {
    this.authService.registerUser(registerForm.value.email,
      registerForm.value.password)
    .subscribe(
      (auth) => {
        this.wasRegistered = true
      },
      (error) => {
        this.alertsService.addAlert({
          type: 'danger',
          message: 'Could not register. Please check if your e-mail address is valid and if your password contains at least 6 characters.'
        }, true);
      }
    );
  }

  ngOnInit() {
  }

}
