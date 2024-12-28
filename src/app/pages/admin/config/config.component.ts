import { Component } from '@angular/core';
import { Level1HeaderComponent } from '../components/level-1-header/level-1-header.component';
import { ConfigSettingsComponent } from './components/config-settings/config-settings.component';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [Level1HeaderComponent, ConfigSettingsComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent {
  headerText: string = 'Configuration';
  buttonText: string = 'Add Doc';
  childLevelLink: string = 'add-document';
}
