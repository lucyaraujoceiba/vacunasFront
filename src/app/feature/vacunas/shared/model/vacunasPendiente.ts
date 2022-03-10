import { Vacuna } from "./vacuna";

export class VacunasPendientes {
    listaVacunas: Vacuna[];
    valorTotal: number;

    
    constructor(listaVacuna: Vacuna[], valor: number){
        this.listaVacunas = listaVacuna;
        this.valorTotal = valor;
    }

    public  getListaVacunas(){
        return this.listaVacunas;
    }
}
