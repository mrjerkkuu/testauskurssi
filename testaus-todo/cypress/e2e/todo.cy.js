/// <reference types="Cypress" />

describe('ToDo Sovellus - CRUD E2E Testit', () => {
  // Ajetaan ennen jokaista testiä
  beforeEach(() => {
    // 1. Tyhjennetään localStorage, jotta vanhat tehtävät eivät häiritse
    cy.clearLocalStorage();

    // 2. Mennään sovelluksen sivulle
    cy.visit('http://localhost:5173');
  });

  // 1. TEHTÄVÄN LUONTI
  it('Käyttäjä voi luoda uuden tehtävän', () => {
    const otsikko = 'Osta maitoa';
    const kuvaus = 'Rasvatonta maitoa kaupasta';

    // Täytetään lomake
    cy.get('#topic').type(otsikko);
    cy.get('#description').type(kuvaus);

    // Valitaan prioriteetti (High)
    cy.get('#priority').select('High');

    // Tallennetaan
    cy.get('#save-btn').click();

    // TARKISTUS:
    // Tarkistetaan, että listaelementti (#task-list) sisältää äsken luodun otsikon
    cy.get('#task-list').should('contain', otsikko);
    cy.get('#task-list').should('contain', kuvaus);

    // Tarkistetaan, että lomake tyhjeni
    cy.get('#topic').should('have.value', '');
  });

  // 2. TEHTÄVIEN LISTAUS
  it('Sovellus listaa kaikki luodut tehtävät', () => {
    // Luodaan nopeasti 2 tehtävää peräkkäin
    cy.get('#topic').type('Tehtävä 1');
    cy.get('#save-btn').click();

    cy.get('#topic').type('Tehtävä 2');
    cy.get('#save-btn').click();

    // TARKISTUS:
    // Lasketaan montako .task -luokan elementtiä listassa on
    cy.get('.task').should('have.length', 2);

    // Varmistetaan, että molemmat näkyvät
    cy.contains('Tehtävä 1').should('be.visible');
    cy.contains('Tehtävä 2').should('be.visible');
  });

  // 3. TEHTÄVÄN PÄIVITYS
  it('Käyttäjä voi muokata olemassa olevaa tehtävää', () => {
    // Luodaan ensin muokattava tehtävä
    cy.get('#topic').type('Vanha otsikko');
    cy.get('#save-btn').click();

    // Etsitään "Edit" -nappi ja klikataan sitä.
    cy.get('button[data-action="edit"]').click();

    // Varmistetaan, että tiedot palasivat lomakkeeseen
    cy.get('#topic').should('have.value', 'Vanha otsikko');

    // Muutetaan otsikkoa
    cy.get('#topic').clear().type('Päivitetty otsikko');

    // Klikataan tallennusta (napin teksti muuttuu edit-tilassa "Update Task":ksi koodissasi)
    cy.contains('button', 'Update Task').click();

    // TARKISTUS:
    // Varmistetaan, että uusi otsikko on listassa
    cy.get('#task-list').should('contain', 'Päivitetty otsikko');
    // Varmistetaan, ettei vanhaa otsikkoa enää ole
    cy.get('#task-list').should('not.contain', 'Vanha otsikko');
  });

  // 4. TEHTÄVÄN POISTAMINEN
  it('Käyttäjä voi poistaa tehtävän', () => {
    // Luodaan poistettava tehtävä
    cy.get('#topic').type('Poistettava tehtävä');
    cy.get('#save-btn').click();

    // Varmistetaan ensin, että se on olemassa
    cy.contains('Poistettava tehtävä').should('be.visible');

    // Klikataan "Delete" -nappia.
    cy.get('button[data-action="delete"]').click();

    // TARKISTUS:
    // Varmistetaan, että elementti on poistunut DOM:sta
    cy.contains('Poistettava tehtävä').should('not.exist');

    // Tarkistetaan, että "empty-state" (tyhjä tila) on taas näkyvissä, jos lista on tyhjä
    cy.get('#empty-state').should('be.visible');
  });
});

//tässäkin tehtävässä käytin tekoälyä auttamaan minua luomaan testejä, ja testien oikeellisuuden tarkitstuksessa
//sekä muokkaamisessa.
