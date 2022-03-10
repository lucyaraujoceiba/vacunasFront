import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkVacuna = element(by.xpath('/html/body/app-root/app-navbar/nav/a[2]'));

    async clickBotonVacunas() {
        await this.linkVacuna.click();
    }
}
