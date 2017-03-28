import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Alert } from './alert.interface';

@Injectable()
export class AlertsService {
  alerts: Alert[] = [];

  constructor() { }

  getAlerts(): Alert[] {
    return this.alerts;
  }

  addAlert(alert: Alert, selfClosing: boolean = false) {
    this.alerts.push(alert);
    if (selfClosing) {
      Observable.timer(10000).subscribe(() => {
        this.removeAlert(alert);
      });
    }
  }

  removeAlert(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = [];
  }
}
