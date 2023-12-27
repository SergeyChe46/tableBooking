import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../models/auth/loginRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL: string = 'https://localhost:7170/api/Organization/';
  constructor(private httpClient: HttpClient) {}

  login(userData: LoginRequest) {
    return this.httpClient.post(
      'https://localhost:7170/api/Organization/token',
      userData
    );
  }
}
