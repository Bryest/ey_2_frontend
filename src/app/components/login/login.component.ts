import { Component } from '@angular/core';
import { SupplierService, UserLogin } from '../../supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: UserLogin = { username: '', password: '' }

  constructor(private authService: SupplierService, private router: Router) { }

  login() {
    const user: UserLogin = { username: this.user.username, password: this.user.password };
    this.authService.login(user).subscribe({

      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        alert('User or password incorrect');
      }
    });
  }
}
