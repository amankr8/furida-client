import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { ContactService } from '../../../../service/contact/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private snackBarRef = inject(MatSnackBar);

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      msg: new FormControl('', [
        Validators.required,
        Validators.maxLength(510),
      ]),
    });
  }

  resetForm() {
    this.form.reset();
  }

  submit() {
    this.isLoading = true;
    this.contactService.sendMessage(this.form.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.snackBarRef.open('Thank you for cantacting us!', 'Dismiss', {
          duration: 3000,
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBarRef.open(
          'Server error: Please try again later',
          'Dismiss',
          {
            duration: 3000,
          }
        );
      },
    });
    this.resetForm();
  }
}
