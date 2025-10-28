import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

type Theme = 'dark' | 'light';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ opacity: 0, transform: 'translateY(-20px)' })),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Input() recibe datos del componente padre
  @Input() theme: Theme = 'dark';
  // @Output() emite un evento al componente padre cuando el tema cambia
  @Output() themeToggled = new EventEmitter<void>();

  isScrolled = false;
  isMenuOpen = false;  
  isDark = true;

  /** Idioma actual */
  language: 'es' | 'en' = 'es';

  /** Enlaces (ahora con keys de i18n para usar {{ key | translate }}) */
  navLinks = [
    { key: 'Home', value: 'home' },
    { key: 'About', value: 'about' },
    { key: 'Projects', value: 'projects' },
    { key: 'Experience', value: 'experience' },
    { key: 'Contact', value: 'contact' }
  ];

  constructor(
    readonly translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    // Sincroniza estado inicial desde @Input() y/o localStorage
    const savedTheme = (localStorage.getItem('theme') as Theme) || this.theme;
    this.setTheme(savedTheme);

    const savedLang = (localStorage.getItem('lang') as 'es' | 'en') || (this.translate.currentLang as 'es' | 'en') || 'es';
    this.useLanguage(savedLang);
  }

  ngOnDestroy(): void { }

  // Escucha el evento 'scroll' en la ventana
  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  // Alterna el estado del menú
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Cierra el menú móvil al hacer clic en un enlace
  closeMenu(): void {
    this.isMenuOpen = false;
  }

  // Emite el evento para que el padre cambie el tema
  toggleTheme(): void {
    const next: Theme = this.isDark ? 'light' : 'dark';
    this.setTheme(next);
    this.themeToggled.emit();
  }

  setTheme(t: Theme) {
    this.theme = t;
    this.isDark = t === 'dark';

    const root = this.document.documentElement.classList;
    if (this.isDark) {
      root.add('dark');
    } else {
      root.remove('dark');
    }
    localStorage.setItem('theme', t);
  }

  toggleLanguage(): void {
    const next = this.language === 'es' ? 'en' : 'es';
    this.useLanguage(next);
  }

  useLanguage(language: 'es' | 'en') {
    this.language = language;
    this.translate.use(language);
    localStorage.setItem('lang', language);
  }
}
