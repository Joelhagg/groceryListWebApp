import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BrowserModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  password: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  login() {
    this.http.post('http://localhost:3000/login', { password: this.password }).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('authToken', res.token);
        this.router.navigate(['lists']);
      } else {
        alert('Invalid password');
      }
    },
    (err) => {
      alert('Invalid password');
    });

  } 

}
