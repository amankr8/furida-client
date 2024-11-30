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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DocumentService } from '../../../../../service/document/document.service';

@Component({
  selector: 'app-doc-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './doc-form.component.html',
  styleUrl: './doc-form.component.scss',
})
export class DocFormComponent {
  form!: FormGroup;
  fileName: string = '';
  isLoading = false;
  private snackBarRef = inject(MatSnackBar);
  private maxFileSize = 5 * 1024 * 1024;

  constructor(private docService: DocumentService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      file: new FormControl(null, Validators.required),
    });
  }

  resetForm() {
    this.form.reset();
    this.fileName = '';
  }

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      // Check if the file type is an image
      if (file.type !== 'application/pdf') {
        alert('Only image files are allowed!');
        fileInput.value = ''; // Clear the input if the file is not in pdf format
      } else if (file.size > this.maxFileSize) {
        alert('File size is too large!');
        fileInput.value = ''; // Clear the input if the file is too large
      } else {
        this.form.patchValue({ file: file });
        this.fileName = file.name;
      }
    }
  }

  submit() {
    this.isLoading = true;

    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('desc', this.form.get('desc')?.value);
    formData.append('file', this.form.get('file')?.value);

    this.docService.addDocument(formData).subscribe({
      next: (res) => {
        this.router.navigate(['/admin/documents']);
        this.snackBarRef.open('Document uploaded successfully!', 'Dismiss', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBarRef.open('An unknown error has occurred', 'Dismiss', {
          duration: 3000,
        });
        this.resetForm();
        this.isLoading = false;
      },
    });
  }
}
