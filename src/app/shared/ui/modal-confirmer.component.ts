import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmer',
  standalone: true,
  imports: [
    NgbModalModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ title() }}</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="dismiss()"></button>
    </div>
    <div class="modal-body">
      <p>{{ message() }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="yes()">{{ yesButtonLabel() }}</button>
      <button type="button" class="btn btn-default" (click)="no()">{{ noButtonLabel() }}</button>
    </div>`,
})
export class ModalConfirmerComponent {
  title = signal<string | undefined>(undefined);
  message = signal<string | undefined>(undefined);
  yesButtonLabel = signal<string | undefined>(undefined);
  noButtonLabel = signal<string | undefined>(undefined);

  private activeModal = inject(NgbActiveModal);

  yes(): void {
    this.activeModal.close(true);
  }

  no(): void {
    this.activeModal.close(false);
  }

  dismiss(): void {
    this.activeModal.dismiss('Dismiss click');
  }
}
