import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

import { aboutServices, aboutSkills } from '@appcore/data/about';
import { AboutServices } from './models/about.interface';

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
        animate('1000ms ease-out', style({ opacity: 1 }))
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
  // Referencia al elemento HTML que se va a observar
  @ViewChild('aboutContent', { static: true }) aboutContent!: ElementRef;

  // Estado para controlar la visibilidad del contenido
  inView = false;

  // Array de habilidades para renderizado dinámico
  skills = aboutSkills;

  // Array de datos para las tarjetas de servicios
  services: AboutServices[] = aboutServices;

  constructor() { }

  ngOnInit(): void {
    // Configura IntersectionObserver para detectar cuando el elemento entra en la vista
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.inView = true;
          // Deja de observar una vez que el elemento ha sido visto
          observer.unobserve(this.aboutContent.nativeElement);
        }
      },
      { threshold: 0.1 } // El umbral es el porcentaje de visibilidad
    );
    // Comienza a observar el elemento de contenido
    observer.observe(this.aboutContent.nativeElement);
  }
}
