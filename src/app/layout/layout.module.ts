import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from '../modules/app/home/home.component';
import { PageErrorComponent } from '../modules/app/page-error/page-error.component';
import { EducationComponent } from '../modules/components/education/education.component';
import { AboutComponent } from '../modules/components/about/about.component';
import { ContactComponent } from '../modules/components/contact/contact.component';
import { PortfolioComponent } from '../modules/components/portfolio/portfolio.component';
import { SkillsComponent } from '../modules/components/skills/skills.component';
import { ProjectDetailComponent } from '../modules/components/portfolio/pages/project-detail/project-detail.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageErrorComponent,
    AboutComponent,
    EducationComponent,
    SkillsComponent,
    PortfolioComponent,
    ProjectDetailComponent,
    ContactComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }
