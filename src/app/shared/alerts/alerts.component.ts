import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { AlertsService } from './alerts.service'
import { Alert } from './alert.interface';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styles: []
})
export class AlertsComponent implements OnInit {
  alerts: Alert[];

  constructor(private alertsService: AlertsService, private router: Router) { }

  onCloseAlert(alert) {
    this.alertsService.removeAlert(alert);
  }

  ngOnInit() {
    this.alerts = this.alertsService.getAlerts();
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.alertsService.reset();
          this.alerts = this.alertsService.getAlerts();
        }
      }
    )
  }

}
