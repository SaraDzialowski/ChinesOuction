import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Gift } from '../models/gift.model';
import { Winner } from '../models/winner.model';
import { OrderItem } from '../models/orderItem.model';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  constructor(private httpClient: HttpClient) { }
  private reloadGiftsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadGifts$: Observable<boolean> = this.reloadGiftsSubject.asObservable();

  getGifts(id?:number, name?:string, donatorName?:string, numOfPurcheses?:number, price?:number, category?:number,maxPrice?:boolean,maxQuentity?:boolean): Observable<Gift[]>{
    let url = `https://localhost:7171/api/Gift`;
    if(id || name || donatorName || numOfPurcheses || price || category || maxPrice || maxQuentity) 
       {
         url += `?`;
         if(id)
          url+=`id=${id}`;
        if(name)
          url+=`&name=${name}`; 
        if(donatorName)
          url+=`&donatorName=${donatorName}`;
        if(numOfPurcheses)
          url+=`&numOfPurcheses=${numOfPurcheses}`;
        if(price)
          url+=`&price=${price}`;
        if(category)
          url+=`&category=${category}`;
        if(maxPrice){
          url+=`&sortPrice=${maxPrice}`;
          url+=`&maxQuentity=false`;
        }
        if(maxQuentity){
          url+=`&sortPrice=false`;
          url+=`&maxQuentity=${maxQuentity}`;
        }``
       }   
       
    return this.httpClient.get<Gift[]>(url);
  }

  addGift(gift: Gift) :Observable<boolean> {
    let url = `https://localhost:7171/api/Gift`;
    return this.httpClient.post<boolean>(url, gift)
  }

  updateGift(gift: Gift) :Observable<boolean>{
    let url = `https://localhost:7171/api/Gift`;
    return this.httpClient.put<boolean>(url, gift);
  }

  deleteGift(id: number) :Observable<boolean>{
    let url = `https://localhost:7171/api/Gift/` + id;
    return this.httpClient.delete<boolean>(url);
  }
  
  raffle(giftId: number) :Observable<boolean>{
    let url = `https://localhost:7171/api/Ouction/` + giftId;
    return this.httpClient.get<boolean>(url);
  }

  getWinners(giftId?: number):Observable<Winner[]>{
    let url = `https://localhost:7171/api/Ouction/GetWinners`
    if(giftId)
          url+=`?giftId=${giftId}`;
    return this.httpClient.get<Winner[]>(url);
  }
  
  getNumOfPurcheses(giftName:string):Observable<OrderItem[]>{
    let url = `https://localhost:7171/api/Order/GetGiftCards/` + giftName
    return this.httpClient.get<OrderItem[]>(url);
  }

  setReloadGift(){
    let flag = this.reloadGiftsSubject.value;
    this.reloadGiftsSubject.next(!flag);
  }

}