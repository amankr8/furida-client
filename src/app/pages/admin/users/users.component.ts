import { Component } from '@angular/core';
import { CardsComponent } from './components/cards/cards.component';
import { CommonModule } from '@angular/common';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CardsComponent, CommonModule, NavToolbarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  headerText: string = 'Users';
  buttonText: string = 'Add User';
  childLevelLink: string = 'signup';
}
