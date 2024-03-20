import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserDetails } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  registerUsers(data: User): Observable<User> {
    return this.http.post(`${this.API_URL}/registeredUsers`, data);
  }

  getRegisteredUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}/registeredUsers`);
  }

  getUsers(): Observable<UserDetails> {
    return this.http.get(`${this.API_URL}/Users`)
  }

  createUser(data: UserDetails): Observable<UserDetails> {
    return this.http.post(`${this.API_URL}/Users`, data)
  }


  deleteUser(id: number): Observable<UserDetails> {
    let url = `${this.API_URL}/registeredUsers/${id}`
    return this.http.delete<any>(url)
  }

  updateRegisteredUser(data: any) {
    let url = `${this.API_URL}/registeredUsers/${data.id}`
    return this.http.put(url, data)
  }

  updateUser(data: any, id: string) {
    let url = `${this.API_URL}/registeredUsers/${id}`
    return this.http.patch(url, data)
  }

}
