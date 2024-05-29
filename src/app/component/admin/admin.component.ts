import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GiftService } from 'src/app/services/gift.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private giftService: GiftService,private adminService: AdminService){}

  getAllWinners(){
    this.giftService.getWinners().subscribe((data) => {
      ;})
  }

  getReport(){
     this.adminService.getReport().subscribe((data) => {
      ;});
  }
  GetPurchesesDetails(){
    this.adminService.GetPurchesesDetails().subscribe((data) => {
      ;});
  }
}
