import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { User } from '../../../interface/user';
import { UserService } from '../../../service/user.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
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
