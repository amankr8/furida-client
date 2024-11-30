import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  form!: FormGroup;
  isLoading = false;

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [
        Validators.required,
        Validators.maxLength(510),
      ]),
    });
  }

  submit() {}
}
