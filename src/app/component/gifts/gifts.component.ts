import { Component } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Donator } from 'src/app/models/donator.model';
import { Gift } from 'src/app/models/gift.model';
import { DonatorService } from 'src/app/services/donator.service';
import { GiftService } from 'src/app/services/gift.service';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css'],
  providers: [ConfirmationService, MessageService,ToastModule]
})
export class GiftsComponent {
    giftDialog: boolean = false;

    gifts: Gift[] = [];

    gift: Gift = new Gift();

    submitted: boolean = false;

    num:number = 0;
    
    id?:number;

    name?:string;

    donatorName?:string;

    numOfPurcheses?:number;

    donators:Donator[]=[];

    categories: string[] = ['','shopping','vacation','house','other'];
    
    messages: Message[] | undefined;

    constructor(private giftService: GiftService,private donatorService:DonatorService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.giftService.reloadGifts$.subscribe(x => {
            this.giftService.getGifts(this.id,this.name,this.donatorName,this.numOfPurcheses,null,null).subscribe(data => this.gifts = data);
        });
        this.donatorService.getDonators().subscribe(data => this.donators = data)
    }

    openNew() {
        this.gift = new Gift();
        this.submitted = false;
        this.giftDialog = true;
    }

    editGift(gift: Gift) {
        this.gift = { ...gift };
        this.giftDialog = true;
    }

    deleteGift1(gift: Gift) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + gift.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.giftService.deleteGift(gift.id).subscribe(x=>{
                    if(!x)
                      this.messageService.add({  severity: 'warn',detail: "You can't delete that gift because someone bought it already"});
                    else
                    {
                        this.giftService.setReloadGift();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gift Deleted', life: 3000 });
                    }
                })
            }
        });
    }

    Search(){
        this.giftService.setReloadGift();
    }
    
    raffle(giftId:number){
        this.giftService.raffle(giftId).subscribe(x=>{
            if(x == null)
                this.messageService.add({  severity: 'warn',detail: 'There is no purcheses for this gift '});
            else
                this.giftService.setReloadGift();}  
        );
    }
    getNumOfPurcheses(giftName:string){
        this.num = 0
        this.giftService.getNumOfPurcheses(giftName).subscribe(x=>{
            x.forEach(d=>this.num += d.quentity)
            this.messageService.add({ detail: 'Num Of Purcheses '+ this.num });

           }  
        );
    }

        

    

}
