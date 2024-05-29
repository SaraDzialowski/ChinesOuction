import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { ConfirmationService, MessageService } from 'primeng/api';
//import { Presenr } from './domain/product';
//import { PresentService } from './services/productservice';
//import { PresentService } from './services/PresentService';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    
})
export class AppComponent  {
    constructor(private router:Router){}
}
