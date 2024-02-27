import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if user is logged in (you need to implement this logic)
    const isLoggedIn = !!localStorage.getItem('token'); // Example logic, adjust as per your authentication mechanism
    
    if (!isLoggedIn) {
      this.router.navigateByUrl('/login'); // Redirect to login page if not logged in
      return false;
    }
    
    return true; // Allow navigation to the route if user is logged in
  }
  
}
