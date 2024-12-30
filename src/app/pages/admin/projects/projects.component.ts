import { Component } from '@angular/core';
import { Level1HeaderComponent } from '../components/level-1-header/level-1-header.component';
import { ProjectCardsComponent } from './components/project-cards/project-cards.component';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    Level1HeaderComponent,
    ProjectCardsComponent,
    NavToolbarComponent,
    CommonModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  // To be removed in v2.2.0
  newNavToolbar: boolean = true;

  headerText: string = 'Your Projects';
  buttonText: string = 'Add Project';
  childLevelLink: string = 'add-project';
}
