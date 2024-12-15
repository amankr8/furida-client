import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Post } from '../../../../interface/post';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    CommonModule,
  ],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss',
})
export class ViewPostComponent {
  constructor(
    public store: Store,
    public dialogRef: MatDialogRef<ViewPostComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Post
  ) {}
}
