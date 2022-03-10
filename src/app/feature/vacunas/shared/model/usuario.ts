export class Usuario {
    id: number;
    nombre: string;
    tipoSangre: string;
    
    numeroIdentificacion: string;
    tipoIdentificacion: string;
    fechaNacimiento: string;

    constructor(id: number, nombre: string, tipoSangre: string,
        numeroIdentificacion: string,tipoIdentificacion: string,fechaNacimiento: string){

            this.id = id;
            this.nombre = nombre;
            this.tipoSangre = tipoSangre;
            this.numeroIdentificacion = numeroIdentificacion;
            this.tipoIdentificacion = tipoIdentificacion;
            this.fechaNacimiento = fechaNacimiento;
    }

}