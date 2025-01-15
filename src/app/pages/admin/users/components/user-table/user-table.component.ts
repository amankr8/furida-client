import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { User } from '../../../../../shared/interface/user';
import { selectAuthUser } from '../../../../../state/auth/auth.selectors';
import {
  openUserEditDialog,
  openUserDeleteDialog,
} from '../../../../../state/user/user.actions';
import {
  selectUsers,
  selectUserLoading,
} from '../../../../../state/user/user.selectors';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  users$: Observable<User[]> = this.store.select(selectUsers);
  loading$: Observable<boolean> = this.store.select(selectUserLoading);
  editConstraint: string = 'Cannot update other users';
  deleteConstraint: string = 'Cannot delete current user';
  dataSource = new MatTableDataSource<User>([]);
  displayedColumns: string[] = [
    'username',
    'email',
    'createDate',
    'edit',
    'delete',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store) {}

  ngOnInit() {
    this.users$.subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  isLoggedInUser(username: string): Observable<boolean> {
    return this.store
      .select(selectAuthUser)
      .pipe(map((user) => (user ? user.username === username : false)));
  }

  updateUser() {
    this.store.dispatch(openUserEditDialog());
  }

  deleteUser(id: number) {
    this.store.dispatch(openUserDeleteDialog({ userId: id }));
  }
}
