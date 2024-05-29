import { Donator } from "./donator.model";
import { Purches } from "./purches.model";

export class Gift{
    id: number;
    name: string='';
    price: number =10;
    donatorId: number;
    category:number=0;
    description:string='';
    imgUrl:string='';
    status:boolean = false;
    winnerName:string = ''
}

