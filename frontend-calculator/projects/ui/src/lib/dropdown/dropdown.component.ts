import { Component, Input } from '@angular/core';
import { MenuItem } from 'shared';

@Component({
  selector: 'lib-drop-down',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropDownComponent {
  @Input() items: MenuItem[] = [{text: 'sample text', link: 'sample link'}]
  @Input() dropdownLabel = 'Dropdown';
}