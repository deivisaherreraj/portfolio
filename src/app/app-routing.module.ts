import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './modules/app/home/home.component';
import { ProjectComponent } from '@appmodules/components/portfolio/pages/project/project.component';
import { ProjectDetailComponent } from './modules/components/portfolio/pages/project-detail/project-detail.component';
import { PageErrorComponent } from '@appmodules/app/page-error/page-error.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
  { path: '**', component: PageErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
