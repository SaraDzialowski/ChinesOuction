import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Purches } from '../models/purches.model';

@Injectable({
  providedIn: 'root'
})
export class PurchesService {

  constructor(private httpClient: HttpClient) { }
  private reloadPurchesesSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadPurcheses$: Observable<boolean> = this.reloadPurchesesSubject.asObservable();

  getPurcheses(id?: number): Observable<Purches[]>{   
    let url = `https://localhost:7171/api/User`;
    if(id) 
    {
      url+=`?id=${id}`;
    }   
    return this.httpClient.get<Purches[]>(url);
  }
  // getPurchesById(id: number) : Observable<Purches>{
  //   let url = 'https://localhost:7039/api/Purches/GetPurchesById/' + id;
  //   return this.httpClient.get<Purches>(url);
  // }

  addPurches(purches: Purches) :Observable<boolean> {
    let url = `https://localhost:7171/api/User/register`;
    return this.httpClient.post<boolean>(url, purches)
  }

  updatePurches(purches: Purches) :Observable<boolean>{
    let url = `https://localhost:7171/api/User`;
    return this.httpClient.put<boolean>(url, purches);
  }

  deletePurches(id: number) :Observable<boolean>{
    let url = `https://localhost:7171/api/User/` + id;
    return this.httpClient.delete<boolean>(url);
  }

  setReloadPurches(){
    let flag = this.reloadPurchesesSubject.value;
    this.reloadPurchesesSubject.next(!flag);
  }
}