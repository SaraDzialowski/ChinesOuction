import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  private reloadAuthSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadAuth$: Observable<boolean> = this.reloadAuthSubject.asObservable();

  login(userName:string,password:string) :Observable<any> {
    var u = {"userName":userName,"password":password}
    let url = `https://localhost:7171/api/User/login`;
    return this.httpClient.post<any>(url,u)
  }

}