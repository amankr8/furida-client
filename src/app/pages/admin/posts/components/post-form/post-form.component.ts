import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
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
import { combineLatest, filter, first, map, Observable } from 'rxjs';
import {
  selectPostError,
  selectPostLoading,
} from '../../../../../state/post/post.selectors';
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
  @ViewChild('formDirective') formDirective!: FormGroupDirective;
  form!: FormGroup;
  image: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  loading$: Observable<boolean> = this.store.select(selectPostLoading);
  private maxFileSize = 5 * 1024 * 1024;
  error$: Observable<string | null> = this.store.select(selectPostError);
  success$: Observable<Boolean> = combineLatest([
    this.loading$,
    this.error$,
  ]).pipe(map(([loading, error]) => !loading && !error));

  constructor(private store: Store) {}

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
    this.imagePreview = null;
    this.image = null;
    this.formDirective.resetForm();
  }

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.image = fileInput.files[0];
      if (!this.image.type.startsWith('image/')) {
        alert('Only image files are allowed!');
        fileInput.value = '';
      } else if (this.image.size > this.maxFileSize) {
        alert('File size is too large!');
        fileInput.value = '';
      } else {
        this.form.patchValue({ file: this.image });

        // Preview the image
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(this.image);
      }
    }
  }

  submit() {
    const postData = new FormData();
    postData.append('title', this.form.get('title')?.value);
    postData.append('content', this.form.get('content')?.value);
    const file = this.form.get('file')?.value;
    if (file !== null) {
      postData.append('file', file);
    }

    this.store.dispatch(addPost({ post: postData }));
    this.success$
      .pipe(
        filter((success) => success === true),
        first()
      )
      .subscribe(() => this.resetForm());
  }
}
