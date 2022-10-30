import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryRoutingModule } from './directory-routing.module';
import { DirectoryComponent } from './directory.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DirectoryComponent,
  ],
  imports: [
    CommonModule,
    DirectoryRoutingModule,
    ReactiveFormsModule,
  ]
})
export class DirectoryModule { }
