import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: []
})
export class ConfirmDialogComponent {
  @Output('noAction') noAction: EventEmitter<any> = new EventEmitter();
  @Output('yesAction') yesAction: EventEmitter<any> = new EventEmitter();

  @Input() firstLineText: string = '';
  @Input() secondLineText: string = '';
  @Input() modalId: string = '';

  modal!: Modal;

  initModal(){
    if(this.modal == undefined)
      this.modal = new Modal(document.getElementById('popup-modal-'+this.modalId));
  }

  openModal(){
    this.initModal();
    this.modal.show();
  }

  closeModal() {
    this.modal.hide();
  }
}
