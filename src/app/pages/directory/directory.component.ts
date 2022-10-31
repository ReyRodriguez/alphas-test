import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/interfaces/employee.model';
import { HttpService } from 'src/app/services/http/http.service';
import { FormBuilder, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
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
export class DirectoryComponent implements OnInit {
  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  filterTerm!: string;

  employees: Employee[] = [];

  ngOnInit() {
    Swal.fire({
      toast: true,
      title: 'Bienvenido!',
      text: 'Acceso correcto',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      timer: 2000,
    });
    this.httpService
      .getEmployes()
      .subscribe((employees) => this.orderByLastName(employees));
  }

  orderByLastName(employeesList: Employee[]) {
    this.employees = employeesList.sort(function (a, b) {
      var textA = a.lastname.toUpperCase();
      var textB = b.lastname.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }
}
