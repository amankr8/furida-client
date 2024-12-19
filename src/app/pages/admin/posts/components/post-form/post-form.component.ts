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
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoading } from '../../../../../state/post/post.selectors';
import { addPost } from '../../../../../state/post/post.actions';

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
  imagePreview: string | ArrayBuffer | null = null;
  loading$: Observable<boolean>;
  private maxFileSize = 2 * 1024 * 1024;

  constructor(private store: Store) {
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', [
        Validators.required,
        Validators.maxLength(510),
      ]),
      file: new FormControl(null),
    });
  }

  resetForm() {
    this.form.reset();
  }

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
        this.form.patchValue({ file: file });

        // Preview the image
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  submit() {
    const postData = new FormData();
    postData.append('title', this.form.get('title')?.value);
    postData.append('content', this.form.get('content')?.value);
    postData.append('file', this.form.get('file')?.value);

    this.store.dispatch(addPost({ post: postData }));
  }
}
