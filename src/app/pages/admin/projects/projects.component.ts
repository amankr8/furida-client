import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Level1HeaderComponent } from '../components/level-1-header/level-1-header.component';
import { CardsComponent } from './components/cards/cards.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [HeaderComponent, Level1HeaderComponent, CardsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  headerText: string = 'Your Projects';
  buttonText: string = 'Add New Project';
  childLevelLink: string = 'add-project';
}
