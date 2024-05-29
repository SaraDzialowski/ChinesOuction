import { Component } from '@angular/core';
import { ConfirmationService, MessageService} from 'primeng/api';
import { Donator } from 'src/app/models/donator.model';
import { DonatorService } from 'src/app/services/donator.service';
import { GiftService } from 'src/app/services/gift.service';

@Component({
  selector: 'app-donators',
  templateUrl: './donators.component.html',
  styleUrls: ['./donators.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DonatorsComponent {
    constructor(private donatorService: DonatorService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

    donatorDialog: boolean = false;

    donators: Donator[] = [];

    donator: Donator = new Donator();

    submitted: boolean = false;

    name?:string;

    email?:string;

    giftName?:string;

    ngOnInit() {
        this.donatorService.reloadDonators$.subscribe(x => {
            this.donatorService.getDonators(null,this.name,this.email,this.giftName).subscribe(data => this.donators = data);
        });
    }
    
    openNew() {
        this.donator = new Donator();
        this.submitted = false;
        this.donatorDialog = true;
    }

    editDonator(donator: Donator) {
        this.donator = { ...donator };
        this.donatorDialog = true;
    }

    deleteDonator1(donator: Donator) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + donator.fullName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.donatorService.deleteDonator(donator.id).subscribe(x=>{
                    if(!x)
                      this.messageService.add({ severity: 'warn', detail: "You can't delete that donator because he has gifts"});
                    else
                    {   
                        this.donatorService.setReloadDonator();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Donator Deleted', life: 3000 });
                    }                   
                })
            }
        });
    }

    Search(){
        this.donatorService.setReloadDonator();
    }
}


