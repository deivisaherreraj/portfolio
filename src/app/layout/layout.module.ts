import { SharedModule } from '../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from '../modules/app/home/home.component';
import { PageErrorComponent } from '../modules/app/page-error/page-error.component';
import { NavLinksComponent } from './nav-links/nav-links.component';
import { EducationComponent } from '../modules/components/education/education.component';
import { AboutComponent } from '../modules/components/about/about.component';
import { ContactComponent } from '../modules/components/contact/contact.component';
import { OfferedServicesComponent } from '../modules/components/offered-services/offered-services.component';
import { PortfolioComponent } from '../modules/components/portfolio/portfolio.component';
import { SkillsComponent } from '../modules/components/skills/skills.component';
import { TestimonialComponent } from '../modules/components/testimonial/testimonial.component';
import { ProjectDetailComponent } from '../modules/components/portfolio/pages/project-detail/project-detail.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavLinksComponent,
    HomeComponent,
    PageErrorComponent,
    AboutComponent,
    EducationComponent,
    SkillsComponent,
    OfferedServicesComponent,
    PortfolioComponent,
    ProjectDetailComponent,
    TestimonialComponent,
    ContactComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavLinksComponent
  ],
  imports: [SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }
