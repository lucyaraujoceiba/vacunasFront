import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Respuesta } from '@vacunas/shared/model/respuesta';
import { Usuario } from '@vacunas/shared/model/usuario';
import { Vacuna } from '@vacunas/shared/model/vacuna';
import { VacunasPendientes } from '@vacunas/shared/model/vacunasPendiente';
import { VacunaService } from '@vacunas/shared/services/vacunas.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';


const LONGITUD_MINIMA_PERMITIDA_DOCUMENTO = 5;
const LONGITUD_MAXIMA_PERMITIDA_DOCUMENTO = 15;
const LONGITUD_MINIMA_PERMITIDA_TIPO_SANGRE = 2;
const LONGITUD_MAXIMA_PERMITIDA_TIPO_SANGRE = 3;
const ESTADO_PENDIENTE = 'pendientes';
const ESTADO_APLICADAS = 'aplicadas';
const ESTADO_APLICADA = 'aplicada';
const MENSAJE_VACUNAS = 'La próxima fecha de vacunas es: ';
const MENSAJE_VACUNAS_B = ' y el valor a pagar es de: $';
const CEDULA='CC';
const USUARIO_NO_ENCONTRADO = "Usuario no encontrado";
const VACUNA_REGISTRADA = "Vacuna registrada con exito";
const VACUNA_APLICADA = "Vacuna aplicada con exito";
const USUARIO_REGISTRADO = "Usuario registrado";

@Component({
  selector: 'app-vacunar',
  templateUrl: './vacunar.component.html',
  styleUrls: ['./vacunar.component.css']
})
export class VacunarComponent implements OnInit {

  @ViewChild("templateMensaje") modal: TemplateRef<any>;

  usuarioForm: FormGroup;
  vacunaForm : FormGroup;
  registrarUsuarioForm: FormGroup;
  vacunaActualizarForm :FormGroup;
  mensaje = "";
  resultadoBusqueda = '';//El usuario no tiene vacunas registradas
  modalRef: BsModalRef;
  tipoDoc: string = "";
  documento: string = "";
  idUsuario : number = 0;
  nombreUsuario: string = "";
  mensajealerta : string = "";
 
  mostrar = false;
  public listaVacunasP : Vacuna[];
  public vacunasPendientes:  VacunasPendientes;
  public guardaVacuna: Observable<Respuesta>;
  
  mostrarLista : boolean = false;
  headElements = ['ID', 'Nombre', 'Estado', 'Fecha Aplicación', 'Dosis aplicada','Tiempo entre dosis', 'Valor', 'Subsidiada', ' '];

  constructor(public modalService: BsModalService,
    public vacunaService: VacunaService
    ) { }

  ngOnInit(): void {
    this.tipoDoc = CEDULA;
    this.construirFormularioConsultarUsuario();
  }
  buscar(){
    this.tipoDoc = this.usuarioForm.get("id").value;
    this.documento = this.usuarioForm.get("numeroDocumento").value;
    this.mensaje = "";
    this.idUsuario = 0;
    this.nombreUsuario = '';
    this.buscarusuario();
    if( this.nombreUsuario !== ''){
      if(this.usuarioForm.get(ESTADO_APLICADAS).value){
        this.buscarAplicadas();
      }else{
        this.buscarPendientes();
      }
    }
   
    
  }
  buscarAplicadas(){
    this.vacunaService.consultarVacunasAplicadas(this.tipoDoc,this.documento,ESTADO_APLICADAS).subscribe(
      data => (
        this.listaVacunasP = data, this.idUsuario = this.listaVacunasP[0].idUsuario, this.mostrarLista = true),
        (error => console.log(error))

    );
    
  }
  buscarusuario(){
    this.nombreUsuario = null;
    this.vacunaService.consultarUsuario(this.tipoDoc,this.documento).subscribe(
      data =>(this.validar(data)
        ), (error => (console.log(USUARIO_NO_ENCONTRADO+ error))));
  }
  validar(data: Usuario[]){
    console.log(data);
    if(data.length === 0){
      this.mensajealerta = USUARIO_NO_ENCONTRADO;
      this.modalService.show(this.modal);
    }else{
      this.nombreUsuario = data[0].nombre;
       this.idUsuario = data[0].id;
    }
  }
  buscarPendientes(){
    this.mensaje = "";
    this.vacunaService.consultarVacunasPendeintes(this.tipoDoc,this.documento, ESTADO_PENDIENTE).subscribe(
      data => (this.vacunasPendientes = data, this.listaVacunasP = this.vacunasPendientes.listaVacunas,
        this.idUsuario = this.listaVacunasP[0].idUsuario, this.mostrarLista = true,
        this.mensaje = MENSAJE_VACUNAS +this.vacunasPendientes.listaVacunas[0].fechaAplicacion + MENSAJE_VACUNAS_B + this.vacunasPendientes.valorTotal )
    );
  }

  registrarvacuna(template: TemplateRef<any>){
    this.construirFormularioVacuna();
    this.modalRef = this.modalService.show(template);
  }
  private construirFormularioConsultarUsuario() {
    this.usuarioForm = new FormGroup({
      id: new FormControl(this.tipoDoc, [Validators.required]),
      aplicadas: new FormControl(true, [Validators.required]),
      numeroDocumento: new FormControl(this.documento, [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_DOCUMENTO),
                                                             Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_DOCUMENTO)])
    });
  }
  private construirFormularioVacuna() {
    this.vacunaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      estado: new FormControl(ESTADO_APLICADA, [Validators.required]),
      dosis: new FormControl('', [Validators.required]),
      tiempoEntreDosis: new FormControl('', [Validators.required]),
      subsidiada: new FormControl(true, [Validators.required]),
      valor: new FormControl(0, [Validators.required]),
      dosisPendiente: new FormControl(false, [Validators.required]),
      idUsuario: new  FormControl(this.idUsuario, [Validators.required]),
      
      id: new  FormControl(''),
    });
  }

  private construirFormularioActualizarVacuna(vacuna: Vacuna) {
    this.vacunaActualizarForm = new FormGroup({
      nombre: new FormControl(vacuna.nombre, [Validators.required]),
      estado: new FormControl(vacuna.estado, [Validators.required]),
      dosis: new FormControl(vacuna.dosis, [Validators.required]),
      tiempoEntreDosis: new FormControl(vacuna.tiempoEntreDosis, [Validators.required]),
      subsidiada: new FormControl(vacuna.subsidiada, [Validators.required]),
      valor: new FormControl(vacuna.valor, [Validators.required]),
      dosisPendiente: new FormControl(vacuna.dosisPendiente, [Validators.required]),
      idUsuario: new  FormControl(vacuna.idUsuario, [Validators.required]),
      fechaAplicacion: new FormControl(vacuna.fechaAplicacion),
      id: new  FormControl(vacuna.id),
    });
  }
  private construirFormularioregistrarUsuario() {
    this.registrarUsuarioForm = new FormGroup({
      tipoIdentificacion: new FormControl(CEDULA, [Validators.required]),
      numeroIdentificacion: new FormControl('', [Validators.required,Validators.minLength(LONGITUD_MINIMA_PERMITIDA_DOCUMENTO),
                    Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_DOCUMENTO)]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      tipoSangre: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TIPO_SANGRE),
                                                            Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TIPO_SANGRE)]),
      nombre : new FormControl('', [Validators.required])
    });
  }

  registrarVacuna(){
    this.vacunaService.registrarVacuna(this.vacunaForm.value).subscribe(data =>{
      console.log(data)
    });
    this.modalService.hide();
    this.mensajealerta = VACUNA_REGISTRADA;
    
  }

  aplicarVacuna(vacuna: Vacuna, template: TemplateRef<any>){
    this.construirFormularioActualizarVacuna(vacuna);
    this.modalRef = this.modalService.show(template);
  }

  aplicar(){
    this.modalService.hide();
    this.vacunaService.aplicarVacuna(this.vacunaActualizarForm.value).subscribe(
      data=> (console.log(data),this.buscarPendientes() )
    );
    this.mensajealerta = VACUNA_APLICADA;
  }


  registrarUsuarioshow(template: TemplateRef<any>){
    console.log(template)
    this.construirFormularioregistrarUsuario();
    this.modalRef = this.modalService.show(template);
  }

  registrarUsuario(){
    this.modalService.hide();
    this.nombreUsuario = this.registrarUsuarioForm.get("nombre").value;
    this.tipoDoc = this.registrarUsuarioForm.get("tipoIdentificacion").value;
    this.documento = this.registrarUsuarioForm.get("numeroIdentificacion").value;
    this.usuarioForm.controls["numeroDocumento"].setValue( this.documento);
    this.usuarioForm.controls["id"].setValue( this.tipoDoc);
    this.vacunaService.guardarUsuario(this.registrarUsuarioForm.value).subscribe(
      data => (
      this.idUsuario = data.valor, this.buscarAplicadas())
    );
    this.mensajealerta = USUARIO_REGISTRADO;
  }
}
