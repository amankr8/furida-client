import { Component } from '@angular/core';
import { ConfigSettingsComponent } from './components/config-settings/config-settings.component';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [ConfigSettingsComponent, NavToolbarComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent {
  headerText: string = 'Settings';
}
