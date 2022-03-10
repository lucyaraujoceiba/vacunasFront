import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacunarComponent } from './components/vacunar/vacunar.component';


const routes: Routes = [
  {
    path: '',
    component: VacunarComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacunasRoutingModule { }
