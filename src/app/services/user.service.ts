import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable(
  //{providedIn: 'root'}
)
export class UserService {

  baseUrl = 'https://localhost:44329/api/users'

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
  }

  public getUsersByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/name/${name}`)
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

}
