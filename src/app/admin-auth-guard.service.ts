import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map  } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private Auth: AuthService,private userService :UserService) { }

  canActivate():Observable<boolean>{
      return this.Auth.appUser$.pipe(
    map(appUser => appUser.isAdmin))
  
  }
}
