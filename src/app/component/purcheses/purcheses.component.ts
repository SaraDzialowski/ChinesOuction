import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Purches } from 'src/app/models/purches.model';
import { PurchesService } from 'src/app/services/purches.service';

@Component({
  selector: 'app-purcheses',
  templateUrl: './purcheses.component.html',
  styleUrls: ['./purcheses.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PurchesesComponent {
  constructor(private purchesService: PurchesService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  purchesDialog: boolean = false;
  purcheses: Purches[] = [];
  purches: Purches = new Purches();
    submitted: boolean = false;

    ngOnInit() {
        this.purchesService.reloadPurcheses$.subscribe(x => {
            this.purchesService.getPurcheses().subscribe(data => this.purcheses = data);
        });
    }

    openNew() {
        this.purches = new Purches();
        this.submitted = false;
        this.purchesDialog = true;
    }

    editPurches(purches: Purches) {
        this.purches = { ...purches };
        this.purchesDialog = true;
    }

    deletePurches1(purches: Purches) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + purches.fullName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.purchesService.deletePurches(purches.id).subscribe(x=>{
                    this.purchesService.setReloadPurches();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Purches Deleted', life: 3000 });
                })
            }
        });
    }
}
