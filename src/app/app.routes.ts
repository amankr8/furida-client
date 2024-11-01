import { Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { PostsComponent } from './pages/posts/posts.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: 'posts', component: PostsComponent, canActivate: [authGuard] },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [authGuard],
  },
  { path: 'edit-post', component: EditPostComponent, canActivate: [authGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
];
