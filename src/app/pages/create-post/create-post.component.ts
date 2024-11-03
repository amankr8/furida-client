import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../service/post.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HeaderComponent,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  form!: FormGroup;
  private snackBarRef = inject(MatSnackBar);

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
  }

  goBack() {
    this.router.navigate(['/posts']);
  }

  submit() {
    this.postService.createPost(this.form.value).subscribe((res) => {
      this.router.navigate(['/posts']);
      this.snackBarRef.open('Post created successfully!', 'Dismiss', {
        duration: 3000,
      });
    });
  }
}
