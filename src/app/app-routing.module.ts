import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/app/home/home.component';
import { ProjectDetailComponent } from './modules/components/portfolio/pages/project-detail/project-detail.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'project/:id', component: ProjectDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
