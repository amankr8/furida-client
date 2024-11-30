import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostService } from '../../../../service/post/post.service';
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

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogClose,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
})
export class EditPostComponent {
  form!: FormGroup;
  readonly data = inject<Post>(MAT_DIALOG_DATA);

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(this.data.title, Validators.required),
      content: new FormControl(this.data.content, [
        Validators.required,
        Validators.maxLength(510),
      ]),
    });
  }

  updatePost(post: Post): Post {
    const updatedPost = {
      ...post,
      title: this.form.value.title,
      content: this.form.value.content,
    };
    return updatedPost;
  }
}
