import { Routes } from '@angular/router';
import { CreatePostComponent } from './pages/admin/posts/create-post/create-post.component';
import { EditPostComponent } from './pages/admin/posts/edit-post/edit-post.component';
import { PostsComponent } from './pages/admin/posts/posts.component';
import { SignupComponent } from './pages/admin/users/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { ProjectsComponent } from './pages/admin/projects/projects.component';
import { AddProjectComponent } from './pages/admin/projects/add-project/add-project.component';
import { DocumentsComponent } from './pages/documents/documents.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'posts', component: PostsComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [authGuard] },
  {
    path: 'documents',
    component: DocumentsComponent,
  },
  {
    path: 'add-project',
    component: AddProjectComponent,
    canActivate: [authGuard],
  },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [authGuard],
  },
  { path: 'edit-post', component: EditPostComponent, canActivate: [authGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];
