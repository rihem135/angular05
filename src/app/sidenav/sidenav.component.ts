import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';

import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { logoutData } from './logout-data';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { ModifierProfilComponent } from '../modifier-profil/modifier-profil.component';


interface SideNavToggle{
  screenWidht: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut',[
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms', style({opacity: 1}) )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms', style({opacity: 0}) )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', keyframes([
          style({transform: 'rotate(0deg)', offset: '0'}),
          style({transform: 'rotate(2turn)', offset: '1'})
        ]))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit{

  isSmallScreen = window.innerWidth < 992;

  

  donnee: donnee = new donnee();


  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidht= 0;
  navData = navbarData;
  outData = logoutData;
  dialogRefConfig: { dialogConfig: MatDialogConfig; dialogRef: any; } | undefined;
  constructor(private dialog: MatDialog,private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.screenWidht = window.innerWidth;

    const httpOptions: { headers: HttpHeaders, responseType: 'json' } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // Définir le type de contenu JSON
      }),
      responseType: 'json' // Spécifier le type de réponse JSON
    };

    this.http.get<any>('http://localhost:8082/get', httpOptions).subscribe(
      (response) => {
        this.donnee.nom = response.nom;
     
        
        
      },
      err => console.error(err)
    );
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenWidht = window.innerWidth;
    if(this.screenWidht <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidht: this.screenWidht});
    }
  }

  

  toggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidht: this.screenWidht});
  }
  closeSidenav():void{
    this.collapsed = false
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidht: this.screenWidht});
  }
  openModel(): void {
    const dialogConfig = new MatDialogConfig();
    
    if (this.isSmallScreen) {
      dialogConfig.maxWidth = '100vw';
      dialogConfig.maxHeight = '100vh';
    }
    else {
      dialogConfig.maxWidth = '90vw'; // Largeur maximale de 90% de la vue
      dialogConfig.maxHeight = '90vh'; // Hauteur maximale de 90% de la vue
    }
  
    dialogConfig.position = { top: '100px' };
    dialogConfig.panelClass = 'custom-dialog-container';
    
    this.dialogRefConfig = {
      dialogConfig: dialogConfig,
      dialogRef: this.dialog.open(ModifierProfilComponent,dialogConfig)
      
      
    };
  }

}

export class donnee{
  nom:String='';
 
}
