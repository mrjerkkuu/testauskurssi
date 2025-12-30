/*
TIKO RAVINTOLA
OHJELMAKOODI - PÄIVITETTY
*/

const Ravintola = function () {
  // OHJE 4: Muokattu ruokalistat olioiksi, joissa on ruoka ja hinta.
  // Poistettu vanhat kiinteät hinnat (this.alkuruokaHinta jne).
  this.alkuruoat = [
    { ruoka: 'Tomaattikeitto', hinta: 4 },
    { ruoka: 'Leipä', hinta: 2 },
    { ruoka: 'Vihersalaatti', hinta: 3 },
    { ruoka: 'Salsa', hinta: 4 },
  ];
  this.paaruoat = [
    { ruoka: 'Kalakeitto', hinta: 8 },
    { ruoka: 'Makaroonilaatikko', hinta: 7 },
    { ruoka: 'Kasvispihvi', hinta: 9 },
    { ruoka: 'Kanasalaatti', hinta: 8 },
  ];
  this.jalkiruoat = [
    { ruoka: 'Hedelmäsalaatti', hinta: 4 },
    { ruoka: 'Jäätelö', hinta: 3 },
    { ruoka: 'Pulla', hinta: 2 },
    { ruoka: 'Donitsi', hinta: 3 },
  ];
  this.juomat = [
    { ruoka: 'Tee', hinta: 2 },
    { ruoka: 'Kahvi', hinta: 3 },
    { ruoka: 'Maito', hinta: 1 },
    { ruoka: 'Mehu', hinta: 2 },
  ];
  this.paikkojenMaara = 15;
  this.paikat; // Tähän muuttujaan paikkojen taulukko
};

/**
 * Palauttaa satunnaisen boolean arvon
 * @return {boolean} Randomized boolean
 */
function generoiBoolean() {
  return Math.random() < 0.5;
}

/**
 * OHJE 1: Viimeistele generoiPaikat-funktio JSDocin mukaisesti.
 *
 * Luo Ravintolan paikat-muuttujaan uuden taulukon, jonka koko määräytyy paikkojenMaara-muuttujan mukaisesti,
 * ja täyttää taulukon boolean arvolla false.
 * * @return {boolean[]} Palauttaa luodun taulukon
 */
Ravintola.prototype.generoiPaikat = function () {
  return new Array(this.paikkojenMaara).fill(false);
};

/**
 * OHJE 2: varaaPaikat-funktio
 * * Tarkistaa onko ravintolassa tilaa ja varaa paikat.
 * * @param {number} varauksenMaara - Varattavien paikkojen lukumäärä (oletus 1)
 * @return {boolean} Palauttaa true jos varaus onnistui, muuten false
 */
Ravintola.prototype.varaaPaikat = function (varauksenMaara) {
  // 1. Tarkistaa, että paikat-muuttujassa on taulukko. Jos ei ole, luo sen.
  if (!this.paikat) {
    this.paikat = this.generoiPaikat();
  }

  // 2. Jos varauksenMaara:lle ei ole annettu arvoa, asettaa arvoksi 1
  if (typeof varauksenMaara !== 'number') {
    varauksenMaara = 1;
  }

  // 3. Laskee vapaiden paikkojen määrän (false = vapaa)
  const vapaatPaikat = this.paikat.filter((paikka) => paikka === false).length;

  // 4. Jos vapaiden paikkojen määrä on pienempi kuin varauksenMaara, palauttaa falsen
  if (vapaatPaikat < varauksenMaara) {
    console.log(
      `Ikävä kyllä ravintolaan ei mahdu ${varauksenMaara} asiakasta.`
    );
    return false;
  }

  // 5. Jos tilaa on, käydään läpi paikat-taulukkoa ja muutetaan false-arvoja trueksi
  let varatutNyt = 0;
  for (let i = 0; i < this.paikat.length; i++) {
    // Jos olemme varanneet jo tarpeeksi, lopetetaan silmukka (optimointi)
    if (varatutNyt >= varauksenMaara) break;

    // Jos paikka on vapaa (false), varataan se
    if (this.paikat[i] === false) {
      this.paikat[i] = true;
      varatutNyt++;
    }
  }

  // 6. Palautetaan true
  console.log(
    `Tilaa on ${varauksenMaara} asiakkaalle. Tervetuloa ravintolaamme!`
  );
  return true;
};

/**
 * Ravintolassa syöminen
 */
Ravintola.prototype.syoRavintolassa = function (asiakkaidenMaara) {
  // OHJE 3: Ota varaaPaikat -funktio käyttöön sille sopivassa kohdassa.
  const onTilaa = this.varaaPaikat(asiakkaidenMaara);

  if (!onTilaa) {
    return;
  }
  const tilaukset = [];

  for (let i = 0; i < asiakkaidenMaara; i++) {
    console.log('-------------------------------------------------------');
    console.log(
      'Tarjoillaan asiakasta numero ' + (i + 1) + '. Mitä teille saisi olla?'
    );
    tilaukset.push(
      this.tilaaAteria(generoiBoolean(), generoiBoolean(), generoiBoolean())
    );
    console.log('Asiakkaalle tarjoiltu. Hyvää ruokahalua!');
  }
  console.log('-------------------------------------------------------');
  console.log('Kaikille asiakkaille tarjoiltu!');

  return tilaukset;
};

/**
 * HUOM: Päivitetty toimimaan uusien ruokaolioiden kanssa.
 * Hakee satunnaiset ruokaoliot ja laskee niiden hinnan.
 */
Ravintola.prototype.tilaaAteria = function (
  ottaaAlkuruoan,
  ottaaJalkiruoan,
  ottaaJuoman
) {
  if (
    typeof ottaaAlkuruoan !== 'boolean' ||
    typeof ottaaJalkiruoan !== 'boolean' ||
    typeof ottaaJuoman !== 'boolean'
  ) {
    throw new TypeError();
  }

  const ruoat = [];

  // Nämä muuttujat pitävät sisällään koko oliot (esim. {ruoka: 'Leipä', hinta: 2})
  let valittuAlkuruoka = null;
  let valittuPaaruoka = null;
  let valittuJalkiruoka = null;
  let valittuJuoma = null;

  if (ottaaAlkuruoan) {
    valittuAlkuruoka = this.palautaTaulukonSatunnainenArvo(this.alkuruoat);
    console.log('Ottaisin alkuruoaksi: ' + valittuAlkuruoka.ruoka);
    ruoat.push(valittuAlkuruoka.ruoka);
  }

  // Pääruoka otetaan aina
  valittuPaaruoka = this.palautaTaulukonSatunnainenArvo(this.paaruoat);
  console.log('Ottaisin pääruoaksi: ' + valittuPaaruoka.ruoka);
  ruoat.push(valittuPaaruoka.ruoka);

  if (ottaaJalkiruoan) {
    valittuJalkiruoka = this.palautaTaulukonSatunnainenArvo(this.jalkiruoat);
    console.log('Ottaisin jälkiruoaksi: ' + valittuJalkiruoka.ruoka);
    ruoat.push(valittuJalkiruoka.ruoka);
  }

  if (ottaaJuoman) {
    valittuJuoma = this.palautaTaulukonSatunnainenArvo(this.juomat);
    console.log('Ottaisin juomaksi: ' + valittuJuoma.ruoka);
    ruoat.push(valittuJuoma.ruoka);
  }

  // Kutsutaan laskeLasku-funktiota oikeilla olioilla
  const summa = this.laskeLasku(
    valittuAlkuruoka,
    valittuPaaruoka,
    valittuJalkiruoka,
    valittuJuoma
  );

  return { summa, ruoat };
};

/**
 * Palauttaa satunnaisen arvon annetusta taulukosta.
 * Nyt palauttaa olion {ruoka, hinta} eikä pelkkää stringiä.
 */
Ravintola.prototype.palautaTaulukonSatunnainenArvo = function (taulukko) {
  return taulukko[Math.floor(Math.random() * taulukko.length)];
};

/**
 * HUOM: Päivitetty laskemaan hinta parametreina saaduista olioista.
 * Vanha versio ei enää toiminut, koska kiinteitä hintoja ei ole.
 * * @param {object|null} alkuruoka - Ruokaolio tai null
 * @param {object} paaruoka - Ruokaolio
 * @param {object|null} jalkiruoka - Ruokaolio tai null
 * @param {object|null} juoma - Ruokaolio tai null
 * @return {number}
 */
Ravintola.prototype.laskeLasku = function (
  alkuruoka,
  paaruoka,
  jalkiruoka,
  juoma
) {
  let loppuSumma = 0;

  // Lisätään hinnat, jos ruoka on valittu (eli parametri ei ole null)
  if (paaruoka) loppuSumma += paaruoka.hinta;
  if (alkuruoka) loppuSumma += alkuruoka.hinta;
  if (jalkiruoka) loppuSumma += jalkiruoka.hinta;
  if (juoma) loppuSumma += juoma.hinta;

  return loppuSumma;
};

const ravintola = new Ravintola();

export default ravintola;
