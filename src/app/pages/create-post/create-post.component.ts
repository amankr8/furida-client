import { Component } from '@angular/core';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../service/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [PostFormComponent, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  form!: FormGroup;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
  }

  submit() {
    console.log(this.form.value);
    this.postService.createPost(this.form.value).subscribe((res: any) => {
      console.log('Post created successfully!');
      this.router.navigateByUrl('');
    });
  }
}
