import { Component, Input } from '@angular/core';
import { Dismiss } from 'flowbite';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html'
})
export class PopupComponent {

  colors = {
    'gray': 'text-gray-800 border-gray-300 bg-gray-50 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600',
    'yellow': 'text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800',
    'green': 'text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800',
    'red': 'text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800',
    'blue': 'text-blue-800 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800'
  };

  @Input() popupId: string = '';
  @Input() message: string = '';
  @Input() color: keyof typeof this.colors = 'gray';
  show: boolean = false;

  popup!: Dismiss;

  initPopup() {
    if (this.popup == undefined)
      this.popup = new Dismiss(document.getElementById('alert-' + this.popupId), null, {
        transition: 'transition-opacity',
        duration: 1000,
        timing: 'ease-out',
        onHide: () => {
          this.show = false;
          console.log(this.show);
        }
      });
  }

  showPopup(){
    this.show = true;
  }

  hidePopup() {
    this.popup.hide();
  }

}
