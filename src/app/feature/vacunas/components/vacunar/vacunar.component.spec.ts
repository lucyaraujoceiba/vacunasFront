import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { Respuesta } from '@vacunas/shared/model/respuesta';
import { VacunaService } from '@vacunas/shared/services/vacunas.service';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { VacunarComponent } from './vacunar.component';

describe('VacunarComponent', () => {
  let component: VacunarComponent;
  let fixture: ComponentFixture<VacunarComponent>;
  let vacunaService: VacunaService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunarComponent],
      providers: [ BsModalService,
        BsModalRef,VacunaService, HttpService
        
      ],
        imports: [ModalModule.forRoot(),
          CommonModule,
          HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const respuesta = new Respuesta(1);
    fixture = TestBed.createComponent(VacunarComponent);
    component = fixture.componentInstance;
    vacunaService = TestBed.inject(VacunaService);
    spyOn(vacunaService, 'registrarVacuna').and.returnValue(
      of(respuesta)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario de usuario es invalido cuando esta vacio', () => {
    expect(component.usuarioForm.valid).toBeFalsy();
  });

  it('deberia buscar usuario con vacunas aplicadas',() => {
    component.usuarioForm.controls.id.setValue('CC');
    component.usuarioForm.controls.numeroDocumento.setValue('1234');
    expect(component.usuarioForm.valid);
    component.buscar();
  });

  it('deberia buscar usuario con vacunas pendientes',() => {
    component.usuarioForm.controls.id.setValue('CC');
    component.usuarioForm.controls.numeroDocumento.setValue('1234');
    component.usuarioForm.controls.aplicadas.setValue(false);
    expect(component.usuarioForm.valid);
    component.buscar();
  });

  /*it('deberia crear usuario', () => {
    component.
  });*/



});
