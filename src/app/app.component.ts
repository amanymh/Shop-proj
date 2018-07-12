import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
   
  constructor( private authService :AuthService,route :Router,userService :UserService){
    authService.user$.subscribe(user =>{
      if(!user) return;

        userService.save(user);
        let returnUrl = localStorage.getItem("returnUrl");
        if(!returnUrl) return ;
        localStorage.removeItem("returnUrl");
         route.navigateByUrl(returnUrl);
      
    });
  }
      
       
     
}
