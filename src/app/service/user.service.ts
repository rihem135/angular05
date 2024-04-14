import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';

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

 
  login(connectionObj: any): Observable<string> {
    return this.http.post('http://localhost:8082/connexion', connectionObj, { responseType: 'text' });
  }
  ModifierProfil(ProfilObj: any): Observable<string> {
    return this.http.post('http://localhost:8082/modifier', ProfilObj, { responseType: 'text' });
  }

  
  AjouterEvent(evenement: any): Observable<string> {
    return this.http.post('http://localhost:8082/calendar/add', evenement, { responseType: 'text' });
  }
  getCalendarEvents(): Observable<CalendarEvent[]> {
    return this.http.get<EventDate[]>('http://localhost:8082/calendar/get1').pipe(
      map((events: any[]) => events.map(event => ({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end)
      })))
    );
  }
  


  setIsUserLoggedIn(value: boolean): void {
    this.isUserLoggedInSubject.next(value);
    
  }
  saveToken(token:string):void{
    localStorage.setItem('token',token)
  }
  isLogged(): boolean{
    const token =localStorage.getItem('token')
    console.log(token)
    return !! token 
  }
  clearToken(): void{
    localStorage.removeItem('token')
  }
  getToken(): String |null{
    return localStorage.getItem('token')
  }

}
interface EventDate {
  title: string;
  start: string;
  end: string;
}

