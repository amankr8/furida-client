import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostService } from '../../service/post.service';
import { Post } from '../../interface/post';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
})
export class EditPostComponent {
  form!: FormGroup;
  posts: Post[] = [];
  data = inject<Post>(MAT_DIALOG_DATA);

  constructor(
    private postService: PostService,
    private dialogRef: MatDialogRef<EditPostComponent>
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.data.title),
      content: new FormControl(this.data.content),
    });
  }

  closeEditDialog(): void {
    this.dialogRef.close();
  }

  updatePost(post: Post) {
    const updatedPost = {
      ...post,
      title: this.form.value.title,
      content: this.form.value.content,
    };
    this.postService.updatePost(post.id, updatedPost).subscribe((res) => {
      const index = this.posts.findIndex((ob) => ob.id === post.id);
      this.posts[index] = updatedPost;
      this.closeEditDialog();
    });
  }
}
