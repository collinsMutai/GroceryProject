import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SetLocationComponent } from '../set-location/set-location.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SetLocationComponent, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  currentUser: any;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    const userSub = this.authService.user$.subscribe((user) => {
      this.currentUser = user;
      console.log('Current User:', this.currentUser); 
    });
  }
  loginHandler() {
    this.router.navigate(['login']);
  }
  redirect() {
    this.router.navigateByUrl('/dashboard/products');
  }

  logoutHandler() {
    this.authService.logout();
   
  }
}
