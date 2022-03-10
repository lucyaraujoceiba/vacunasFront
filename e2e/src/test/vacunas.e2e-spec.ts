import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { VacunasPage } from '../page/vacunas/vacuna.po';

//const TIPO_DOC = 'CC';
const TIPO_SANGRE = 'O+';
const FECHA_NACIMIENTO = '13-05-1991';
const NOMBRE = 'Lucy Araujo';

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
        const DOCUMENTO = '12345';
      //  const PENDIENTE = 'S';
        page.navigateTo();
        navBar.clickBotonVacunas();

       // vacuna.ingresarTipoDoc(TIPO_DOC);
        vacuna.ingresarDocumento(DOCUMENTO);
       // vacuna.ingresarPendientes(PENDIENTE);
        vacuna.clickBotonBuscarVacunas();
        expect(0).toBe(vacuna.contarvacunas());


      
    });

    it('Deberia crear usuario',( )=> {
        
        const DOCUMENTO = '12346';
        page.navigateTo();
        navBar.clickBotonVacunas();

        vacuna.clickbtnRegistrarUsuario();
       // vacuna.ingresarinputnumDocumentoRegistro(TIPO_DOC);
        vacuna.ingresarinputnumDocumentoRegistro(DOCUMENTO);
        vacuna.ingresarinputtipoSangre(TIPO_SANGRE);
        vacuna.ingresarinputfechanac(FECHA_NACIMIENTO);
        vacuna.ingresarinputnombreusuarioRegistro(NOMBRE);
        vacuna.clickbtnRegistrarUsuarioGuardar();

        expect(vacuna.obtenernombreUsuariosesion()).toEqual('Usuario: Lucy Araujo');

    });

    
    it('Deberia crear vacunas', () => {
        const DOCUMENTO = '12348';
        const NOMBRE_VACUNA = 'influenzxa';
        const DOSIS = 1;
        const TIEMPO_DOSIS = 1;
        //const ESTADO = 'pendiente';
        const VALOR = 1000;
        const SUBSIDIADA= 'S';
        const DOSIS_PENDIENTES= 'S';
       

        page.navigateTo();
        navBar.clickBotonVacunas();

        vacuna.clickbtnRegistrarUsuario();
       // vacuna.ingresarinputnumDocumentoRegistro(TIPO_DOC);
        vacuna.ingresarinputnumDocumentoRegistro(DOCUMENTO);
        vacuna.ingresarinputtipoSangre(TIPO_SANGRE);
        vacuna.ingresarinputfechanac(FECHA_NACIMIENTO);
        vacuna.ingresarinputnombreusuarioRegistro(NOMBRE);
        vacuna.clickbtnRegistrarUsuarioGuardar();

        vacuna.clickbtnRegistrarVacuna();
        vacuna.ingresarinputNombreVacuna(NOMBRE_VACUNA);
        vacuna.ingresarinputdosisvacuna(DOSIS);
        vacuna.ingresarinputValorVacunas(VALOR);
        vacuna.ingresarinputSubsidiada(SUBSIDIADA);
        vacuna.ingresarinputdosisPendientes(DOSIS_PENDIENTES);
        vacuna.ingresarinputTiempoDosis(TIEMPO_DOSIS);

        vacuna.clickbtnGuardarVacuna();
        vacuna.clickBotonBuscarVacunas();
        //expect(4).toBe(vacuna.contarProductos());
        
        expect(1).toBe(vacuna.contarvacunas());

        
    });

    /*it('Deberia aplicar vacuna', () => {
        const DOCUMENTO = '12349';
        const NOMBRE_VACUNA = 'difteria';
        const DOSIS = 1;
        const TIEMPO_DOSIS = 1;
        //const ESTADO = 'pendiente';
        const VALOR = 1000;
        const SUBSIDIADA= 'S';
        const DOSIS_PENDIENTES= 'S';
        //const APLICADAS = false;

        Actions actions = new Actions(driver);

        page.navigateTo();
        navBar.clickBotonVacunas();

        vacuna.clickbtnRegistrarUsuario();
       // vacuna.ingresarinputnumDocumentoRegistro(TIPO_DOC);
        vacuna.ingresarinputnumDocumentoRegistro(DOCUMENTO);
        vacuna.ingresarinputtipoSangre(TIPO_SANGRE);
        vacuna.ingresarinputfechanac(FECHA_NACIMIENTO);
        vacuna.ingresarinputnombreusuarioRegistro(NOMBRE);
        vacuna.clickbtnRegistrarUsuarioGuardar();

        vacuna.clickbtnRegistrarVacuna();
        vacuna.ingresarinputNombreVacuna(NOMBRE_VACUNA);
        vacuna.ingresarinputdosisvacuna(DOSIS);
        vacuna.ingresarinputValorVacunas(VALOR);
        vacuna.ingresarinputestadoVacuna('Pendiente');
        vacuna.ingresarinputSubsidiada(SUBSIDIADA);
        vacuna.ingresarinputdosisPendientes(DOSIS_PENDIENTES);
        vacuna.ingresarinputTiempoDosis(TIEMPO_DOSIS);

        vacuna.clickbtnGuardarVacuna();

        vacuna.ingresarPendientes();
        vacuna.clickBotonBuscarVacunas();
        //expect(4).toBe(vacuna.contarProductos());
        
        vacuna.clickbtnAplicarvacuna();
       // vacuna.ingresarinputEstadoAplicarvacuna('Aplicada');
        //vacuna.clickbtnAplicarVacunaGuardar();
        //vacuna.clickBotonBuscarVacunas();

        //expect(0).toBe(vacuna.contarvacunas());
    });*/
});
