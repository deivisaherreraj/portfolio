import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, NgZone, computed, signal, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { trigger, transition, style, animate, state, query, stagger } from '@angular/animations';

import { projects } from '@appcore/data/projects';
import { FilterCategory } from '@appcore/type/utils.type';
import { Project } from './models/project.interface';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class PortfolioComponent implements OnInit, AfterViewInit {
  // Referencia al elemento HTML que se va a observar
  @ViewChild('projectsGrid', { static: true }) projectsGrid!: ElementRef;

  // Estado para controlar la visibilidad del contenido
  inView = false;

  filtersInView = false;
  gridInView = false;

  trackByIndex = (i: number) => i;
  trackByProjectId = (_: number, p: { id: number }) => p.id;
  trackByValue = (_: number, v: string) => v;

  // Filtros como en React
  readonly filterCategories: FilterCategory[] = ['All', 'Frontend', 'Backend', 'Fullstack', 'Mobile'];
  readonly activeFilter = signal<FilterCategory>('All');

  // La matriz de proyectos se define como una propiedad de la clase
  readonly projects = signal<Project[]>(projects);

  // Equivalente a filteredProjects de React
  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    const items = this.projects().slice(0, 3);
    if (filter === 'All') return items;
    return items.filter(p => Array.isArray(p.category) ? p.category.includes(filter) : p.category === filter);
  });

  constructor(
    private zone: NgZone, 
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    /** Si quieres que los filtros animen al montar sin depender de la grilla: */
    this.filtersInView = true;
  }

  ngAfterViewInit(): void {
    /** Configura el observer después de renderizar la vista */
    if (!('IntersectionObserver' in window)) {
      // Fallback si no existe soporte
      this.gridInView = true;
      this.cdr.markForCheck();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.zone.run(() => {
            this.gridInView = true;
            this.cdr.markForCheck(); // OnPush: fuerza chequeo
          });
          observer.unobserve(this.projectsGrid.nativeElement);
        }
      },
      {
        /** Dispara apenas asome la grilla (ajusta si quieres) */
        threshold: 0,
        root: null,
        rootMargin: '0px 0px -20% 0px'
      }
    );

    observer.observe(this.projectsGrid.nativeElement);
  }
  
  isActive(cat: FilterCategory) {
    return this.activeFilter() === cat;
  }

  setFilter(cat: FilterCategory) {
    this.activeFilter.set(cat);
  }
}
