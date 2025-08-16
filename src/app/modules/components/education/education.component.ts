import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state, query, stagger } from '@angular/animations';

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

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
  experiences: Experience[] = [
    {
      id: 1,
      role: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      period: '2020 - Present',
      description: 'Lideré el desarrollo de la plataforma SaaS empresarial, gestionando un equipo de 6 ingenieros. Implementé una arquitectura de microservicios que mejoró la confiabilidad del sistema en un 40 % y redujo el tiempo de implementación en un 60 %.',
      technologies: ['React', 'Node.js', 'GraphQL', 'AWS'],
    },
    {
      id: 2,
      role: 'Full Stack Developer',
      company: 'Digital Solutions Group',
      period: '2017 - 2020',
      description: 'Desarrollé aplicaciones web responsivas para clientes en los sectores financiero y de salud. Creé un sistema de gestión de pacientes que optimizó las operaciones de 12 instalaciones médicas.',
      technologies: ['JavaScript', 'React', 'Express', 'MongoDB'],
    },
    {
      id: 3,
      role: 'Frontend Developer',
      company: 'Creative Web Agency',
      period: '2015 - 2017',
      description: 'Diseñé e implementé interfaces de usuario para sitios web de comercio electrónico y marketing. Colaboré con diseñadores de UX para crear experiencias web intuitivas y accesibles.',
      technologies: ['HTML/CSS', 'JavaScript', 'jQuery', 'Sass'],
    },
  ];

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
