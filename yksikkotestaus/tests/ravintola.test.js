import { describe, test, expect, beforeEach } from 'vitest';
import ravintola from '../Ravintola/ravintola';

describe('Ravintola App', () => {
  // Nollataan ravintolan paikat ennen jokaista testiä, jotta edelliset testit
  // eivät vaikuta seuraaviin (esim. ravintola ei ole valmiiksi täynnä).
  beforeEach(() => {
    // Pakotetaan paikat uudelleen luotavaksi tai tyhjennetään ne
    ravintola.paikat = ravintola.generoiPaikat();
  });

  // TESTITAPAUS 1
  test('syoRavintolassa: onnistuu kun asiakasmäärä (5) mahtuu (raja 15)', () => {
    const asiakkaita = 5;
    const tulos = ravintola.syoRavintolassa(asiakkaita);

    // Oletus: palauttaa taulukon tilauksia
    expect(Array.isArray(tulos)).toBe(true);
    expect(tulos).toHaveLength(asiakkaita);
  });

  // TESTITAPAUS 2
  test('syoRavintolassa: estää tilauksen jos kapasiteetti ylittyy (10 + 6 > 15)', () => {
    // 1. Ensimmäinen ryhmä (10 henkeä) mahtuu
    const ryhma1 = ravintola.syoRavintolassa(10);
    expect(Array.isArray(ryhma1)).toBe(true); // Meni läpi

    // 2. Toinen ryhmä (6 henkeä) -> Yhteensä olisi 16, paikkoja vain 15.
    // Funktio palauttaa undefined (koska if (!onTilaa) return;), se ei heitä virhettä nykyisessä koodissa.
    const ryhma2 = ravintola.syoRavintolassa(6);

    expect(ryhma2).toBeUndefined();

    // HUOM: Jos koodisi heittäisi Errorin (throw new Error), testi olisi:
    // expect(() => ravintola.syoRavintolassa(6)).toThrow();
  });

  // TESTITAPAUS 3
  test('laskeLasku: laskee hinnan oikein olioiden perusteella', () => {
    // Luodaan testioliot (mock objects), joilla on hinta-ominaisuus
    const alkuruoka = { ruoka: 'TestiAlku', hinta: 5 };
    const paaruoka = { ruoka: 'TestiPaa', hinta: 10 };
    const jalkiruoa = { ruoka: 'TestiJalki', hinta: 4 };
    const juoma = { ruoka: 'TestiJuoma', hinta: 2 };

    // Lasketaan summa: 5 + 10 + 4 + 2 = 21
    const summa = ravintola.laskeLasku(alkuruoka, paaruoka, jalkiruoa, juoma);

    expect(summa).toBe(21);
  });

  test('laskeLasku: laskee hinnan oikein kun osa ruoista puuttuu (null)', () => {
    const paaruoka = { ruoka: 'TestiPaa', hinta: 10 };
    // Muut ovat null

    const summa = ravintola.laskeLasku(null, paaruoka, null, null);

    expect(summa).toBe(10);
  });
});

// tekoälyä käytetty testien laajuuden avuksi, ja omaien testien oikeellisuuden todentamiseen
// laitoin tekoälyn kirjoittamaan myös kommentit koska en itse jaksanut xd
