import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [HeaderComponent, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
})
export class AddProjectComponent {}
