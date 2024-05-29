import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BucketService } from '../../services/bucket.service';
import { Order } from '../../models/order.model';
import { OrderItem } from 'src/app/models/orderItem.model';
import { GiftService } from 'src/app/services/gift.service';
import { KatalogService } from 'src/app/services/katalog.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
  providers: [ConfirmationService, MessageService,ToastModule]
})
export class BucketComponent {
  constructor(private bucketService: BucketService,private giftService: GiftService, private katalogService: KatalogService,private messageService: MessageService,){}

  orderItems:OrderItem[] = [];
 
  payment:boolean = false;

  price:number = 0;
  
  valid:boolean = false;
  
  @Input()
  order: Order = new Order();

  messages: Message[] | undefined;
  
  ngOnInit() {
    this.bucketService.reloadBucket$.subscribe(x => {
    this.bucketService.getOrderItems(this.order.id).subscribe(data => 
      {
        this.orderItems = data
        this.price = 0;
          this.orderItems.map(element => {
          this.giftService.getGifts(element.giftId).subscribe(data =>{ element.gift = data[0]
            this.price += element.gift.price*element.quentity;
          })
        });
      })
  }); 
}

deleteOrderItem(id: number) {
  this.bucketService.deleteOrderItem(id).subscribe(x=>{
    this.bucketService.setReloadBucket();
  })
}

paymentDetails(){
  this.payment = true;
} 

buyOrder(){
  this.bucketService.buyOrder(this.order.id).subscribe(x=>{
    this.bucketService.setReloadBucket();
  })
  this.messageService.add({detail: " The payment was successful 👍 "});
}

changeQuentity(oi:OrderItem){
  this.bucketService.updateOrder(oi).subscribe(x=>{
    this.bucketService.setReloadBucket();}
  )
}

setValid(flag:boolean){
this.valid = flag;
}
}

