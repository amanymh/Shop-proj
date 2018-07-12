import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from './models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable<firebase.User>;

  constructor(private afAuth :AngularFireAuth ,
   private userService :UserService,
    private router :ActivatedRoute) {
    this.user$ = afAuth.authState 
   }

  login(){
  let returnUrl = this.router.snapshot.queryParamMap.get("returnUrl") || './';
  localStorage.setItem("returnUrl",returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$ () :Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user => {
        if(user) return this.userService.get(user.uid);
         return Observable.of(null);
      }))
  }
}
