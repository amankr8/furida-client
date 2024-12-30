import { Component } from '@angular/core';
import { SignupFormComponent } from '../components/signup-form/signup-form.component';
import { CommonModule } from '@angular/common';
import { NavToolbarComponent } from '../../components/nav-toolbar/nav-toolbar.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SignupFormComponent, CommonModule, NavToolbarComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  headerText: string = 'Add New User';
}
