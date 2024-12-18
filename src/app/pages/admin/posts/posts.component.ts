import { Component, inject } from '@angular/core';
import { Level1HeaderComponent } from '../components/level-1-header/level-1-header.component';
import { CardsComponent } from './components/cards/cards.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [Level1HeaderComponent, CardsComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  headerText: string = 'Your Posts';
  buttonText: string = 'Add New Post';
  childLevelLink: string = 'create-post';
}
