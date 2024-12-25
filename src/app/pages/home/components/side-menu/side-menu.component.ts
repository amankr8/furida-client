import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AdminButtonComponent } from '../admin-button/admin-button.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { Project } from '../../../../interface/project';
import { loadProjects } from '../../../../state/project/project.actions';
import {
  selectProjects,
  selectIsProjectLoaded,
} from '../../../../state/project/project.selectors';
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
  projectLoaded$: Observable<boolean> = this.store.select(
    selectIsProjectLoaded
  );

  constructor(private store: Store) {}

  ngOnInit() {
    this.projectLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadProjects());
    });
  }

  toggleMenu() {
    this.toggleSidenav.emit();
  }
}
