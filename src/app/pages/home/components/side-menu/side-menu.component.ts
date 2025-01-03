import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AdminButtonComponent } from '../admin-button/admin-button.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { Project } from '../../../../shared/interface/project';
import { selectProjects } from '../../../../state/project/project.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
    AdminButtonComponent,
    MatExpansionModule,
    CommonModule,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  projects$: Observable<Project[]> = this.store.select(selectProjects);

  constructor(private store: Store) {}

  toggleMenu() {
    this.toggleSidenav.emit();
  }
}
