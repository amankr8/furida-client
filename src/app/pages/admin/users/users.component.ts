import { Component } from '@angular/core';
import { Level1HeaderComponent } from '../components/level-1-header/level-1-header.component';
import { CardsComponent } from './components/cards/cards.component';
import { CommonModule } from '@angular/common';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    Level1HeaderComponent,
    CardsComponent,
    CommonModule,
    NavToolbarComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  // To be removed in v2.2.0
  newNavToolbar: boolean = true;

  headerText: string = 'Users';
  buttonText: string = 'Add User';
  childLevelLink: string = 'signup';
}
