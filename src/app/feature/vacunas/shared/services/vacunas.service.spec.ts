import { environment } from "src/environments/environment";
import { VacunaService } from "./vacunas.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Vacuna } from "../model/vacuna";
import { Respuesta } from "../model/respuesta";
import { HttpService } from "@core/services/http.service";


describe('VacunaService', () => {
    let httpMock: HttpTestingController;
    let service: VacunaService;
    //const apiEndpointProductoConsulta = `${environment.endpoint}/tiposFamilia`;
    const apiEndpointVacunas = `${environment.endpoint}vacunas`;


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
        req.event(new HttpResponse<Respuesta>({body: new Respuesta(1)  }));
      });

});