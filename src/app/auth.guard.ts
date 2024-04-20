import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './service/user.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(private authService:UserService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data['expectedRole']; // Récupérer le rôle attendu à partir des données de la route
    const currentUserRole = this.authService.getRole(); // Récupérer le rôle actuel de l'utilisateur à partir du service d'authentification



    // Rediriger vers la page navbar si l'utilisateur n'est pas connecté ou si son rôle ne correspond pas au rôle attendu

    if (this.authService.isLogged()) {
      console.log("connecter")
      // Vérifier si le rôle de l'utilisateur correspond au rôle attendu pour la route actuelle
      if (currentUserRole === expectedRole) {
        console.log("ok")
        return true; // Autoriser l'accès à la route
      } else {
        
        return false; // Interdire l'accès à la route actuelle
      }
    } else {
      // L'utilisateur n'est pas connecté, le rediriger vers la page de connexion
      this.router.navigate(['/navbar']);
      return false; // Interdire l'accès à la route actuelle
    }
  }
  
}
  

