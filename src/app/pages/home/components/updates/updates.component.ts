import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Post } from '../../../../interface/post';
import { PostService } from '../../../../service/post.service';

@Component({
  selector: 'app-updates',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatButtonModule, CommonModule],
  templateUrl: './updates.component.html',
  styleUrl: './updates.component.scss',
})
export class UpdatesComponent {
  posts: Post[] = [];
  isLoading = false;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
      this.isLoading = false;
    });
  }
}
