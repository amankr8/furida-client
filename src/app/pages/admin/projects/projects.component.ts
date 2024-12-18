import { Component } from '@angular/core';
import { Level1HeaderComponent } from '../components/level-1-header/level-1-header.component';
import { ProjectCardsComponent } from './components/project-cards/project-cards.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [Level1HeaderComponent, ProjectCardsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  headerText: string = 'Your Projects';
  buttonText: string = 'Add New Project';
  childLevelLink: string = 'add-project';
}
