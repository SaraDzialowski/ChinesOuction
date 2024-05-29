import { OrderItem } from "./orderItem.model";

export class Order{
    id: number;
    userId: number = 0;
    sum:number=0;
    date:Date = new Date();
    orderItems:OrderItem[] =[];
}
