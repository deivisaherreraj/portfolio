import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

import { Language, Theme } from '@appcore/type/utils.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(100%)' })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('0.3s ease-in', style({ opacity: 0, transform: 'translateX(-100%)' }))
          ], { optional: true }),
          query(':enter', [
            animate('0.3s ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent {
  theme: Theme = 'dark';

  constructor(
    readonly translate: TranslateService,
    readonly titleService: Title
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    this.translate.use((localStorage.getItem('lang') as Language) || 'es');
    this.translate.get('TextosAplicacion.PageTitle').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });

    // Carga el tema guardado en localStorage al iniciar la aplicación
    const savedTheme = localStorage.getItem('theme') as Theme || 'dark';
    this.theme = savedTheme;
    
    // Aplica la clase 'dark' al elemento <html>    
    document.documentElement.classList.toggle('dark', this.theme === 'dark');
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);
    document.documentElement.classList.toggle('dark', this.theme === 'dark');
  }

  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
