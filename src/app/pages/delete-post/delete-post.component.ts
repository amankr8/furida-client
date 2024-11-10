import { Component, inject } from '@angular/core';
import { Post } from '../../interface/post';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-post',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogClose, MatButtonModule],
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.scss',
})
export class DeletePostComponent {
  readonly data = inject<number>(MAT_DIALOG_DATA);

  deletePost(id: number): number {
    return id;
  }
}
