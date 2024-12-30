import { Component } from '@angular/core';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { CommonModule } from '@angular/common';
import { NavToolbarComponent } from '../../components/nav-toolbar/nav-toolbar.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [PostFormComponent, CommonModule, NavToolbarComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  headerText: string = 'Add New Post';
}
