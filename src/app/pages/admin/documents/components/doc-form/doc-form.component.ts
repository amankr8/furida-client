import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Project } from '../../../../../shared/interface/project';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { combineLatest, filter, first, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProjects } from '../../../../../state/project/project.selectors';
import {
  selectDocumentError,
  selectDocumentLoading,
} from '../../../../../state/document/document.selectors';
import { addDocument } from '../../../../../state/document/document.actions';

@Component({
  selector: 'app-doc-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './doc-form.component.html',
  styleUrl: './doc-form.component.scss',
})
export class DocFormComponent {
  @ViewChild('formDirective') formDirective!: FormGroupDirective;
  form!: FormGroup;
  projects$: Observable<Project[]> = this.store.select(selectProjects);
  loading$: Observable<boolean> = this.store.select(selectDocumentLoading);
  fileName: string = '';
  private maxFileSize = 5 * 1024 * 1024;
  error$: Observable<string | null> = this.store.select(selectDocumentError);
  success$: Observable<Boolean> = combineLatest([
    this.loading$,
    this.error$,
  ]).pipe(map(([loading, error]) => !loading && !error));

  constructor(private store: Store) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      file: new FormControl(null, Validators.required),
      projectId: new FormControl(null, Validators.required),
    });
  }

  resetForm() {
    this.fileName = '';
    this.formDirective.resetForm();
  }

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.type !== 'application/pdf') {
        alert('Only image files are allowed!');
        fileInput.value = '';
      } else if (file.size > this.maxFileSize) {
        alert('File size is too large!');
        fileInput.value = '';
      } else {
        this.form.patchValue({ file: file });
        this.fileName = file.name;
      }
    }
  }

  submit() {
    const docData = new FormData();
    docData.append('name', this.form.get('name')?.value);
    docData.append('desc', this.form.get('desc')?.value);
    docData.append('file', this.form.get('file')?.value);
    docData.append('projectId', this.form.get('projectId')?.value);

    this.store.dispatch(addDocument({ document: docData }));
    this.success$
      .pipe(
        filter((success) => success === true),
        first()
      )
      .subscribe(() => this.resetForm());
  }
}
