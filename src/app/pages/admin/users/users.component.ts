import { Component } from '@angular/core';
import { Level1HeaderComponent } from '../components/level-1-header/level-1-header.component';
import { CardsComponent } from './components/cards/cards.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [Level1HeaderComponent, CardsComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  headerText: string = 'Users';
  buttonText: string = 'Add New User';
  childLevelLink: string = 'signup';
}
