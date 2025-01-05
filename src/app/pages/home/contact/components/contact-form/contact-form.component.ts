import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { combineLatest, filter, first, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectMessageError,
  selectMessageLoading,
} from '../../../../../state/message/message.selectors';
import { sendMessage } from '../../../../../state/message/message.actions';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  @ViewChild('formDirective') formDirective!: FormGroupDirective;
  form!: FormGroup;
  loading$: Observable<boolean> = this.store.select(selectMessageLoading);
  error$: Observable<string | null> = this.store.select(selectMessageError);
  success$: Observable<Boolean> = combineLatest([
    this.loading$,
    this.error$,
  ]).pipe(map(([loading, error]) => !loading && !error));

  constructor(private store: Store) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      msg: new FormControl('', [
        Validators.required,
        Validators.maxLength(510),
      ]),
    });
  }

  submit() {
    this.store.dispatch(sendMessage({ message: this.form.value }));
    this.success$
      .pipe(
        filter((success) => success === true),
        first()
      )
      .subscribe(() => this.formDirective.resetForm());
  }
}
