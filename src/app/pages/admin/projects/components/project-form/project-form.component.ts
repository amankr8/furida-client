import { Component, inject, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addProject } from '../../../../../state/project/project.actions';
import { combineLatest, filter, first, map, Observable } from 'rxjs';
import {
  selectProjectError,
  selectProjectLoading,
} from '../../../../../state/project/project.selectors';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatProgressSpinner,
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent {
  @ViewChild('formDirective') formDirective!: FormGroupDirective;
  form!: FormGroup;
  loading$: Observable<Boolean> = this.store.select(selectProjectLoading);
  error$: Observable<string | null> = this.store.select(selectProjectError);
  success$: Observable<Boolean> = combineLatest([
    this.loading$,
    this.error$,
  ]).pipe(map(([loading, error]) => !loading && !error));

  constructor(private store: Store) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  submit() {
    this.store.dispatch(addProject({ project: this.form.value }));
    this.success$
      .pipe(
        filter((success) => success === true),
        first()
      )
      .subscribe(() => this.formDirective.resetForm());
  }
}
