import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { mergeMap, map, catchError, of, tap, first } from 'rxjs';
import { Post } from '../../shared/interface/post';
import { ConfirmDialogComponent } from '../../pages/admin/components/confirm-dialog/confirm-dialog.component';
import { EditPostComponent } from '../../pages/admin/posts/components/edit-post/edit-post.component';
import { PostService } from '../../service/post/post.service';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFail,
  addPost,
  addPostSuccess,
  addPostFail,
  updatePost,
  updatePostSuccess,
  updatePostFail,
  deletePost,
  deletePostSuccess,
  deletePostFail,
  openViewDialog,
} from './post.actions';
import { openEditDialog, openDeleteDialog } from './post.actions';
import { selectPostById } from './post.selectors';
import { ViewPostComponent } from '../../pages/home/landing/components/view-post/view-post.component';

@Injectable()
export class PostEffects {
  readonly matDialog = inject(MatDialog);

  constructor(
    private actions$: Actions,
    private postService: PostService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() =>
        this.postService.getAllPosts().pipe(
          map((posts) => loadPostsSuccess({ posts })),
          catchError((error) => of(loadPostsFail({ error: error.message })))
        )
      )
    )
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPost),
      mergeMap(({ post }) =>
        this.postService.createPost(post).pipe(
          map((newPost: Post) => addPostSuccess({ post: newPost })),
          catchError((error) => of(addPostFail({ error: error.message })))
        )
      )
    )
  );

  addPostSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addPostSuccess),
        tap(() => {
          this.router.navigate(['/admin/posts']);
          this.snackBar.open('Post added successfully!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  addPostFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addPostFail),
        tap(({ error }) => {
          this.snackBar.open(`Server Error: ${error}`, 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  openViewDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openViewDialog),
        mergeMap(({ postId }) =>
          this.store.select(selectPostById(postId)).pipe(
            first(),
            map((post) => {
              if (post) {
                this.viewPostDialog(post);
              } else {
                this.snackBar.open(
                  'Some error occurred! Try again later',
                  'Dismiss',
                  {
                    duration: 3000,
                  }
                );
                console.error('Post not found in state');
              }
            })
          )
        )
      ),
    { dispatch: false }
  );

  viewPostDialog(post: Post) {
    this.matDialog.open(ViewPostComponent, {
      panelClass: 'custom-dialog-container',
      data: post,
    });
  }

  openEditDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openEditDialog),
        mergeMap(({ postId }) =>
          this.store.select(selectPostById(postId)).pipe(
            first(),
            map((post) => {
              if (post) {
                this.showEditFormDialog(post);
              } else {
                console.error('Post not found in state');
              }
            })
          )
        )
      ),
    { dispatch: false }
  );

  showEditFormDialog(post: Post) {
    this.matDialog.open(EditPostComponent, {
      panelClass: 'custom-dialog-container',
      data: post,
    });
  }

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
      mergeMap(({ postId, post }) =>
        this.postService.updatePost(postId, post).pipe(
          map((newPost: Post) => updatePostSuccess({ post: newPost })),
          catchError((error) => of(updatePostFail({ error: error.message })))
        )
      )
    )
  );

  updatePostSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updatePostSuccess),
        tap(() => {
          this.router.navigate(['/admin/posts']);
          this.snackBar.open('Post updated successfully!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  updatePostFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updatePostFail),
        tap(({ error }) => {
          this.snackBar.open(`Server Error: ${error}`, 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  openDeleteDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openDeleteDialog),
        tap(({ postId }) => {
          this.showDeleteWarningDialog(deletePost({ postId }));
        })
      ),
    { dispatch: false }
  );

  showDeleteWarningDialog(action: Action) {
    this.matDialog.open(ConfirmDialogComponent, {
      panelClass: 'alert-dialog-container',
      data: {
        action: action,
        message: 'Are you sure you want to delete this post?',
      },
    });
  }

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      mergeMap(({ postId }) =>
        this.postService.deletePost(postId).pipe(
          map(() => deletePostSuccess({ postId })),
          catchError((error) => of(deletePostFail({ error: error.message })))
        )
      )
    )
  );

  deletePostSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deletePostSuccess),
        tap(() => {
          this.snackBar.open('Post deleted successfully!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  deletePostFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deletePostFail),
        tap(({ error }) => {
          this.snackBar.open(`Failed to delete: ${error}`, 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );
}
