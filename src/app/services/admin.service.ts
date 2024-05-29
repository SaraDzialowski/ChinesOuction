import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient ,) { }

  getReport() :Observable<any> {
    let url = `https://localhost:7171/api/Ouction/GetSum`;
    return this.httpClient.get<any>(url);
  }
  GetPurchesesDetails():Observable<any> {
    let url = `https://localhost:7171/api/Order/GetPurchesesDetails`;
    return this.httpClient.get<any>(url);
  }
  

}