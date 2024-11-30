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
import { AdminDocumentsComponent } from './pages/admin/documents/documents.component';
import { AddDocumentComponent } from './pages/admin/documents/add-document/add-document.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AdminComponent,
        canActivate: [authGuard],
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            component: ProjectsComponent,
            canActivate: [authGuard],
          },
          {
            path: 'add-project',
            component: AddProjectComponent,
            canActivate: [authGuard],
          },
        ],
      },
      {
        path: 'posts',
        children: [
          {
            path: '',
            component: PostsComponent,
            canActivate: [authGuard],
          },
          {
            path: 'create-post',
            component: CreatePostComponent,
            canActivate: [authGuard],
          },
          {
            path: 'edit-post',
            component: EditPostComponent,
            canActivate: [authGuard],
          },
        ],
      },
      {
        path: 'documents',
        children: [
          {
            path: '',
            component: AdminDocumentsComponent,
            canActivate: [authGuard],
          },
          {
            path: 'add-document',
            component: AddDocumentComponent,
            canActivate: [authGuard],
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UsersComponent,
            canActivate: [authGuard],
          },
          {
            path: 'signup',
            component: SignupComponent,
            canActivate: [authGuard],
          },
        ],
      },
    ],
  },
  {
    path: 'documents',
    component: DocumentsComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];
