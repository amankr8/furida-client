import { Component } from '@angular/core';
import { Level2HeaderComponent } from '../../components/level-2-header/level-2-header.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { CommonModule } from '@angular/common';
import { NavToolbarComponent } from '../../components/nav-toolbar/nav-toolbar.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    Level2HeaderComponent,
    PostFormComponent,
    CommonModule,
    NavToolbarComponent,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  // To be removed in v2.2.0
  newNavToolbar: boolean = true;

  headerText: string = 'Add New Post';
}
