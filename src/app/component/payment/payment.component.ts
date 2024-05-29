import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  @Input() price: number;

  @Input() 
  payment: boolean;

  @Output()
  valid: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  
  paymentvalidator(){
    this.valid.emit(true);
    this.payment = false;
  }
}
