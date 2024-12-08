import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProjectService } from '../../../../../service/project/project.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addProject } from '../../../../../state/projects/project.actions';
import { Observable } from 'rxjs';
import { selectLoading } from '../../../../../state/projects/project.selectors';

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
  form!: FormGroup;
  loading$: Observable<Boolean>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  formSubmit() {
    this.store.dispatch(addProject({ project: this.form.value }));
  }
}
