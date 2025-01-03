import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Document } from '../../../../../shared/interface/document';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { DocumentCardComponent } from '../../../../components/document-card/document-card.component';

@Component({
  selector: 'app-document-cards',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    MatSelectModule,
    DocumentCardComponent,
  ],
  templateUrl: './document-cards.component.html',
  styleUrl: './document-cards.component.scss',
})
export class DocumentCardsComponent {
  @Input() documents$!: Observable<Document[]>;
}
