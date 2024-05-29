import { Component} from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Gift } from 'src/app/models/gift.model';
import { Order } from 'src/app/models/order.model';
import { OrderItem } from 'src/app/models/orderItem.model';
import { Winner } from 'src/app/models/winner.model';
import { BucketService } from 'src/app/services/bucket.service';
import { GiftService } from 'src/app/services/gift.service';
import { KatalogService } from 'src/app/services/katalog.service';
import { PurchesService } from 'src/app/services/purches.service';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css'],
  providers: [ConfirmationService, MessageService,ToastModule]
})
export class KatalogComponent {
  constructor(private giftService: GiftService,private bucketService: BucketService,private katalogService: KatalogService,private purchesService: PurchesService,private messageService: MessageService) { }

  giftDialog: boolean = false;
 
  orderItem:OrderItem = new OrderItem();
  
  gifts: Gift[] = [];

  categories: string[] = ['','shopping','vacation','house','other']
  
  o: Order = new Order();
  
  bucket:boolean = false;
 
  price?: number;
 
  categoryStr:string
  
  category?:number;
  
  maxPrice?:boolean = false

  maxQuentity?:boolean = false
  
  winner:Winner;

  messages: Message[] | undefined;
  

  ngOnInit() {
    this.giftService.reloadGifts$.subscribe(x => {
        this.giftService.getGifts(null,null,null,null,this.price,this.category,this.maxPrice,this.maxQuentity).subscribe(data => this.gifts = data);
    });

    this.katalogService.reloadKatalog$.subscribe(x => this.bucketService.getLastOrder().subscribe((data)=>
    {
        if(data?.sum == 0)
        {
          this.o = data;
        }
        else{
          this.o = new Order();
        }
    }));
  }

  addGiftToBucket(giftId:number){
    this.katalogService.setReloadKatalog()

    if(this.o.id == undefined)
    {
      this.messageService.add({detail: "New Order Added"});
      this.bucketService.addOrder(this.o).subscribe((data:any)=> {this.o.id = data 
      this.orderItem.giftId = giftId; 
      this.orderItem.orderId = this.o.id;
      this.katalogService.addGiftToBucket(this.orderItem).subscribe(x=>{
        this.messageService.add({detail: "New Item Added"});
      this.katalogService.setReloadKatalog();})}
      );    
    }  
    else{
      this.orderItem.giftId = giftId; 
      this.orderItem.orderId = this.o.id;
      this.katalogService.addGiftToBucket(this.orderItem).subscribe(x=>{
        this.messageService.add({detail: "New Item Added"});
      this.katalogService.setReloadKatalog();})
  }
  }
  
  goToBucket(){
    this.bucket = true;
  
  }

  getWinner(giftId:number){
    this.giftService.getWinners(giftId).subscribe((data) => {
      this.winner = data[0];
      this.purchesService.getPurcheses(this.winner.userId).subscribe(data=>this.messageService.add({detail: "The Winner Is " +data[0].fullName}))    
    });
  }

  Search(){
    for(let i=0; i<this.categories.length;i++)
    {
        if(this.categoryStr == this.categories[i])
          this.category = i;
    }  
    this.maxPrice = false;
    this.maxQuentity = false;
    this.giftService.setReloadGift();
  }

  goToKatalog(){
    this.bucket = false;
    this.katalogService.setReloadKatalog();
  }
  sort(price:boolean,mostBought:boolean){
    this.maxPrice = price;
    this.maxQuentity = mostBought;
    this.giftService.setReloadGift();
  }
}
