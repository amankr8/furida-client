import { Component, inject } from '@angular/core';
import { Post } from '../../interface/post';
import { PostService } from '../../service/post.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts: Post[] = [];
  readonly dialog = inject(MatDialog);

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EditPostComponent, {
      data: {
        title: this.posts[id].title,
        content: this.posts[id].content,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log('The dialog was closed');
    });
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe((res) => {
      this.posts = this.posts.filter((item) => item.id !== id);
      console.log('Post deleted successfully');
    });
  }
}
