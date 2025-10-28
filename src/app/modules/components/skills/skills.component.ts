import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

/** Tipos y datos base */
type CategoryId = 'Frontend' | 'Backend' | 'Databases' | 'Devops' | 'Methodologies' | 'Others';

interface Category {
  id: CategoryId;
  iconClass: string;     // Usamos Bootstrap Icons por simplicidad
  colorKey: keyof typeof colorClasses;
  skills: string[];
}

/** Colores seguros para Tailwind (clases explícitas) */
const colorClasses = {
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
  green: { bg: 'bg-green-500/20', text: 'text-green-400' },
  orange: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
  pink: { bg: 'bg-pink-500/20', text: 'text-pink-400' },
  cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
} as const;

const skillsData = {
  frontend: [
    'React', 'TypeScript', 'JavaScript', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Material UI',
  ],
  backend: [
    'Node.js', 'Express', 'GraphQL', 'REST APIs', 'Python', 'Java', 'PHP', 'Microservices',
  ],
  databases: [
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'DynamoDB',
  ],
  devops: [
    'Docker', 'AWS', 'CI/CD', 'Jenkins', 'Kubernetes', 'Git', 'Linux',
  ],
  methodologies: [
    'Agile', 'Scrum', 'TDD', 'Code Review', 'Pair Programming',
  ],
  others: [
    'Figma', 'Jira', 'Slack', 'VS Code', 'Postman', 'Analytics',
  ],
};

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
  readonly categories: Category[] = [
    { id: 'Frontend', iconClass: 'bi bi-code-slash', colorKey: 'blue', skills: skillsData.frontend },
    { id: 'Backend', iconClass: 'bi bi-hdd-network', colorKey: 'purple', skills: skillsData.backend },
    { id: 'Databases', iconClass: 'bi bi-database', colorKey: 'green', skills: skillsData.databases },
    { id: 'Devops', iconClass: 'bi bi-cloud', colorKey: 'orange', skills: skillsData.devops },
    { id: 'Methodologies', iconClass: 'bi bi-git', colorKey: 'pink', skills: skillsData.methodologies },
    { id: 'Others', iconClass: 'bi bi-wrench', colorKey: 'cyan', skills: skillsData.others },
  ];

  /** Estado por tarjeta para activar la animación una sola vez al entrar al viewport */
  readonly inViewStates = signal<Record<CategoryId, boolean>>({
    Frontend: false, Backend: false, Databases: false,
    Devops: false, Methodologies: false, Others: false,
  });

  /** Clases de color (bg + text) seguras para Tailwind */
  colorClass(key: keyof typeof colorClasses) {
    const c = colorClasses[key];
    return `${c.bg} ${c.text}`;
  }

  /** Callback de IntersectionObserver (desde la directiva) */
  markInView(id: CategoryId) {
    const current = this.inViewStates();
    if (!current[id]) {
      this.inViewStates.update(s => ({ ...s, [id]: true }));
    }
  }
}
