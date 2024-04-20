import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

// Remove FormsModule import if not used in this component
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],


})
export class MainComponent implements OnInit {
  [x: string]: any;

  registerObj : register ;// Initialize directly
  validobj:validation;
  modifierPaddwordObj:modifierPassword
  nouveauPasswordObj:nouveauPassword
  connectionObj:connection
  containerActive: boolean = false;

  constructor(private router: Router, private http: HttpClient, private userService:UserService) {
    this.registerObj=new register();
    this.validobj= new validation();
    this.nouveauPasswordObj= new nouveauPassword();
    this.modifierPaddwordObj=new modifierPassword();
    this.connectionObj=new connection();
  }

  ngOnInit(): void {
   
  }

  goToLogin(): void {
    this.containerActive = false;
  }

  goToRegister(): void {
    this.containerActive = true;
  }

  goToMounir(): void {
    this.router.navigate(['/mounir']); // Remove comma
  }
  message: string | null = null;
  isSuccessMessage: boolean = false;

  
 
  inscription(): void {
    if (!this.registerObj.nom || !this.registerObj.email || !this.registerObj.password) {
      this.message = 'Veuillez remplir tous les champs.';
      this.isSuccessMessage = false;
      return; // Interrompt l'exécution de la fonction si un champ est vide
    }



    this.http.post('http://localhost:8082/mounir', this.registerObj, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.message = response; // Met à jour le message pour l'afficher dans le div
          this.isSuccessMessage = response === "Inscription réussie"; // Détermine si c'est un message de succès
          if (this.isSuccessMessage) {
            // Naviguer vers '/accueil' ou autre action de succès
            this.router.navigateByUrl('/accueil');
          }
        },
        error: (error) => {
          this.message = error.error; // Affiche le message d'erreur dans le div
          this.isSuccessMessage = false; // Ce n'est pas un message de succès
        }
      });
  }
  message1: string | null = null;
  active: boolean = false;

  validation(): void {
    if (!this.validobj.code) {
      this.message1 = 'Veuillez entrer le code';
     
      return; // Interrompt l'exécution de la fonction si un champ est vide
    }



    this.http.post('http://localhost:8082/activation', this.validobj, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.message1 = response;
          this.active = response === "Activation réussie veuillez vous-connecter";
         
      
        },
        error: (error) => {
          this.message1 = error.error; // Affiche le message d'erreur dans le div
        // Ce n'est pas un message de succès
        }
      });
  }
  changer1: boolean = false;
  changerPassword(event: Event): void {
    event.preventDefault();
    this.changer1 = true;
    // Autre logique
  }
  message2: string | null = null;
  active2: boolean = false;

  changerPasswordd(): void {
    if (!this.modifierPaddwordObj.email) {
      this.message2 = 'Veuillez entrer le code';
     
      return; // Interrompt l'exécution de la fonction si un champ est vide
    }



    this.http.post('http://localhost:8082/modifier-mot-de-passe', this.modifierPaddwordObj, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.message2 = response;
          this.active2 = response === "utilisateur reconnue"
          
         
      
        },
        error: (error) => {
          this.message2 = error.error; // Affiche le message d'erreur dans le div
        // Ce n'est pas un message de succès
        }
      });
  }
  message3: string | null = null;
  active3: boolean = false;


  nouveauPassword(): void {
    this.nouveauPasswordObj.email = this.modifierPaddwordObj.email.toString();
    if ( !this.nouveauPasswordObj.code || !this.nouveauPasswordObj.password) {
      this.message3 = 'Veuillez remplir tous les champs.';
     
      return; // Interrompt l'exécution de la fonction si un champ est vide
    }



    this.http.post('http://localhost:8082/nouveau-mot-de-passe', this.nouveauPasswordObj, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.message3 = response;
          this.active3 = response === "mot de passe changé avec succes"
          
         
      
        },
        error: (error) => {
          this.message3 = error.error; // Affiche le message d'erreur dans le div
        // Ce n'est pas un message de succès
        }
      });
  }
  SeConnecter():void{

  this.changer1=false;
  this.active2=false;
  this.active3=false


  }
  //message4: string | null = null;


  isUserLoggedIn: boolean = false;
 /* connection(l:boolean): void {
    if (!this.connectionObj.username || !this.connectionObj.password ) {
      this.message4 = 'Veuillez remplir tous les champs.';
     
      return; // Interrompt l'exécution de la fonction si un champ est vide
    }



    this.http.post('http://localhost:8082/connexion', this.connectionObj, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.message4 = response;
          if (this.message4!=="Adresse e-mail incorrecte" && this.message4!=="Mot de passe incorrect" && this.message4!=="Problème d'authentification" && this.message4!=="Échec de l'authentification"    ){
                localStorage.setItem('token',response)
                l=true;
              
                this.isUserLoggedIn=true;
                console.log(this.isUserLoggedIn);
                console.log(l);
                

          }
          

          
          
         
      
        },
        error: (error) => {
          this.message4 = error.error; // Affiche le message d'erreur dans le div
        // Ce n'est pas un message de succès
        }
      });
  }*/

  message4: string = '';
  login(connectionObj:any): void {
    if (!this.connectionObj.username || !this.connectionObj.password ) {
      this.message4 = 'Veuillez remplir tous les champs.';
     
      return; // Interrompt l'exécution de la fonction si un champ est vide
    }

    this.userService.login(connectionObj).subscribe({
        next: (response) => {
          if (typeof response === 'string'){
            this.message4 = response ; //fare affichage de probleme dans div
          }else{
            const { token, role } = this.userService.extractTokenAndRole(response);
            this.userService.saveToken(token);
            this.userService.saveRole(role);
            this.message4 = 'Connexion réussie !'; 
            console.log('Connexion réussie !');
            
          }
       
        },
        error: (error) => {
          this.message4 = error.error; // Affiche le message d'erreur dans le div
        // Ce n'est pas un message de succès
        }
      });
  }

  connection1(l:boolean){
    l=true;
  }
  
  
  


}

  

export class register {
  nom: string = ''; // Initialize properties for better data handling
  email: string = '';
  password: string = '';
}
export class validation {
 code : String='';

}
export class modifierPassword{
 email:String='';
}
export class nouveauPassword{
  email:string='';
  code:string='';
  password:string='';

}
export class connection{
  username:String='';
  password:String='';
}
