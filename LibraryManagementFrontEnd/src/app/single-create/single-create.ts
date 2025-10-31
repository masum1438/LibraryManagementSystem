import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { User } from '../user.model';

@Component({
  selector: 'app-single-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './single-create.html',
  styleUrls: ['./single-create.css'],
})
export class SingleCreate{
    form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [18, [Validators.required, Validators.min(1)]]
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const user: User = this.form.value;
    this.userService.createUser(user).subscribe({
      next: (res) => {
        alert(`User created with ID: ${res.id}`);
        this.form.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Error creating user');
      }
    });
  }
}