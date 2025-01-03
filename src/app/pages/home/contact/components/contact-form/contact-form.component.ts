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
import { filter, first, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectMessageLoading,
  selectMessageStatus,
} from '../../../../../state/message/message.selectors';
import { sendMessage } from '../../../../../state/message/message.actions';
import { generalStatus } from '../../../../../shared/constants/global-constants';

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
  loading$: Observable<boolean>;
  status$: Observable<string> = this.store.select(selectMessageStatus);

  constructor(private store: Store) {
    this.loading$ = this.store.select(selectMessageLoading);
  }

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
    this.status$
      .pipe(
        filter((status) => status === generalStatus.SUCCESS),
        first()
      )
      .subscribe(() => this.formDirective.resetForm());
  }
}
