import { Component, OnInit  } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    // Animación para el encabezado
    trigger('fadeInUp', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out')
      ]),
    ]),
    // Animación para el panel de la izquierda (el texto)
    trigger('slideInLeft', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('0.5s 0.2s ease-out')
      ]),
    ]),
    // Animación para el panel de la derecha (los servicios)
    trigger('slideInRight', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('0.5s 0.3s ease-out')
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
