import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Donator } from '../models/donator.model';

@Injectable({
  providedIn: 'root'
})
export class DonatorService {

  constructor(private httpClient: HttpClient) { }
  private reloadDonatorsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadDonators$: Observable<boolean> = this.reloadDonatorsSubject.asObservable();

  getDonators(id?: number,name?:string,email?:string,giftName?:string): Observable<Donator[]>{   
    let url = `https://localhost:7171/api/Donator`;
    if(id || name || email || giftName) 
       {
         url += `?`;
         if(id)
          url+=`id=${id}`;
        if(name)
          url+=`&name=${name}`; 
        if(email)
          url+=`&email=${email}`;
        if(giftName)
          url+=`&giftName=${giftName}`;
       }   
    return this.httpClient.get<Donator[]>(url);
  }
  addDonator(donator: Donator) :Observable<boolean> {
    let url = `https://localhost:7171/api/Donator`;
    return this.httpClient.post<boolean>(url, donator)
  }

  updateDonator(donator: Donator) :Observable<boolean>{
    let url = `https://localhost:7171/api/Donator`;
    return this.httpClient.put<boolean>(url,donator);
  }

  deleteDonator(id: number) :Observable<boolean>{
    let url = `https://localhost:7171/api/Donator/` + id;
    return this.httpClient.delete<boolean>(url);
  }

  setReloadDonator(){
    let flag = this.reloadDonatorsSubject.value;
    this.reloadDonatorsSubject.next(!flag);
  }
}