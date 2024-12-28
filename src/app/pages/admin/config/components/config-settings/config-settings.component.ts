import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import {
  toggleAdminHeaderVersion,
  toggleHeaderVersion,
} from '../../../../../state/config/config.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { selectHeaderConfig } from '../../../../../state/config/config.selectors';

@Component({
  selector: 'app-config-settings',
  standalone: true,
  imports: [MatSlideToggleModule, CommonModule, FormsModule],
  templateUrl: './config-settings.component.html',
  styleUrl: './config-settings.component.scss',
})
export class ConfigSettingsComponent {
  isNewHomeHeader$: Observable<boolean> = this.store
    .select(selectHeaderConfig)
    .pipe(map((headerConfig) => headerConfig.newHeader));
  isNewAdminHeader$: Observable<boolean> = this.store
    .select(selectHeaderConfig)
    .pipe(map((headerConfig) => headerConfig.newAdminHeader));

  constructor(private store: Store) {}

  toggleHomeHeader(checked: boolean) {
    this.store.dispatch(toggleHeaderVersion({ newHeader: checked }));
  }

  toggleAdminHeader(checked: boolean) {
    this.store.dispatch(toggleAdminHeaderVersion({ newAdminHeader: checked }));
  }
}
