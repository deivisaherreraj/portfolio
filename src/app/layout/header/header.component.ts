import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

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
  @Input() theme: 'dark' | 'light' = 'dark';
  // @Output() emite un evento al componente padre cuando el tema cambia
  @Output() themeToggled = new EventEmitter<void>();

  isScrolled = false;
  isMenuOpen = false;

  // Nuevo array de objetos para los enlaces de navegación
  navLinks = [
    { text: 'Inicio', value: 'home' },
    { text: 'Sobre mí', value: 'about' },
    { text: 'Habilidades', value: 'skills' },
    { text: 'Proyectos', value: 'projects' },
    { text: 'Experiencia', value: 'experience' },
    { text: 'Contacto', value: 'contact' }
  ];

  constructor() { }

  ngOnInit(): void { }

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

  // Emite el evento para que el padre cambie el tema
  toggleTheme(): void {
    this.themeToggled.emit();
  }

  // Cierra el menú móvil al hacer clic en un enlace
  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
