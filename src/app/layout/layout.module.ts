import { SharedModule } from '../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from '../modules/app/home/home.component';
import { PageErrorComponent } from '../modules/app/page-error/page-error.component';
import { NavLinksComponent } from './nav-links/nav-links.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavLinksComponent,
    HomeComponent,
    PageErrorComponent
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
