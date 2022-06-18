import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  // From Angular Material, open and close sidebar nav
  @Input() opened: boolean = false;

  constructor() { }
}
