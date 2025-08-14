import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

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

  constructor(
    readonly translate: TranslateService,
    readonly titleService: Title
  ) {
    this.translate.setDefaultLang('es');
    this.translate.get('TextosAplicacion.PageTitle').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }

  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
