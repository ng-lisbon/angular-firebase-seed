import { NgModule } from '@angular/core';

import { MatchPasswordDirective } from './match-password.directive';

@NgModule({
  declarations: [
    MatchPasswordDirective
  ],
  exports: [
    MatchPasswordDirective
  ]
})
export class SharedModule {}