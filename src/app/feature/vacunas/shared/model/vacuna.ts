export class Vacuna {
    id: number;
    nombre: string;
    estado: string;
    fechaAplicacion: String;
    subsidiada: string;
    valor: number;
    dosis: number;
    idUsuario: number;
    dosisPendiente: string;
    tiempoEntreDosis: number;

    constructor(id: number, nombre: string,estado: string,fechaAplicacion: String,subsidiada: string,valor: number,
        dosis: number,idUsuario: number,dosisPendiente: string,tiempoEntreDosis: number ) {
        
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.fechaAplicacion = fechaAplicacion;
        this.subsidiada = subsidiada;
        this.valor = valor;
        this.dosis = dosis;
        this.idUsuario = idUsuario;
        this.dosisPendiente = dosisPendiente;
        this.tiempoEntreDosis = tiempoEntreDosis;
    }
}