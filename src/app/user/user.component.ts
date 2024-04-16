import { ApiResponse } from '../models/types/user-type';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { checkEqualityValidator } from './validatos/equality-validator';
import { Email } from '../models/types/email-type';
import { map } from 'rxjs';
import { usernameAsyncValidator } from './validatos/check-username';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  private http = inject(HttpClient);
  submitted: boolean = false;

  userForm = this.fb.group({
    userName: [
      '',
      {
        asyncValidators: [usernameAsyncValidator(this.http)],
      },
    ],
    email: [''],
    credentials: this.fb.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: checkEqualityValidator(
          'password',
          'confirmPassword',
          'The password confirmation must match your password.'
        ),
      }
    ),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.http
      .get<ApiResponse>('https://jsonplaceholder.typicode.com/users/1')
      .pipe(
        map((res: Email) => {
          return res.email;
        })
      )
      .subscribe((email: string) => {
        this.userForm.get('email')?.patchValue(email);
        console.log(email);
      });
  }

  onSubmitNewUser(): void {
    console.log(this.userForm.value);
    this.submitted = true;
  }
}
