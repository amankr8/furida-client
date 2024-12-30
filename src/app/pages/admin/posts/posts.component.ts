import { Component } from '@angular/core';
import { CardsComponent } from './components/cards/cards.component';
import { CommonModule } from '@angular/common';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CardsComponent, CommonModule, NavToolbarComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  headerText: string = 'Your Posts';
  buttonText: string = 'Create Post';
  childLevelLink: string = 'create-post';
}
