import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, NgZone, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { User } from "../user.model";
import { UserService } from "../user.service";

@Component({
  selector: 'app-user-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  users: User[] = [];
  from: number = 1;
  to: number = 10;
  totalCount: number = 0;
  loading: boolean = false;
  errorMsg: string = '';

  constructor(
    private userService: UserService, 
    private zone: NgZone,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    // Validate range
    if (this.from < 1) this.from = 1;
    if (this.to < this.from) this.to = this.from;
    if (this.to - this.from > 5000) {
      this.errorMsg = 'Maximum range is 5000.';
      this.to = this.from + 5000;
      this.cdRef.detectChanges();
      return;
    }

    // Clear previous results immediately
    this.users = [];
    this.errorMsg = '';
    this.loading = true;

    // Force immediate UI update
    this.cdRef.detectChanges();

    this.userService.fetchUsers(this.from, this.to).subscribe({
      next: (res) => {
        this.zone.run(() => {
          this.users = res.users || [];
          this.totalCount = res.totalCount || 0;
          this.loading = false;
          this.cdRef.detectChanges(); // Force update after data arrives
        });
      },
      error: (err) => {
        this.zone.run(() => {
          console.error(err);
          this.errorMsg = 'Error fetching users';
          this.loading = false;
          this.users = [];
          this.cdRef.detectChanges(); // Force update on error
        });
      }
    });
  }

  bulkInsert(): void {
    if (!confirm('Are you sure you want to insert 10,000 users?')) return;
    
    this.loading = true;
    this.errorMsg = '';
    this.cdRef.detectChanges(); // Force immediate UI update

    this.userService.createBulkUsers().subscribe({
      next: (res) => {
        this.zone.run(() => {
          alert(`Inserted ${res.inserted} users`);
          this.loadUsers();
          this.cdRef.detectChanges(); // Force update after bulk insert
        });
      },
      error: (err) => {
        this.zone.run(() => {
          console.error(err);
          this.errorMsg = 'Error inserting bulk users';
          this.loading = false;
          this.cdRef.detectChanges(); // Force update on error
        });
      }
    });
  }

  // Helper method to reset and load default range
  resetToDefault(): void {
    this.from = 1;
    this.to = 10;
    this.loadUsers();
  }

  // Method to handle from input changes
  onFromChange(): void {
    // Clear results when input changes
    if (this.users.length > 0) {
      this.users = [];
      this.cdRef.detectChanges();
    }
  }

  // Method to handle to input changes
  onToChange(): void {
    // Clear results when input changes
    if (this.users.length > 0) {
      this.users = [];
      this.cdRef.detectChanges();
    }
  }
}