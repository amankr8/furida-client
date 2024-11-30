import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Document } from '../../../../interface/document';

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
  readonly data = inject<Document>(MAT_DIALOG_DATA);

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, Validators.required),
      desc: new FormControl(this.data.desc, Validators.required),
    });
  }

  update(doc: Document): Document {
    const updatedDoc = {
      ...doc,
      name: this.form.value.name,
      desc: this.form.value.desc,
    };
    return updatedDoc;
  }
}
