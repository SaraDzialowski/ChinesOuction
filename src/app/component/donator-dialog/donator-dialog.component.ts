import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Donator } from 'src/app/models/donator.model';
import { DonatorService } from 'src/app/services/donator.service';

@Component({
  selector: 'app-donator-dialog',
  templateUrl: './donator-dialog.component.html',
  styleUrls: ['./donator-dialog.component.css']
})
export class DonatorDialogComponent implements OnChanges{
  constructor(private donatorService: DonatorService){}
  
  donator: Donator = new Donator();
  submitted: boolean = false; 
  @Input()
  donatorId: number;
  @Input()
  donatorDialog: boolean = true;
  @Output()
  donatorDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.donatorId){
      this.donatorService.getDonators(this.donatorId).subscribe(data=> this.donator = data[0]);}
    else
      this.donator = new Donator();
  }
  hideDialog() {
    this.donatorDialog = false;
    this.donatorDialogChange.emit(this.donatorDialog);
    this.submitted = false;
    this.donator = new Donator();
  }

  saveDonator(){
    this.submitted = true;
    if(this.donator.fullName.trim()) {
      if(this.donator.id){        
        this.donatorService.updateDonator(this.donator).subscribe( x => {
            this.donatorService.setReloadDonator();
        });
      }
      else{
        this.donatorService.addDonator(this.donator).subscribe( x => {
          this.donatorService.setReloadDonator();
        });
      }
      this.hideDialog();
    }
    
  }
}

