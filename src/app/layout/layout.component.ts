import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0
        })
      ),
      transition('void <=> *', animate(2000))
    ]),
  ]
})
export class LayoutComponent implements OnInit {

  state = 'none';
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.state = '*';
  }

}
