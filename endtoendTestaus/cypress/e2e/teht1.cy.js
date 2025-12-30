/// <reference types="Cypress" />

describe('Wikipedia Jamk Testi', () => {
  it('Suorittaa tehtävänannon mukaiset vaiheet', () => {
    // --- ALKUASETUKSET JA VIRHEIDEN ESTO ---

    // Estetään testiä kaatumasta Wikipedian omiin JavaScript-virheisiin (ratkaisu "Element attr..." -virheeseen)
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    // Asetetaan näytön koko isoksi, jotta hakukenttä ja valikot toimivat kuten työpöytäversiossa
    cy.viewport(1280, 720);

    // Tehtävä 1: Menee suomenkieliselle wikipedia pääsivulle.
    cy.visit('https://fi.wikipedia.org/');

    // Tehtävä 2: Etsii hakukentän, kirjoittaa siihen “Jamk” ja hakee.
    cy.get('input[name="search"]:visible').type('Jamk');
    cy.contains('Jyväskylän ammattikorkeakoulu').click();

    // Tehtävä 3: Tarkistaa, että olemme oikealla sivulla.
    // Ensin varmistamme otsikosta, että sivu on latautunut:
    cy.get('h1').should('contain', 'Jyväskylän ammattikorkeakoulu');
    // Sitten tarkistamme URL:n koodatussa muodossa:
    cy.url().should('include', 'Jyv%C3%A4skyl%C3%A4n_ammattikorkeakoulu');

    // Tehtävä 4: Rullaa kohtaan “Kampukset”.
    cy.contains('Kampukset').scrollIntoView();

    // Tehtävä 5: Tarkistaa, että “Kampukset” on näkyvillä.
    cy.contains('Kampukset').should('be.visible');

    // Tehtävä 6: Odottaa 5 sekuntia.
    cy.wait(5000);

    // Tehtävä 7: Vaihtaa kielen englanniksi, jolloin meidän tulisi päätyä Jamkin sivuille englannikielisessä Wikipediassa.
    // (Huom: Käytämme { force: true }, koska kielilinkki on usein piilotetun valikon sisällä)
    cy.contains('a', 'English').click({ force: true });

    // Tehtävä 8: Tarkistaa, että uusi sivu on oikea

    cy.url().should('include', 'JAMK_University_of_Applied_Sciences');
  });
});

//tekoäly on korjannut muutamia virheitä mitä minulla tuli testin aikana, joitakin asetuksia piti tuolla ylhäällä laittaa
