import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUserLoggedIn$: Observable<boolean> = this.isUserLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }
  
  // Méthode pour récupérer les utilisateurs depuis l'API
  public getUsers() {
    return this.http.get<any[]>("https://jsonplaceholder.typicode.com/users");}

   a:boolean=false;
   changerVariable(): void {
    this.a = true;
  }
  login(connectionObj: any): Observable<string> {
    return this.http.post('http://localhost:8082/connexion', connectionObj, { responseType: 'text' });
  }
  setIsUserLoggedIn(value: boolean): void {
    this.isUserLoggedInSubject.next(value);
    
  }
  

}
