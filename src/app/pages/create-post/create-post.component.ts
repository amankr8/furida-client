import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../service/post.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HeaderComponent,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  form!: FormGroup;
  selectedFile: File | null = null;
  isLoading = false;
  private snackBarRef = inject(MatSnackBar);

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
  }

  goBack() {
    this.router.navigate(['/posts']);
  }

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      // Check if the file type is an image
      if (file.type.startsWith('image/')) {
        this.selectedFile = file;
        console.log('Selected file:', file);
      } else {
        alert('Only image files are allowed!');
        fileInput.value = ''; // Clear the input if the file is not an image
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
        console.log(res);
        this.router.navigate(['/posts']);
        this.snackBarRef.open('Post created successfully!', 'Dismiss', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error('Some error occured: ', err);
        this.isLoading = false;
      },
    });
  }
}
