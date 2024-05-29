import { Order } from "./order.model";
import { OrderItem } from "./orderItem.model";

export class Purches{
    id: number;
    userName:string ='';
    password:string ='';
    fullName: string ='';
    phone: string ='';
    email:string ='';
    role:string ='';
    orders:Order[] = [];
}