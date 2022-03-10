import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacunarComponent } from './components/vacunar/vacunar.component';
import { VacunasRoutingModule } from './vacunas-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { VacunaService } from './shared/services/vacunas.service';



@NgModule({
  declarations: [
    VacunarComponent,
  ],
  imports: [
    CommonModule,
    VacunasRoutingModule,
    SharedModule,
    ModalModule.forRoot()
  ],
  providers: [VacunaService]
})
export class VacunasModule { }
