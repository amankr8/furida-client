import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AdminButtonComponent } from '../../home/components/admin-button/admin-button.component';
import { Observable } from 'rxjs';
import { Project } from '../../../shared/interface/project';
import { selectProjects } from '../../../state/project/project.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-buttons',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    AdminButtonComponent,
    CommonModule,
  ],
  templateUrl: './navbar-buttons.component.html',
  styleUrl: './navbar-buttons.component.scss',
})
export class NavbarButtonsComponent {
  projects$: Observable<Project[]> = this.store.select(selectProjects);

  constructor(private store: Store) {}
}
