import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonatorsComponent } from './component/donators/donators.component';
import { AppComponent } from './app.component';
import { PurchesesComponent } from './component/purcheses/purcheses.component';
import { KatalogComponent } from './component/katalog/katalog.component';
import { AdminComponent } from './component/admin/admin.component';
import { UserComponent } from './component/user/user.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { GiftsComponent } from './component/gifts/gifts.component';
import { BucketComponent } from './component/bucket/bucket.component';

const routes: Routes = [{path:'', redirectTo:'/login', pathMatch:'full'},
                        {path:'login',component:LoginComponent},
                        {path:'register',component:RegisterComponent},
                        {path:'admin', component:AdminComponent, children:[
                          {path:'donators', component:DonatorsComponent},
                          {path:'purcheses', component:PurchesesComponent},
                          {path:'gifts', component:GiftsComponent}
                        ]},
                        {path:'user', component:UserComponent, children:[
                          {path:'katalog', component:KatalogComponent,children:[
                            {path:'katalog', component:KatalogComponent},
                        ]}

                        ]}
                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }