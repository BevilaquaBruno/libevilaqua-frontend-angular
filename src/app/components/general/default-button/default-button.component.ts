import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: []
})
export class DefaultButtonComponent {

  @Input() disabled: boolean = false;
  @Input() classes: string = '';
  @Output('action') action: EventEmitter<any> = new EventEmitter();

}
