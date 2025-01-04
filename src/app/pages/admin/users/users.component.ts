import { Component } from '@angular/core';
import { UserCardsComponent } from './components/user-cards/user-cards.component';
import { CommonModule } from '@angular/common';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    UserCardsComponent,
    CommonModule,
    NavToolbarComponent,
    MatTabsModule,
    SignupFormComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  headerText: string = 'Users';
  buttonText: string = 'Add User';
  childLevelLink: string = 'signup';
}
