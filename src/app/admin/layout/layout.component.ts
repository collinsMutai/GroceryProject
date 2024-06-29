import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SetLocationComponent } from '../set-location/set-location.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SetLocationComponent, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  constructor(private router: Router) {}
  loginHandler() {
    this.router.navigate(['login']);
  }
  redirect(){
    this.router.navigateByUrl('/dashboard/products');
  }
  
}
