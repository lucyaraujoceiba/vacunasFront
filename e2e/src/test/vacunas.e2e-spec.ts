import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { VacunasPage } from '../page/vacunas/vacuna.po';

describe('workspace-project Producto', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let vacuna: VacunasPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        vacuna = new VacunasPage();
    });

    it('Deberia buscar vacunas pendientes', () => {
        const TIPO_DOC = 'CC';
        const DOCUMENTO = '12345';
        const PENDIENTE = 'S';
        page.navigateTo();
        navBar.clickBotonVacunas();

        vacuna.ingresarTipoDoc(TIPO_DOC);
        vacuna.ingresarDocumento(DOCUMENTO);
        vacuna.ingresarPendientes(PENDIENTE);
      
    });

    it('Deberia crear usuario',( )=> {
        const TIPO_DOC = 'CC';
        const DOCUMENTO = '12345';
        const TIPO_SANGRE = 'O+';
        const FECHA_NACIMIENTO = '13-05-1991';
        const NOMBRE = 'Lucy Araujo';
         
        vacuna.clickbtnRegistrarUsuario();

        vacuna.ingresarinputnumDocumentoRegistro(TIPO_DOC);
        vacuna.ingresarinputnumDocumentoRegistro(DOCUMENTO);
        vacuna.ingresarinputtipoSangre(TIPO_SANGRE);
        vacuna.ingresarinputfechanac(FECHA_NACIMIENTO);
        vacuna.ingresarinputnombreusuarioRegistro(NOMBRE);

        vacuna.clickbtnRegistrarUsuarioGuardar();

    });

    
    it('Deberia crear vacunas', () => {
        const NOMBRE = 'tetano';
        const DOSIS = 1;
        const TIEMPO_DOSIS = 1;
        const ESTADO = 'pendiente';
        const VALOR = 1000;
        const SUBSIDIADA= 'S';
        const DOSIS_PENDIENTES= 'S';

        page.navigateTo();
        navBar.clickBotonVacunas;
        vacuna.ingresarinputValorVacunas(VALOR);
        vacuna.ingresarinputdosisPendientes(DOSIS_PENDIENTES);
        vacuna.ingresarinputNombreVacuna(NOMBRE);
        vacuna.ingresarinputTiempoDosis(TIEMPO_DOSIS);
        vacuna.ingresarinputSubsidiada(SUBSIDIADA);
        vacuna.ingresarinputTiempoDosis(DOSIS);
        vacuna.ingresarinputestadoVacuna(ESTADO);

        vacuna.clickbtnGuardarVacuna();
        //expect(4).toBe(vacuna.contarProductos());
    });
});
