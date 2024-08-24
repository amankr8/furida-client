import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostService } from '../../service/post.service';
import { Post } from '../../interface/post';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
})
export class EditPostComponent {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  updatePost(post: Post) {
    this.postService.updatePost(post.id, post).subscribe((res) => {
      const index = this.posts.findIndex((p) => p.id === post.id);
      this.posts[index] = post;
    });
  }
}
