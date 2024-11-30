import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { UpdatesComponent } from './components/updates/updates.component';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    UpdatesComponent,
    MatDividerModule,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
