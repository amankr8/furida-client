import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import {
  toggleBoolSetting1,
  toggleBoolSetting2,
} from '../../../../../state/config/config.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { selectConfig } from '../../../../../state/config/config.selectors';

@Component({
  selector: 'app-config-settings',
  standalone: true,
  imports: [MatSlideToggleModule, CommonModule, FormsModule],
  templateUrl: './config-settings.component.html',
  styleUrl: './config-settings.component.scss',
})
export class ConfigSettingsComponent {
  isBoolSetting1$: Observable<boolean> = this.store
    .select(selectConfig)
    .pipe(map((config) => config.boolSetting1));
  isBoolSetting2$: Observable<boolean> = this.store
    .select(selectConfig)
    .pipe(map((config) => config.boolSetting2));

  constructor(private store: Store) {}

  toggleHomeHeader(checked: boolean) {
    this.store.dispatch(toggleBoolSetting1({ boolSetting1: checked }));
  }

  toggleAdminHeader(checked: boolean) {
    this.store.dispatch(toggleBoolSetting2({ boolSetting2: checked }));
  }
}
