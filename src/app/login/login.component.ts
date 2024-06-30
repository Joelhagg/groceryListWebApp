import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  password: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  login() {
    this.http.post('http://localhost:3000/login', { password: this.password }).subscribe({
      next: (res: any) => {
        console.log(res);
        
        if (res.Success) {
          localStorage.setItem('authToken', res.token);
          this.router.navigate(['lists']);
        } else {
          alert('Invalid password');
        }
      },
      error: (err) => {
        alert('Error invalid password');
      }
    });

  } 

}
