import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Donator } from '../models/donator.model';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/orderItem.model';
import { Gift } from '../models/gift.model';

@Injectable({
  providedIn: 'root'
})
export class BucketService {
  constructor(private httpClient: HttpClient) { }

  private reloadBucketSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  reloadBucket$: Observable<boolean> = this.reloadBucketSubject.asObservable();
 
  addOrder(o:Order) :Observable<any> {
    let url = `https://localhost:7171/api/Order`;
    return this.httpClient.post<any>(url,o);
  }
  getLastOrder() :Observable<any> {
    let url = `https://localhost:7171/api/Order/GetLastOrder`;
    return this.httpClient.get<any>(url);
  }
  
  getOrderItems(orderId? :number):Observable<OrderItem[]>
  {
    let url = `https://localhost:7171/api/OrderItem`;
    if(orderId)
     url += `?orderId=${orderId}`
    else
     url += "?orderId=0"
    return this.httpClient.get<OrderItem[]>(url);
  }
 
  deleteOrderItem(id: number) :Observable<boolean>{
    let url = `https://localhost:7171/api/OrderItem/` + id;
    return this.httpClient.delete<boolean>(url);
  }

  buyOrder(id: number):Observable<any>{
    let url = `https://localhost:7171/api/Order/Buy/` + id;
    return this.httpClient.get<any>(url);
  }

 updateOrder(oi:OrderItem) :Observable<any> {
    let url = `https://localhost:7171/api/OrderItem`;
    return this.httpClient.put<any>(url,oi);
  }

  setReloadBucket(){
    let flag = this.reloadBucketSubject.value;
    this.reloadBucketSubject.next(!flag);
  }
}