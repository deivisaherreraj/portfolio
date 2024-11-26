import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';
import ScrollReveal from 'scrollreveal';

// core version + navigation, pagination modules:
import Swiper from 'swiper';

@Component({
  selector: 'app-modulo-administraciones',
  templateUrl: './administraciones.component.html',
})
export class AdministracionesComponent implements OnInit {

  ngOnInit() {
    /* toggle icon navbar */
    const menuIcon: HTMLElement = document.querySelector('#menu-icon') as HTMLElement;
    const navbar: HTMLElement = document.querySelector('.navbar') as HTMLElement;

    menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    }

    /* toggle icon Moon and Sun */
    const toggleIcon: HTMLElement = document.querySelector('#toggle-icon') as HTMLElement;

    toggleIcon.addEventListener('click', () => {
      toggleIcon.classList.toggle('bx-sun');
      document.body.classList.toggle('dark-mode');
    });

    /* scroll sections active link */
    const sections: NodeListOf<HTMLElement> = document.querySelectorAll('section') as NodeListOf<HTMLElement>;
    const navLinks: NodeListOf<HTMLElement> = document.querySelectorAll('header nav a') as NodeListOf<HTMLElement>;

    window.onscroll = () => {
      sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
          navLinks.forEach(links => {
            links.classList.remove('active');
            document.querySelector('header nav a[href*=' + id + ']')?.classList.add('active');
          });
        }
      });

      /* sticky navbar */
      const header: HTMLElement = document.querySelector('.header') as HTMLElement;
      header.classList.toggle('sticky', window.scrollY > 100);

      /* remove toggle icon and navbar when click navbar link (scroll) */
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    }

    /* scroll reveal */
    ScrollReveal({
      // reset: true,
      distance: '80px',
      duration: 2000,
      delay: 200
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img img, .services.container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img img, .skills-row', { origin: 'left' });
    ScrollReveal().reveal('.home-content h3, .about-content, .education-row', { origin: 'right' });

    /* Typed text */
    const options = {
      strings: ['Ingeniero de Sistemas', 'Desarrollador Full-Stack', 'Creador de Aplicaciones', 'Freelance'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      showCursor: true,
      cursorChar: '|',
      loop: true
    };
    const typed = new Typed('.multiple-text', options);
    const typedAbout = new Typed('.multiple-text-about', options);

    /* Initialize Swiper */
    const swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 50,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}
