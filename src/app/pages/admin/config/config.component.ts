import { Component } from '@angular/core';
import { ConfigSettingsComponent } from './components/config-settings/config-settings.component';
import { Level2HeaderComponent } from '../components/level-2-header/level-2-header.component';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [Level2HeaderComponent, ConfigSettingsComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent {
  headerText: string = 'Configuration';
}
