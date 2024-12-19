import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Post } from '../../../../interface/post';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { updatePost } from '../../../../state/post/post.actions';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
})
export class EditPostComponent {
  form!: FormGroup;

  constructor(
    public store: Store,
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Post
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(this.data.title, Validators.required),
      content: new FormControl(this.data.content, [
        Validators.required,
        Validators.maxLength(510),
      ]),
    });
  }

  submit() {
    const postData = new FormData();
    postData.append('title', this.form.get('title')?.value);
    postData.append('content', this.form.get('content')?.value);

    this.store.dispatch(updatePost({ postId: this.data.id, post: postData }));
    this.dialogRef.close();
  }
}
