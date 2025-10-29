import { Component, ChangeDetectionStrategy, Input, computed, signal } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

import { projects } from '@appcore/data/projects';
import { FilterCategory } from '@appcore/type/utils.type';
import { Project } from '../../models/project.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // Entrada del bloque (título/desc y filtros)
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    // Re-render del grid al cambiar filtro (similar a AnimatePresence "wait")
    trigger('gridSwap', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' })),
      ]),
    ]),
    // Aparición escalonada de cards
    trigger('staggerList', [
      transition(':enter', [
        query(
          ':self',
          [style({ opacity: 1 })],
          { optional: true }
        ),
        query(
          '.card-item',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class ProjectComponent {
  /** Si los pasas desde fuera, reemplazan a los default */
  @Input() projects: Project[] = projects;

  trackById = (_: number, p: Project) => p.id;

  readonly filterCategories: FilterCategory[] = ['All', 'Frontend', 'Backend', 'Fullstack', 'Mobile'];
  readonly activeFilter = signal<FilterCategory>('All');

  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') return this.projects;
    return this.projects.filter(p => {
      const cats = Array.isArray(p.category) ? p.category : [p.category];
      return cats.includes(filter);
    });
  });

  setActiveFilter(cat: FilterCategory) {
    this.activeFilter.set(cat);
  }

  isActive(cat: FilterCategory): boolean {
    return this.activeFilter() === cat;
  }  
}
