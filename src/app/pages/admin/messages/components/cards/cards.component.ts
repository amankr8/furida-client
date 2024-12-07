import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Message } from '../../../../../interface/message';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../../../../../service/contact/contact.service';
import { DeleteDialogComponent } from '../../../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-message-cards',
  standalone: true,
  imports: [MatProgressBarModule, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  messages: Message[] = [];
  isLoading = false;
  readonly deleteDialog = inject(MatDialog);
  private snackBarRef = inject(MatSnackBar);

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.isLoading = true;
    this.contactService.getAllMessages().subscribe((data) => {
      this.messages = data;
      this.isLoading = false;
    });
  }

  markAsRead(id: number) {}

  openDeleteDialog(id: number) {
    const deleteDialogref = this.deleteDialog.open(DeleteDialogComponent, {
      data: id,
      width: '50%',
    });

    deleteDialogref.afterClosed().subscribe({
      next: (id) => {
        if (!id) return;
        this.isLoading = true;

        this.contactService.deleteMessage(id).subscribe({
          next: (res) => {
            this.messages = this.messages.filter(
              (message) => message.id !== id
            );
            this.isLoading = false;
            this.snackBarRef.open('Message deleted successfully!', 'Dismiss', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.error(err);
            this.snackBarRef.open(
              'Error: Failed to delete message',
              'Dismiss',
              {
                duration: 3000,
              }
            );
          },
        });
      },
    });
  }
}
