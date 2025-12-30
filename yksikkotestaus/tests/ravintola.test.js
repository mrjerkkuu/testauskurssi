import { describe, test, expect } from 'vitest';
import ravintola from '../Ravintola/ravintola';

// Hinnan laskeminen
describe('laskeLasku', () => {
  test('palauttaa oikean summan pelkällä pääruoalla', () => {
    expect(ravintola.laskeLasku(false, false, false)).toBe(6);
  });

  test('palauttaa oikean summan kaikilla ruokalajeilla', () => {
    expect(ravintola.laskeLasku(true, true, true)).toBe(17);
  });

  test('palauttaa oikean summan alkuruoalla ja juomalla', () => {
    expect(ravintola.laskeLasku(true, false, true)).toBe(13);
  });

  test('heittää TypeErrorin väärillä parametreilla', () => {
    expect(() => ravintola.laskeLasku('teksti', 123, null)).toThrow(TypeError);
  });
});

// Satunnaisen arvon haku
describe('palautaTaulukonSatunnainenArvo', () => {
  test('palauttaa arvon annetusta taulukosta', () => {
    const taulukko = ravintola.alkuruoat;
    const tulos = ravintola.palautaTaulukonSatunnainenArvo(taulukko);
    expect(taulukko).toContain(tulos);
  });
});

// Kapasiteetin tarkistus (Uusi osio)
describe('tarkistaPaikkojenMaara', () => {
  test('sallii asiakkaat jos tilaa on', () => {
    expect(ravintola.tarkistaPaikkojenMaara(10)).toBe(true);
  });

  test('kieltää asiakkaat jos ravintola on täysi', () => {
    expect(ravintola.tarkistaPaikkojenMaara(16)).toBe(false);
  });
});

// Päätoiminnallisuus
describe('syoRavintolassa', () => {
  test('palauttaa taulukon tilauksia, kun asiakkaita mahtuu', () => {
    const maara = 3;
    const tulos = ravintola.syoRavintolassa(maara);
    expect(Array.isArray(tulos)).toBe(true);
    expect(tulos).toHaveLength(maara);

    // Tarkistetaan vielä että tilauksen sisällä on summa ja ruoat
    expect(tulos[0]).toHaveProperty('summa');
    expect(tulos[0]).toHaveProperty('ruoat');
  });

  test('ei palauta tilauksia jos ravintola on täysi', () => {
    const tulos = ravintola.syoRavintolassa(50);
    expect(tulos).toBeUndefined();
  });
});

//tekoälyä on käytetty tässä tehtävässä omien testien tarkistamiseen,
//se myös ehdotti muutamia lisätestejä ja korjausta syoRavintolassa testiin
// paikkojen maara on kokonaan generoitu tekoälyn avulla. samoin errorin testaus
