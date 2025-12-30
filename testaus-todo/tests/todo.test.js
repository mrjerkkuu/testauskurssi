import { describe, test, expect, beforeEach } from 'vitest';
import { TodoService } from '../services/todoService';

describe('ToDo Sovelluksen logiikka', () => {
  let service;

  // Alustetaan uusi, tyhjä service ennen jokaista testiä
  beforeEach(() => {
    service = new TodoService();
  });

  // TESTI 1: TEHTÄVÄN LUONTI
  test('Luo uuden tehtävän oikeilla tiedoilla', () => {
    const task = service.createTask(
      'Osta maitoa',
      'high',
      'todo',
      'Laktoositon'
    );

    expect(task).toBeDefined();
    expect(task.id).toBeDefined();
    expect(task.topic).toBe('Osta maitoa');
    expect(task.priority).toBe('high');
    expect(service.getTasks()).toHaveLength(1);
  });

  // TESTI 2: TEHTÄVIEN LISTAUS
  test('Listaa kaikki tehtävät', () => {
    // Luodaan kaksi tehtävää
    service.createTask('Tehtävä 1', 'low', 'todo', '');
    service.createTask('Tehtävä 2', 'medium', 'todo', '');

    const tasks = service.getTasks();

    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks).toHaveLength(2);
    expect(tasks[0].topic).toBe('Tehtävä 1');
  });

  // TESTI 3: TEHTÄVÄN PÄIVITYS
  test('Päivittää tehtävän tiedot ja muuttaa completed-tilan jos status on done', () => {
    // 1. Luodaan pohjalle tehtävä
    const original = service.createTask('Koodaa', 'high', 'todo', '');

    // KORJAUS: Vähennetään alkuperäisestä ajasta 1 millisekunti, jotta se on varmasti "vanhempi"
    // kuin tuleva päivityshetki.
    original.updatedAt = original.updatedAt - 1;

    // 2. Päivitetään se
    const updates = {
      topic: 'Koodaa ja testaa',
      status: 'done',
    };

    const updated = service.updateTask(original.id, updates);

    expect(updated.topic).toBe('Koodaa ja testaa');
    expect(updated.status).toBe('done');
    expect(updated.completed).toBe(true);

    // Nyt tämä menee läpi, koska original.updatedAt on pakotettu pienemmäksi
    expect(updated.updatedAt).toBeGreaterThan(original.updatedAt);
  });

  // TESTI 4: TEHTÄVÄN POISTAMINEN
  test('Poistaa tehtävän listasta', () => {
    // 1. Luodaan tehtävä
    const task = service.createTask('Roskat', 'low', 'todo', '');
    expect(service.getTasks()).toHaveLength(1);

    // 2. Poistetaan se
    const success = service.deleteTask(task.id);

    expect(success).toBe(true);
    expect(service.getTasks()).toHaveLength(0);
  });

  test('Palauttaa false jos poistetaan olematon tehtävä', () => {
    const success = service.deleteTask('olematon-id');
    expect(success).toBe(false);
  });
});

//testien luomiseen on käytetty tekoälyä avuksi, ideointiin ja kommentointiin
