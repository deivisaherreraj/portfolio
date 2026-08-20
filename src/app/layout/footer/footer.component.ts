import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  // Almacena el año actual para mostrarlo en el pie de página
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }
  // Método para desplazar la página hacia arriba
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
