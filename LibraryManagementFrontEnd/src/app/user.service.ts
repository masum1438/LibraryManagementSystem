import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7059/api/Users'; // Adjust backend URL

  constructor(private http: HttpClient) {}

  fetchUsers(from: number = 1, to: number = 100): Observable<any> {
    const params = new HttpParams().set('from', from.toString()).set('to', to.toString());
    return this.http.get(`${this.baseUrl}/fetch-users`, { params });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/create-user`, user);
  }

  createBulkUsers(): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-bulk-users`, {});
  }
getUserById(id: number) {
  return this.http.get<User>(`${this.baseUrl}/${id}`);
}

}