import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-manual-part',
  templateUrl: './manual-part.component.html',
  styleUrls: ['./manual-part.component.css']
})
export class ManualPartComponent implements OnInit {

  evenementObj :evenement ;
  constructor(private router:Router, private http:HttpClient,  private userService:UserService){
    this.evenementObj= new evenement();
  }
  ngOnInit(): void {
    
   
  }
 

  // Méthode pour ajouter un zéro avant les chiffres pour obtenir une chaîne de deux chiffres
 
  message4: string | null = null;
 // Déclarer une instance de la classe evenement

  AjouterEvent(): void {
    if (!this.evenementObj.title || !this.evenementObj.start || !this.evenementObj.end) {
      this.message4 = 'Veuillez remplir tous les champs.';
      setTimeout(() => { // Définir un délai pour réinitialiser message4 après 3 secondes
        this.message4 = '';
      }, 3000)
      return; // Interrompt l'exécution de la fonction si un champ est vide
    }
    this.userService.AjouterEvent(this.evenementObj).subscribe({
      next: (Response)=>{
        this.message4=Response;
        setTimeout(() => { // Définir un délai pour réinitialiser message4 après 3 secondes
          this.message4 = '';
        }, 3000)
        
      },
      error: (error) => {
        this.message4 = error.error; // Affiche le message d'erreur dans le div
      // Ce n'est pas un message de succès
      }
      
    })
    
  }
}

export class evenement {
  title: string = '';
  start: Date | undefined;
  end: Date | undefined;
}
