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
  isLoading = false;
  private snackBarRef = inject(MatSnackBar);

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  submit() {
    this.isLoading = true;
    this.projectService.addProject(this.form.value).subscribe({
      next: (res) => {
        this.router.navigate(['/admin/projects']);
        this.snackBarRef.open(res.message, 'Dismiss', {
          duration: 3000,
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBarRef.open('this.getErrorMessage(err)', 'Dismiss', {
          duration: 3000,
        });
      },
    });
  }
}
