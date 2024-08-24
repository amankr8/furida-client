import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostService } from '../../service/post.service';
import { Post } from '../../interface/post';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

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
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
})
export class EditPostComponent {
  posts: Post[] = [];
  data = inject<Post>(MAT_DIALOG_DATA);

  constructor(private postService: PostService) {}

  updatePost(post: Post) {
    this.postService.updatePost(post.id, post).subscribe((res) => {
      const index = this.posts.findIndex((p) => p.id === post.id);
      this.posts[index] = post;
    });
  }
}
