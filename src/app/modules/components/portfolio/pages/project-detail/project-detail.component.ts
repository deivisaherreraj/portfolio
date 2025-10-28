import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { projects } from '../../../../../app-core/data/projects';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ProjectDetailComponent implements OnInit {
  project: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Suscribirse a los cambios en los parámetros de la URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.project = projects.find(p => p.id.toString() === id);
        // Si el proyecto no se encuentra, puedes redirigir a una página de error
        if (!this.project) {
          this.router.navigate(['/not-found']);
        }
      }
    });
  }

}
