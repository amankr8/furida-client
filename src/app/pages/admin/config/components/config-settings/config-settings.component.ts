import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import {
  toggleAdminHeaderVersion,
  toggleHeaderVersion,
} from '../../../../../state/config/config.actions';

@Component({
  selector: 'app-config-settings',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './config-settings.component.html',
  styleUrl: './config-settings.component.scss',
})
export class ConfigSettingsComponent {
  constructor(private store: Store) {}

  ngOnInit() {}

  toggleHomeHeader(checked: boolean) {
    this.store.dispatch(toggleHeaderVersion({ newHeader: checked }));
    console.log(checked);
  }

  toggleAdminHeader(checked: boolean) {
    this.store.dispatch(toggleAdminHeaderVersion({ newAdminHeader: checked }));
    console.log(checked);
  }
}
