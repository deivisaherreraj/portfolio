import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionesComponent } from './administraciones.component';

const AdministracionesRoutes: Routes = [
  {
    path: '',
    component: AdministracionesComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(AdministracionesRoutes)],
  exports: [RouterModule],
})
export class AdministracionesRoutingModule {}
