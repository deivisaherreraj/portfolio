import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state, query, stagger } from '@angular/animations';

// Definimos una interfaz para el objeto Project para asegurar la tipado
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubLink?: string;
  liveLink?: string;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [
    // Define la animación de opacidad y transformación para el efecto de entrada
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('1000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    // Animación para el encabezado de la sección
    trigger('fadeInUp', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('1000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
    ]),
    // Animación escalonada para los proyectos
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
export class PortfolioComponent implements OnInit {
  // Referencia al elemento HTML que se va a observar
  @ViewChild('projectsGrid', { static: true }) projectsGrid!: ElementRef;

  // Estado para controlar la visibilidad del contenido
  inView = false;

  // La matriz de proyectos se define como una propiedad de la clase
  projects: Project[] = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Un sitio de comercio electrónico con todas las funciones, gestión de productos, autenticación de usuarios y un carrito de compras.',
      image: 'https://placehold.co/600x400/0F172A/E2E8F0?text=Proyecto+1',
      tags: ['Angular', 'Node.js', 'Express', 'MongoDB'],
      githubLink: 'https://github.com/example/ecommerce-app',
      liveLink: 'https://example.com/ecommerce-app',
    },
    {
      id: 2,
      title: 'Real-time Chat App',
      description: 'Una aplicación de chat moderna y en tiempo real con chats grupales, mensajería privada y presencia de usuarios.',
      image: 'https://placehold.co/600x400/0F172A/E2E8F0?text=Proyecto+2',
      tags: ['Angular', 'RxJS', 'Firebase', 'WebSockets'],
      githubLink: 'https://github.com/example/chat-app',
      liveLink: 'https://example.com/chat-app',
    },
    {
      id: 3,
      title: 'Task Management Tool',
      description: 'Una herramienta intuitiva para gestionar tareas personales y de equipo, con funcionalidad de arrastrar y soltar y tableros personalizados.',
      image: 'https://placehold.co/600x400/0F172A/E2E8F0?text=Proyecto+3',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'D3.js'],
      githubLink: 'https://github.com/example/task-manager',
      liveLink: 'https://example.com/task-manager',
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
          observer.unobserve(this.projectsGrid.nativeElement);
        }
      },
      { threshold: 0.1 } // El umbral es el porcentaje de visibilidad
    );
    // Comienza a observar el elemento de la cuadrícula de proyectos
    observer.observe(this.projectsGrid.nativeElement);
  }
}
