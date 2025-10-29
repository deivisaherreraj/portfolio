import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

import { skills } from '@appcore/data/skills';
import { SkillsCategory } from '@appcore/type/utils.type';
import { Skills } from './models/skills.interface';
import { SkillsColorClasses } from './models/skills.const';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeUp', [
      state('out', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('out => in', animate('500ms ease-out')),
    ]),
  ],
})
export class SkillsComponent {
  /** Grilla de categorías con iconos Bootstrap (puedes cambiar a lucide-angular cuando quieras) */
  readonly categories: Skills[] = skills;

  /** Estado por tarjeta para activar la animación una sola vez al entrar al viewport */
  readonly inViewStates = signal<Record<SkillsCategory, boolean>>({
    Frontend: false,
    Backend: false,
    Databases: false,
    Devops: false,
    Methodologies: false,
    Others: false,
  });

  /** Clases de color (bg + text) seguras para Tailwind */
  colorClass(key: keyof typeof SkillsColorClasses) {
    const c = SkillsColorClasses[key];
    return `${c.bg} ${c.text}`;
  }

  /** Callback de IntersectionObserver (desde la directiva) */
  markInView(id: SkillsCategory) {
    const current = this.inViewStates();
    if (!current[id]) {
      this.inViewStates.update((s) => ({ ...s, [id]: true }));
    }
  }
}
