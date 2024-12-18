import { Component } from '@angular/core';
import { Level2HeaderComponent } from '../../components/level-2-header/level-2-header.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [Level2HeaderComponent, PostFormComponent, AdminHeaderComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  headerText: string = 'Add New Post';
}
