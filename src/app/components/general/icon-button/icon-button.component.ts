import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: []
})
export class IconButtonComponent {
  @Input() icon: string = '';
}
