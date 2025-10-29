import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // Contenedor principal: emula initial {opacity:0, y:20} → animate {opacity:1, y:0} (0.8s)
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),

    // Bloque del código de error: emula scale 0.8 → 1 con delay 0.2s y 0.5s de duración
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('500ms 200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),

    // Título: delay 0.4s, duración 0.5s
    trigger('fadeInTitle', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 400ms ease-out', style({ opacity: 1 })),
      ]),
    ]),

    // Mensaje: delay 0.6s, duración 0.5s
    trigger('fadeInMsg', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 600ms ease-out', style({ opacity: 1 })),
      ]),
    ]),

    // Botones: delay 0.8s, duración 0.5s
    trigger('fadeInActions', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 800ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class PageErrorComponent {
  /** Código de error mostrado en grande (por defecto "404"). */
  @Input() errorCode = '404';

  /** Título del error. */
  @Input() title = 'Página No Encontrada';

  /** Mensaje descriptivo del error. */
  @Input() message = 'Lo sentimos, la página que buscas no existe o ha sido movida.';

  /** Mostrar botón de volver (history.back). */
  @Input() showBackButton = true;

  constructor(
    private router: Router, 
    private location: Location
  ) {}

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  goBack(): void {
    this.location.back();
  }
}
