import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../../../../interface/user';
import { UserService } from '../../../../../service/user/user.service';

@Component({
  selector: 'app-user-cards',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatButtonModule, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  users: User[] = [];
  isLoading = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      this.isLoading = false;
    });
  }
}
