import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../../models/auth/loginRequest.interface';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    const userData: LoginRequest = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.login(userData);
    // После полученияя токена - переадресовать
  }

  private login(userData: LoginRequest) {
    this.authService.login(userData).subscribe({
      next: (res: any) => {
        console.log('next');

        console.log(res);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      },
    });
  }
}
