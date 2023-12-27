import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.registerForm = this.formBuilder.group({
      restaurantName: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  onSubmit() {
    console.log(this.registerForm.value);
    this.httpClient
      .post('https://localhost:7170/api/Organization', {
        name: this.registerForm.get('login')?.value,
        password: this.registerForm.get('password')?.value,
      })
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
      });
  }
}
