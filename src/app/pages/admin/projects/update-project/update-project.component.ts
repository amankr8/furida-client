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
import { Project } from '../../../../interface/project';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.scss',
})
export class UpdateProjectComponent {
  form!: FormGroup;
  readonly data = inject<Project>(MAT_DIALOG_DATA);

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, Validators.required),
      desc: new FormControl(this.data.desc, Validators.required),
      address: new FormControl(this.data.address, Validators.required),
    });
  }

  update(project: Project): Project {
    const updatedProject = {
      ...project,
      name: this.form.value.name,
      desc: this.form.value.desc,
      address: this.form.value.address,
    };
    return updatedProject;
  }
}
