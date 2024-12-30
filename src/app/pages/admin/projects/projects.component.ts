import { Component } from '@angular/core';
import { ProjectCardsComponent } from './components/project-cards/project-cards.component';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardsComponent, NavToolbarComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  headerText: string = 'Your Projects';
  buttonText: string = 'Add Project';
  childLevelLink: string = 'add-project';
}
