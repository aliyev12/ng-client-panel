import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.register(this.email, this.password)
      .then(res => {
        this.flashMessages.show('You are now registered and logged in', {
          cssClass: 'alert-success', timeout: 4000
        });
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.flashMessages.show(err.message, {
          cssClass: 'alert-success', timeout: 4000
        });
      });
  }

  onSubmit() {
    this.authService.register(this.email, this.password)
      .then(res => {
        this.flashMessages.show('You are now logged in', {
          cssClass: 'alert-success', timeout: 4000
        });
        this.router.navigate(['/']);
      })  /* END OF THEN */
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
        this.flashMessages.show('User was not found. Please, make sure you\'ve types the right username and/or password', {
          cssClass: 'alert-danger', timeout: 4000
        });
        } else {
          this.flashMessages.show(err, {
            cssClass: 'alert-danger', timeout: 4000
          });
        }
      }); /* END OF CATCH */
  }

}
