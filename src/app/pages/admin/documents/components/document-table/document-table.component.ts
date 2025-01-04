import { Component, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDocumentLoading } from '../../../../../state/document/document.selectors';
import {
  openDocDeleteDialog,
  openDocEditDialog,
} from '../../../../../state/document/document.actions';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Document } from '../../../../../shared/interface/document';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-document-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './document-table.component.html',
  styleUrl: './document-table.component.scss',
})
export class DocumentTableComponent {
  @Input() documents$!: Observable<Document[]>;
  loading$: Observable<boolean> = this.store.select(selectDocumentLoading);
  displayedColumns: string[] = [
    'name',
    'desc',
    'downloadLink',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<Document>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store) {}

  ngOnInit() {
    this.documents$.subscribe((documents) => {
      this.dataSource = new MatTableDataSource<Document>(documents);
      this.dataSource.paginator = this.paginator;
    });
  }

  updateDoc(id: number) {
    this.store.dispatch(openDocEditDialog({ documentId: id }));
  }

  deleteDoc(id: number) {
    this.store.dispatch(openDocDeleteDialog({ documentId: id }));
  }
}
