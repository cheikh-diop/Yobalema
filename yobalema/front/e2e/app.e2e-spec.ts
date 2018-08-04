import { AppPage } from './app.po';
import { Login } from './auth.po';
import { CreateAdvert } from './createadvert.po';

describe('findmyject App', () => {
  let page: AppPage;
  let auth: Login;
  let create_advert: CreateAdvert;

  beforeEach(() => {
    page = new AppPage();
    auth = new Login();
    create_advert = new CreateAdvert();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });

  it('Scénario d`authentification avec succès', () => {
    auth.navigateTo();
    auth.checkauth();
  })

  it('Scénario ajout une annonce ', () => {
    create_advert.navigateTo();
    create_advert.addadvert();
});

});
