import { Gift } from "./gift.model";

export class Donator{
    id: number;
    fullName: string ='';
    phone: string ='';
    email:string = '';
    gifts:Gift[] = [];
}



