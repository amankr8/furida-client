import { Component, inject, signal } from '@angular/core';
import { Post } from '../../interface/post';
import { PostService } from '../../service/post.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { Router } from '@angular/router';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts: Post[] = [];
  readonly editDialog = inject(MatDialog);
  readonly deleteDialog = inject(MatDialog);
  private snackBarRef = inject(MatSnackBar);

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.snackBarRef.open('Logged out successfully!', 'Dismiss', {
      duration: 3000,
    });
  }

  navigateToCreatePost() {
    this.router.navigate(['/create-post']);
  }

  openEditDialog(id: number) {
    const editDialogref = this.editDialog.open(EditPostComponent, {
      data: this.posts.find((post) => post.id === id),
      width: '50%',
    });

    editDialogref.afterClosed().subscribe((newPost: Post) => {
      this.postService.updatePost(newPost.id, newPost).subscribe((res) => {
        const index = this.posts.findIndex((post) => post.id === newPost.id);
        this.posts[index] = newPost;
        this.snackBarRef.open('Post updated successfully!', 'Dismiss', {
          duration: 3000,
        });
      });
    });
  }

  openDeleteDialog(id: number) {
    const deleteDialogref = this.deleteDialog.open(DeletePostComponent, {
      data: id,
      width: '50%',
    });

    deleteDialogref.afterClosed().subscribe((id: number) => {
      this.postService.deletePost(id).subscribe((res) => {
        this.posts = this.posts.filter((post) => post.id !== id);
        this.snackBarRef.open('Post deleted successfully!', 'Dismiss', {
          duration: 3000,
        });
      });
    });
  }
}
