import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterDataInterface } from '../../../models/auth/registerData.interface';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      restaurantName: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  onSubmit() {
    let userData: RegisterDataInterface = {
      login: this.registerForm.get('login')?.value,
      name: this.registerForm.get('restaurantName')?.value,
      password: this.registerForm.get('password')?.value,
    };
    console.log(userData);

    this.authService.register(userData);
  }
}
