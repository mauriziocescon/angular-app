import { inject, Injectable } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ModalAlertComponent } from './modal-alert.component';
import { ModalConfirmerComponent } from './modal-confirmer.component';

@Injectable({
  providedIn: 'root',
})
export class UIUtilitiesService {
  protected modalService = inject(NgbModal);

  modalAlert(title: string, message: string, buttonLabel: string): void {
    const modalRef = this.modalService.open(ModalAlertComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.buttonLabel = buttonLabel;

    modalRef.result
      .then(result => console.log(`Closed with: ${result}`))
      .catch(reason => console.log(`Dismissed ${this.getDismissReason(reason)}`));
  }

  modalConfirmer(title: string, message: string, yesButtonLabel: string, noButtonLabel: string, callback: (result: boolean) => void): void {
    const modalRef = this.modalService.open(ModalConfirmerComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.yesButtonLabel = yesButtonLabel;
    modalRef.componentInstance.noButtonLabel = noButtonLabel;

    modalRef.result
      .then(result => {
        console.log(`Closed with: ${result}`);
        callback(result);
      })
      .catch(reason => console.log(`Dismissed ${this.getDismissReason(reason)}`));
  }

  protected getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
