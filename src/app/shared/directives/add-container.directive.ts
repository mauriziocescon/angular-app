import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[app-add-component]",
})
export class AddContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
