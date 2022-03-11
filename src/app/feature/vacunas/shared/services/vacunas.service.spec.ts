import { environment } from "src/environments/environment";
import { VacunaService } from "./vacunas.service";
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Vacuna } from "../model/vacuna";
import { Respuesta } from "../model/respuesta";
import { HttpService } from "@core/services/http.service";
import { Usuario } from "../model/usuario";


describe('VacunaService', () => {
    let httpMock: HttpTestingController;
    let service: VacunaService;
    const apiEndpointVacunas = `${environment.endpoint}vacunas`;
    const apiEndpointusuarios = `${environment.endpoint}usuarios/`;

    beforeEach(() => {
        const injector = TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [VacunaService,HttpClient,HttpService]
        });
        httpMock = injector.inject(HttpTestingController);
        service = TestBed.inject(VacunaService);
      });
    
      it('should be created', () => {
        const productService: VacunaService = TestBed.inject(VacunaService);
        expect(productService).toBeTruthy();
      });

      it('deberia crear un vacuna', () => {
        const dummyRespuesta = new Respuesta(1);
        const dummyVacuna = new Vacuna(1,'tet','aplicada','2022-03-01','s',1000,1,1,'s',1);
        service.registrarVacuna(dummyVacuna).subscribe((respuesta) => {
          expect(respuesta).toEqual(dummyRespuesta);
        });
        const req = httpMock.expectOne(apiEndpointVacunas);
        expect(req.request.method).toBe('POST');
     
      });

      it('deberia crear un usuario', () => {
        const dummyRespuesta = new Respuesta(1);
        const dummyUsuario = new Usuario(1,'Lucy','o+','12345','CC','13-05-1991');
        service.guardarUsuario(dummyUsuario).subscribe((respuesta) => {
          expect(respuesta).toEqual(dummyRespuesta);
        });
        const req = httpMock.expectOne(apiEndpointusuarios);
        expect(req.request.method).toBe('POST');
    
      });

});