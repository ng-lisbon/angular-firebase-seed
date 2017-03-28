import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  alerts = [];

  constructor(private authService: AuthService, private router: Router) { }

  onCloseAlert(alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
  
  onSubmit(loginForm: NgForm) {
    this.authService.loginUser(loginForm.value).first()
    .subscribe(
      (auth) => {
        this.router.navigate(['/profile'])
      },
      (error) => {
        this.alerts.push({
          type: 'danger',
          message: 'Could not log in. Please check e-mail and password.'
        })
      }
    );
  }

  ngOnInit() {
  }

}
