import { Gift } from "./gift.model";

export class OrderItem{
    id: number = 0;
    orderId: number = 0;
    giftId:number=0;
    quentity:number =1;
    flag:boolean = false;
    gift:Gift = new Gift
}
 