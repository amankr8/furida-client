import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Document } from '../../../../interface/document';
import { Store } from '@ngrx/store';
import { updateDocument } from '../../../../state/document/document.actions';

@Component({
  selector: 'app-edit-document',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './edit-document.component.html',
  styleUrl: './edit-document.component.scss',
})
export class EditDocumentComponent {
  form!: FormGroup;

  constructor(
    public store: Store,
    public dialogRef: MatDialogRef<EditDocumentComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Document
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, Validators.required),
      desc: new FormControl(this.data.desc, Validators.required),
    });
  }

  submit() {
    const docData = new FormData();
    docData.append('name', this.form.get('name')?.value);
    docData.append('desc', this.form.get('desc')?.value);

    this.store.dispatch(
      updateDocument({ documentId: this.data.id, document: docData })
    );
    this.dialogRef.close();
  }
}
