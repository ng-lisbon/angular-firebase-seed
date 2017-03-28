import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfileComponent } from './profile.component';
import { profileRouting } from './profile.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    profileRouting
  ]
})
export class ProfileModule {}
