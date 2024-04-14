import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MounirComponent } from './mounir/mounir.component';
import { NAVBARComponent } from './navbar/navbar.component';
import { QRCodeModule } from 'angular2-qrcode';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatDialogModule} from '@angular/material/dialog';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CalenderComponent } from './calender/calender.component';
import { BodyComponent } from './body/body.component';
import { StatisticsComponent } from './statistics/statistics.component';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';

import localeFr from '@angular/common/locales/fr'
import { registerLocaleData } from '@angular/common';
import { TokenInterceptor, TokenInterceptorProvider } from './token.interceptor';
import { ManualPartComponent } from './manual-part/manual-part.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModifierProfilComponent } from './modifier-profil/modifier-profil.component';
import { LoginGoogleComponent } from './login-google/login-google.component';
import { DetailsEventComponent } from './details-event/details-event.component';
import { MapsComponent } from './maps/maps.component';
import { CapteursComponent } from './capteurs/capteurs.component';






//code pour transformer calendrier en francais
registerLocaleData(localeFr,'fr');

//classe pour reglage du hour de calendrier (sans pm et am) sig de type numeric
class CustomDateFormatter extends CalendarNativeDateFormatter {
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour:'numeric',minute:'numeric'}).format(date)
  }
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour:'numeric',minute:'numeric'}).format(date)
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MounirComponent,
    NAVBARComponent,
    AcceuilComponent,
    DashboardComponent,
    SidenavComponent,
    CalenderComponent,
    BodyComponent,
    StatisticsComponent,
    ManualPartComponent,
    ModifierProfilComponent,
    LoginGoogleComponent,
    DetailsEventComponent,
    MapsComponent,
    CapteursComponent,
    
  
  ],
  imports: [
    BrowserModule,
 
    AppRoutingModule,
    FormsModule,
    QRCodeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
   
    
   
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [MainComponent,NAVBARComponent,
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  TokenInterceptorProvider,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
