import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAddComponent]',
})
export class AddContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
