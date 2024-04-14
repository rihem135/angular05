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


const routes: Routes = [
  {path :"main" , component :MainComponent} ,
 
  {path :"navbar" , redirectTo:"navbar",pathMatch:"full"} ,
  {path :"sidenav" , component :SidenavComponent},
  {path :"calender" , component :CalenderComponent},
  {path :"statistics" , component :StatisticsComponent},
  {path :"google" , component :LoginGoogleComponent},
  {path :"details" , component :DetailsEventComponent},
  {path :"maps" , component :MapsComponent},
  {path:'chat/:userId', component:CapteursComponent},
  
 

{path :"mounir" , component :MounirComponent},
{path :"manual_part" , component :ManualPartComponent},
{path:"acceuil" , component : AcceuilComponent},
{path:"navbar" , component : NAVBARComponent},
{path:"dashboard", component : DashboardComponent},
{path :"", redirectTo:'dashboard',pathMatch:"full"},
{ path: '1', component: NAVBARComponent },
{ path: '2', component: NAVBARComponent },
{ path: '3', component: NAVBARComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
