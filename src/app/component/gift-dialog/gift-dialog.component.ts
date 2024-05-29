import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Donator } from 'src/app/models/donator.model';
import { Gift } from 'src/app/models/gift.model';
import { DonatorService } from 'src/app/services/donator.service';
import { GiftService } from 'src/app/services/gift.service';

@Component({
  selector: 'app-gift-dialog',
  templateUrl: './gift-dialog.component.html',
  styleUrls: ['./gift-dialog.component.css'],
  //providers: [ConfirmationService, MessageService]
})
export class GiftDialogComponent implements OnChanges{
  constructor(private giftService: GiftService,private donatorService:DonatorService){}
  
  donators:Donator[] = [];

  gift: Gift = new Gift();

  donator: Donator = new Donator ();

  category: string;

  submitted: boolean = false; 
  
  @Input()
  giftId: number;

  @Input()
  giftDialog: boolean = true;
  
  @Output()
  giftDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();
 
  categories: string[] = ['','shopping','vacation','house','other']

  ngOnInit() {
    this.donatorService.reloadDonators$.subscribe(x => {
        this.donatorService.getDonators().subscribe(data => this.donators = data);
    });
}
  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.giftId)
      this.giftService.getGifts(this.giftId).subscribe(data => this.gift = data[0]);
    else
      this.gift = new Gift();
  }

  hideDialog() {
    this.giftDialog = false;
    this.giftDialogChange.emit(this.giftDialog);
    this.submitted = false;
    this.gift = new Gift();
  }

  saveGift(){
    this.submitted = true;
    this.gift.donatorId = this.donator.id;    
    if(this.gift.name.trim()) {
      for(let i=0; i<this.categories.length;i++)
      {
          if(this.category == this.categories[i])
          this.gift.category = i;
      }  
      if(this.gift.id){
        this.giftService.updateGift(this.gift).subscribe( x => {
            this.giftService.setReloadGift();
        });
      }
      else{ 
        this.giftService.addGift(this.gift).subscribe( x => {
          this.giftService.setReloadGift();
        });
      }
      this. hideDialog();
    }
    
  }
}
