import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MounirComponent } from './mounir/mounir.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { NAVBARComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CalenderComponent } from './calender/calender.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ManualPartComponent } from './manual-part/manual-part.component';
import { LoginGoogleComponent } from './login-google/login-google.component';
import { DetailsEventComponent } from './details-event/details-event.component';
import { MapsComponent } from './maps/maps.component';
import { CapteursComponent } from './capteurs/capteurs.component';
import { HomeComponent } from './home/home.component';

import { BodyComponent } from './body/body.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path :"main" , component :MainComponent} ,
  {path :'' , redirectTo:"navbar",pathMatch:"full"} ,
  {path :"google" , component :LoginGoogleComponent},
  {path:'chat/:userId', component:CapteursComponent},
  {path :"mounir" , component :MounirComponent},
  {path:"acceuil" , component : AcceuilComponent},
  {path:"navbar" , component : NAVBARComponent},
  //{path :"sidenav" , component :SidenavComponent},
  //{path :"statistics" , component :StatisticsComponent},
  //{path :"details" , component :DetailsEventComponent},
  //{path :"maps" , component :MapsComponent},
  //{path: 'home', component: HomeComponent },
  //{path :"manual_part" , component :ManualPartComponent},
  {path :"sidenav" , component :SidenavComponent},
  {path :"body" , component: BodyComponent},


  
  { path: '1', component: NAVBARComponent },
  { path: '2', component: NAVBARComponent },
  { path: '3', component: NAVBARComponent },
  
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'utilisateur'},
    children: [
      
     
      /*{ path: 'home', component: HomeComponent },
      {path :"statistics" , component :StatisticsComponent},
      { path: 'calender', component: CalenderComponent },
      {path :"manual_part" , component :ManualPartComponent},
      {path :"details" , component :DetailsEventComponent},
      {path :"maps" , component :MapsComponent},*/
      
    ]
  },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'administrateur' },
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

