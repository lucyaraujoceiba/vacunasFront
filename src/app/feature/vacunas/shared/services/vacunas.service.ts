import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';
import { Vacuna } from '../model/vacuna';
import { HttpClient } from '@angular/common/http';
import { VacunasPendientes } from '../model/vacunasPendiente';
import { Respuesta } from '../model/respuesta';
import { HttpService } from '@core/services/http.service';


@Injectable()
export class VacunaService {
  constructor(
    protected httpa: HttpClient, protected http: HttpService) {}

  public consultarVacunasAplicadas(tipoDoc: string, documento: string, estado: string) {
    return this.httpa.get<Vacuna[]>(`${environment.endpoint}vacunas/${estado}/${tipoDoc}/${documento}`);
  }

  public consultarVacunasPendeintes(tipoDoc: string, documento: string, estado: string) {
    return this.httpa.get<VacunasPendientes>(`${environment.endpoint}vacunas/${estado}/${tipoDoc}/${documento}`);
  }
  /**
   * Registra una vacuna
   * @param vacuna 
   * @returns 
   */
  public registrarVacuna(vacuna: Vacuna) {
    if(vacuna.dosisPendiente){
      vacuna.dosisPendiente = 'S';
    }else{
      vacuna.dosisPendiente = 'N';
    }
    if(vacuna.subsidiada){
      vacuna.subsidiada = 'S'
    }else{
      vacuna.subsidiada = 'N'
    }
    console.log(vacuna);
    console.log(environment.endpoint);
    
    return this.http.doPost<Vacuna, Respuesta>(`${environment.endpoint}vacunas`, vacuna, this.http.optsName('crear vacunas'));
    return this.httpa.post< Respuesta>(`${environment.endpoint}vacunas`, vacuna);
   
  }

  /**
   * Actualiza el estado de la vacuna
   * @param vacuna 
   * @returns 
   */
  public aplicarVacuna(vacuna: Vacuna){
    return this.httpa.put<boolean>(`${environment.endpoint}vacunas/${vacuna.id}`, vacuna);
  }
  public guardarUsuario(usuario: Usuario){
    console.log(`${environment.endpoint}usuarios/`);
    return this.httpa.post<Respuesta>(`${environment.endpoint}usuarios/`,usuario)
  }

  public consultarUsuario(tipoDoc: string, documento: string){
    return this.httpa.get<Usuario>(`${environment.endpoint}usuarios/${tipoDoc}/${documento}`);
  }
}
