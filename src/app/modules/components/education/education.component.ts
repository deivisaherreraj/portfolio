import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state, query, stagger } from '@angular/animations';

import { experiences } from '@appcore/data/education';
import { Experience } from './models/education.interface';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  animations: [
    // Define la animación de opacidad y transformación para el efecto de entrada
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('1000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    // Animación del encabezado para que se deslice hacia arriba
    trigger('fadeInUp', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out')
      ]),
    ]),
    // Animación escalonada para los elementos de la lista de experiencias
    trigger('listStagger', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class EducationComponent implements OnInit {
  // Referencia al elemento HTML que se va a observar
  @ViewChild('experienceGrid', { static: true }) experienceGrid!: ElementRef;

  // Estado para controlar la visibilidad del contenido
  inView = false;

  // La matriz de datos se define como una propiedad de la clase
  experiences: Experience[] = experiences;

  constructor() { }

  ngOnInit(): void {
    // Configura IntersectionObserver para detectar cuando el elemento entra en la vista
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.inView = true;
          // Deja de observar una vez que el elemento ha sido visto
          observer.unobserve(this.experienceGrid.nativeElement);
        }
      },
      { threshold: 0.1 } // El umbral es el porcentaje de visibilidad
    );
    // Comienza a observar el elemento de la cuadrícula de experiencia
    observer.observe(this.experienceGrid.nativeElement);
  }
}
