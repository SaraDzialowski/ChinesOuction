import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppComponent } from './app.component';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { GiftsComponent } from './component/gifts/gifts.component';
import { GiftDialogComponent } from './component/gift-dialog/gift-dialog.component';
import { DonatorsComponent } from './component/donators/donators.component';
import { AppRoutingModule } from './app-routing.module';
import { DonatorDialogComponent } from './component/donator-dialog/donator-dialog.component';
import { PurchesesComponent } from './component/purcheses/purcheses.component';
import { PurchesDialogComponent } from './component/purches-dialog/purches-dialog.component';
import { KatalogComponent } from './component/katalog/katalog.component';
import { AdminComponent } from './component/admin/admin.component';
import { UserComponent } from './component/user/user.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { BucketComponent } from './component/bucket/bucket.component';
import { PaymentComponent } from './component/payment/payment.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/TokenInterceptor.interceptor';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [
        AppComponent,
        GiftsComponent,
        GiftDialogComponent,
        DonatorsComponent,
        DonatorDialogComponent,
        PurchesesComponent,
        PurchesDialogComponent,
        KatalogComponent,
        AdminComponent,
        UserComponent,
        LoginComponent,
        RegisterComponent,
        BucketComponent,
        PaymentComponent,
        
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ToolbarModule,
        ConfirmDialogModule,
        RatingModule,
        InputNumberModule,
        InputTextareaModule,
        RadioButtonModule,
        DropdownModule,
        ButtonModule,
        CalendarModule,
        FileUploadModule,
        ReactiveFormsModule,
        ToastModule
    ],
    providers: [ConfirmationService,MessageService,{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },ToastModule],
    bootstrap: [AppComponent]
})
export class AppModule { }
