import { Component, inject, signal } from '@angular/core';
import { Level2HeaderComponent } from '../../components/level-2-header/level-2-header.component';
import { SignupFormComponent } from '../components/signup-form/signup-form.component';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AdminHeaderComponent, Level2HeaderComponent, SignupFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  headerText: string = 'Add New User';
}
