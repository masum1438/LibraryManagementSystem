import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-by-id',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './search-by-id.html',
  styleUrl: './search-by-id.css',
})
export class SearchById implements OnInit {
  user: User | null = null;
  loading = false;
  errorMsg = '';

  form!: FormGroup<{ id: any }>;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: this.fb.control<number | null>(null, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  fetchUser() {
    const idValue = this.form.value.id;
    if (idValue === null || idValue === undefined) return;

    const id = Number(idValue);
    if (isNaN(id) || id < 1) return;

    // Clear previous results immediately
    this.user = null;
    this.errorMsg = '';
    this.loading = true;

    // Force immediate UI update
    this.cdRef.detectChanges();

    this.userService.getUserById(id).subscribe({
      next: (res) => {
        this.user = res;
        this.loading = false;
        this.cdRef.detectChanges(); // Force update after data arrives
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'User not found or server error';
        this.loading = false;
        this.cdRef.detectChanges(); // Force update on error
      },
    });
  }
}
