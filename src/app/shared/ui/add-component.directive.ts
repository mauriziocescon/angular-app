import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAddComponent]',
  standalone: true,
})
export class AddContainerDirective {
  viewContainerRef = inject(ViewContainerRef);
}
