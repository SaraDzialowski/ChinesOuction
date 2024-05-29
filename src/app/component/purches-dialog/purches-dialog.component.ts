import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Purches } from 'src/app/models/purches.model';
import { BucketService } from 'src/app/services/bucket.service';
import { PurchesService } from 'src/app/services/purches.service';

@Component({
  selector: 'app-purches-dialog',
  templateUrl: './purches-dialog.component.html',
  styleUrls: ['./purches-dialog.component.css']
})
export class PurchesDialogComponent {
  constructor(private purchesService: PurchesService,private router:Router){} 
  purches: Purches = new Purches();
  submitted: boolean = false; 
  @Input()
  purchesId: number;
  @Input()
  purchesDialog: boolean = true;
  @Output()
  purchesDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnChanges(changes: SimpleChanges): void {
    if(this.purchesId)
      this.purchesService.getPurcheses(this.purchesId).subscribe(data => this.purches = data[0]);
    else
      this.purches = new Purches();
  }

  hideDialog() {
    this.purchesDialog = false;
    this.purchesDialogChange.emit(this.purchesDialog);
    this.submitted = false;
    this.purches = new Purches();
  }

  savePurches(){
    this.submitted = true;
    if(this.purches.fullName.trim()) {
      if(this.purches.id){
        this.purchesService.updatePurches(this.purches).subscribe( x => {
            this.purchesService.setReloadPurches();
        });
      }
      else{
        this.purchesService.addPurches(this.purches).subscribe( x => {
          this.purchesService.setReloadPurches();
        });
      }
      this.hideDialog();
    }
    
  }
}
