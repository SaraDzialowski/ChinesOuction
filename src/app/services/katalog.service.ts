import { Injectable } from '@angular/core';
import { Gift } from '../models/gift.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderItem } from '../models/orderItem.model';

@Injectable({
  providedIn: 'root'
})
export class KatalogService{
  constructor(private httpClient: HttpClient) { }
  
  private reloadKatalogSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  reloadKatalog$: Observable<boolean> = this.reloadKatalogSubject.asObservable();

getGifts(): Observable<Gift[]>{
      let url = 'https://localhost:7171/api/Gift/GetGifts';
      return this.httpClient.get<Gift[]>(url);
    }

addGiftToBucket(orderItem:OrderItem):Observable<boolean>{
      let url = 'https://localhost:7171/api/OrderItem';
      return this.httpClient.post<boolean>(url,orderItem);
    }

setReloadKatalog(){
    let flag = this.reloadKatalogSubject.value;
    this.reloadKatalogSubject.next(!flag);
  }
  sort(price:boolean,mostBought:boolean):Observable<Gift[]>{
    let url = 'https://localhost:7171/api/Order/SortGift?';
    url+=`price = ${price} & maxQuentity = ${mostBought} `
    return this.httpClient.get<Gift[]>(url);
  }
}