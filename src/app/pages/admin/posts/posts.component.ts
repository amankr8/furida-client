import { Component, inject } from '@angular/core';
import { Level1HeaderComponent } from '../components/level-1-header/level-1-header.component';
import { CardsComponent } from './components/cards/cards.component';
import { CommonModule } from '@angular/common';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    Level1HeaderComponent,
    CardsComponent,
    CommonModule,
    NavToolbarComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  // To be removed in v2.2.0
  newNavToolbar: boolean = true;

  headerText: string = 'Your Posts';
  buttonText: string = 'Create Post';
  childLevelLink: string = 'create-post';
}
