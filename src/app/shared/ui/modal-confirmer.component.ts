import { Component, inject, Input } from '@angular/core';

import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmer',
  standalone: true,
  imports: [
    NgbModalModule,
  ],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ title }}</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="dismiss()"></button>
    </div>
    <div class="modal-body">
      <p>{{ message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="yes()">{{ yesButtonLabel }}</button>
      <button type="button" class="btn btn-default" (click)="no()">{{ noButtonLabel }}</button>
    </div>`,
})
export class ModalConfirmerComponent {
  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Input() yesButtonLabel: string | undefined;
  @Input() noButtonLabel: string | undefined;

  protected activeModal = inject(NgbActiveModal);

  yes(): void {
    this.activeModal.close(true);
  }

  no(): void {
    this.activeModal.close(false);
  }

  dismiss(): void {
    this.activeModal.dismiss('Close click');
  }
}