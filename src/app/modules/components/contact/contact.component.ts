import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { Contact } from './models/contact.interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    // Animación para el encabezado
    trigger('fadeInUp', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out')
      ]),
    ]),
    // Animación para el panel de la izquierda (información de contacto)
    trigger('slideInLeft', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.5s 0.1s ease-out')
      ]),
    ]),
    // Animación para el panel de la derecha (formulario)
    trigger('slideInRight', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('0.5s 0.2s ease-out')
      ]),
    ]),
  ],
})
export class ContactComponent implements OnInit {
  // Referencia al elemento HTML que se va a observar
  @ViewChild('contactSection', { static: true }) contactSection!: ElementRef;

  // Estado para controlar la visibilidad del contenido
  inView = false;

  // Propiedad de la clase para manejar el estado del formulario
  formData: Contact = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Estado de envío
  isSubmitting = false;
  submitMessage = '';

  constructor(
    readonly translate: TranslateService
  ) { }

  ngOnInit(): void {
    // Implementa IntersectionObserver para la animación de entrada
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.inView = true;
          observer.unobserve(this.contactSection.nativeElement);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(this.contactSection.nativeElement);
  }

  // Método que maneja el envío del formulario
  handleSubmit(form: NgForm): void {
    this.isSubmitting = true;
    this.submitMessage = '';

    // Simula el envío del formulario con un temporizador
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitMessage = this.translate.instant('Contact.SuccessMessage');

      // Reinicia el formulario
      form.resetForm();
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };

      // Borra el mensaje después de 5 segundos
      setTimeout(() => {
        this.submitMessage = '';
      }, 5000);
    }, 1500);
  }
}
