import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MainComponent } from '../main/main.component';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../service/user.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
 
})
export class NAVBARComponent implements OnInit {
  s:boolean=false;
  
   dialogRefConfig: { dialogRef: MatDialogRef<MainComponent>, dialogConfig: MatDialogConfig } | null = null;
  

  isSmallScreen = window.innerWidth < 992;

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.isSmallScreen = window.innerWidth < 992;
  }
  

  supportObj :support;
  constructor(private dialog: MatDialog, private router :Router,private http: HttpClient,  private userService:UserService,){
    this.supportObj=new support();
  }
  ngOnInit(): void {
    this.userService.isUserLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.s = isLoggedIn;
      if (this.s==true&&this.dialogRefConfig && this.dialogRefConfig.dialogRef) {
        this.dialogRefConfig.dialogRef.close();
      }
    });
   

    
  }
  openModel(): void {
    const dialogConfig = new MatDialogConfig();
    
    if (this.isSmallScreen) {
      dialogConfig.maxWidth = '100vw';
      dialogConfig.maxHeight = '100vh';
    } else {
      dialogConfig.maxWidth = '600px';
      dialogConfig.maxHeight = '600px';
    }
  
    dialogConfig.position = { top: '100px' };
    dialogConfig.panelClass = 'custom-dialog-container';

    // Ouvrir la fenêtre modale et assigner la référence et la configuration à dialogRefConfig
    
    this.dialogRefConfig = {
      dialogConfig: dialogConfig,
      dialogRef: this.dialog.open(MainComponent,dialogConfig)
      
      
    };
  }
  
  
 
 
  
 
 
 
  navigateToSection(sectionId: string) {
    this.router.navigate([sectionId]);
  }
  toAcceuil(){
    document.getElementById("acceuil")?.scrollIntoView();
  }
  toAPropos(){
    document.getElementById("APropos")?.scrollIntoView();
  }
  toStat(){
    document.getElementById("Stat")?.scrollIntoView();
  }
  toContact(){
    document.getElementById("Contact")?.scrollIntoView();
  }

  @ViewChild('navbarSupportedContent') navbarCollapse!: ElementRef;

  toggleNavbar(): void {
    this.navbarCollapse.nativeElement.classList.toggle('show');
  }
  
  message: string | null = null;
  active: boolean = false;
  support(): void {
    if (!this.supportObj.email&& !this.supportObj.nom && !this.supportObj.telephone && !this.supportObj.message) {
      this.message = ' remplissez tous les champs ';
     
      return; // Interrompt l'exécution de la fonction si un champ est vide
    }



    this.http.post('http://localhost:8082/support', this.supportObj, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.message = response;
          this.active = response === "Message récu";
          this.supportObj.email="";
          this.supportObj.nom="";
          this.supportObj.telephone="";
          this.supportObj.message="";

         
      
        },
        error: (error) => {
          this.message = error.error;
          this.active =false; // Affiche le message d'erreur dans le div
        // Ce n'est pas un message de succès
        }
      });
  }
  

}
export class support{
  nom:String='';
  email:String='';
  telephone:String='';
  message:String='';


}


