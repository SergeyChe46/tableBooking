import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_ORGANIZATION_API, TOKEN_FIELD_NAME } from '../../consts';
import { LoginRequest } from '../../models/auth/loginRequest.interface';
import { RegisterDataInterface } from '../../models/auth/registerData.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL: string = BASE_ORGANIZATION_API;
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(userData: LoginRequest) {
    localStorage.removeItem(TOKEN_FIELD_NAME);
    this.httpClient.post(this.URL + 'token', userData).subscribe({
      next: (res: any) => {
        const token = res.token;
        if (token) {
          localStorage.setItem(TOKEN_FIELD_NAME, token);
        }
        this.router.navigate(['/lk']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      },
    });
  }
  register(registerData: RegisterDataInterface) {
    this.httpClient.post(this.URL + 'Register', registerData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      },
    });
  }

  get token() {
    return localStorage.getItem(TOKEN_FIELD_NAME);
  }
}
