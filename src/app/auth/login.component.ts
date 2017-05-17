import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { AlertsService} from '../shared/alerts/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  alerts = [];

  constructor(private authService: AuthService, private router: Router,
    private alertsService: AlertsService) { }
  
  onSubmit(loginForm: NgForm) {
    this.authService.loginUser(loginForm.value.email, loginForm.value.password).first()
    .subscribe(
      (auth) => {
        this.router.navigate(['/profile'])
      },
      (error) => {
        this.alertsService.addAlert({
          type: 'danger',
          message: 'Could not log in. Please check e-mail and password.'
        }, true);
      }
    );
  }

  ngOnInit() {
  }

}
