import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AdministracionesRoutingModule } from './administraciones-routing.module';
import { AdministracionesComponent } from './administraciones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutComponent } from './about/about.component';
import { EducationComponent } from './education/education.component';
import { SkillsComponent } from './skills/skills.component';
import { OfferedServicesComponent } from './offered-services/offered-services.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ContactComponent } from './contact/contact.component';

const DECLARATIONS_COMPONENT = [
  AdministracionesComponent,  
  AboutComponent,
  EducationComponent,
  SkillsComponent,
  OfferedServicesComponent,
  PortfolioComponent,
  TestimonialComponent,
  ContactComponent
];
const PROVIDER_COMPONENT: never[] = [];

@NgModule({
  declarations: [
    ...DECLARATIONS_COMPONENT
  ],
  imports: [
    AdministracionesRoutingModule,
    SharedModule
  ],
  providers: [
    ...PROVIDER_COMPONENT
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AdministracionesModule { }
