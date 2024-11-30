import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { Level1HeaderComponent } from '../components/level-1-header/level-1-header.component';
import { CardsComponent } from './components/cards/cards.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    HeaderComponent,
    MatProgressBarModule,
    Level1HeaderComponent,
    CardsComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  headerText: string = 'Your Posts';
  buttonText: string = 'Add New Post';
  childLevelLink: string = 'create-post';

  constructor() {}
}
