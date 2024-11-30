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
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../../../../service/post/post.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent {
  form!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isLoading = false;
  private snackBarRef = inject(MatSnackBar);
  private maxFileSize = 2 * 1024 * 1024;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', [
        Validators.required,
        Validators.maxLength(510),
      ]),
    });
  }

  resetForm() {}

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      // Check if the file type is an image
      if (!file.type.startsWith('image/')) {
        alert('Only image files are allowed!');
        fileInput.value = ''; // Clear the input if the file is not an image
      } else if (file.size > this.maxFileSize) {
        alert('File size is too large!');
        fileInput.value = ''; // Clear the input if the file is too large
      } else {
        this.selectedFile = file;

        // Preview the image
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  submit() {
    this.isLoading = true;

    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value);
    formData.append('content', this.form.get('content')?.value);
    this.selectedFile ? formData.append('file', this.selectedFile) : false;

    this.postService.createPost(formData).subscribe({
      next: (res) => {
        this.router.navigate(['/posts']);
        this.snackBarRef.open('Post created successfully!', 'Dismiss', {
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
