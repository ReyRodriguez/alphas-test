import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 400ms ease-in'),
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  state = 'none';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  /**
   * @description Activa la animacion inicial
   */
  ngOnInit(): void {
    this.state = ':enter';
  }

  /**
   * @description Sends data to api and redirect depending on status response
   * store a variable on local storage to simple guard directory page
   */
  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.httpService.logInUser({ email, password }).subscribe((res) => {
      let user = res.find(
        (employee: { email: string | null | undefined }) =>
          employee.email == email
      );

      if (!user) {
        Swal.fire({
          title: 'Error!',
          text: 'Usuario no registrado',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return;
      } else {
        if (user.password == password) {
          localStorage.setItem('usuario', JSON.stringify(user));
          this.router.navigate(['app/directory']);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Contraseña incorrecta',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          return;
        }
      }
    });
  }
}
