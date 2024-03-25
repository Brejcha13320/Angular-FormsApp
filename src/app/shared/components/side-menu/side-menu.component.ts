import { Component } from '@angular/core';

interface MenuItem {
  title: string,
  url: string
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {

  reactiveMenu: MenuItem[] = [
    { title: 'Básicos', url: './reactive/basic'},
    { title: 'Dinamicos', url: './reactive/dynamic'},
    { title: 'Switches', url: './reactive/switches'},
  ]
  authMenu: MenuItem[] = [
    { title: 'Registro', url: './auth/register'},
  ]

}
