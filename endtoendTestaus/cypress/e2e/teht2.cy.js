/// <reference types="Cypress" />

describe('Pizza Online Tilaus', () => {
  it('Täyttää lomakkeen, valitsee pizzan ja tarkistaa hinnan', () => {
    // 1. Menee sivustolle
    cy.visit('https://tiko.jamk.fi/~imjar/fronttiper/esimteht/pizza_anim/');

    // 2. Täyttää Nimi-kentän
    const nimi = 'Matti Meikäläinen';
    cy.get('#nimi').type(nimi).should('have.value', nimi);

    // 3. Täyttää Puhelin-kentän
    const puhelin = '0401234567';
    cy.get('#puhelin').type(puhelin).should('have.value', puhelin);

    // 4. Täyttää Sähköposti-kentän
    const email = 'matti@esimerkki.fi';
    cy.get('#sposti').type(email).should('have.value', email);

    // 5. Valitsee halutun koon (Pudotusvalikko)
    cy.get('#koko').select('Pieni');

    // 6. Valitsee halutun pohjan
    cy.get('#Normaali').check({ force: true });

    // 7. Valitsee halutut täytteet
    cy.get('#Kinkku').check({ force: true });
    cy.get('#Salami').check({ force: true }); // Arvaus ID:stä
    cy.get('#Ananas').check({ force: true }); // Arvaus ID:stä

    // 8. Tarkistaa hinnan
    cy.contains('Hinta').should('contain', '9.00');
  });
});

//tekoälyä jälleen käytetty avuksi
