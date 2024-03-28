import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-alert',
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
      <button type="button" class="btn btn-primary" (click)="close()">{{ buttonLabel() }}</button>
    </div>`,
})
export class ModalAlertComponent {
  title = signal<string | undefined>(undefined);
  message = signal<string | undefined>(undefined);
  buttonLabel = signal<string | undefined>(undefined);

  private activeModal = inject(NgbActiveModal);

  close(): void {
    this.activeModal.close('Close click');
  }

  dismiss(): void {
    this.activeModal.dismiss('Dismiss click');
  }
}
