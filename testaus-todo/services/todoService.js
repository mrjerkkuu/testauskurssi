// todoService.js

export class TodoService {
  constructor() {
    this.tasks = [];
  }

  // Apufunktio ID:n luontiin (kopioitu alkuperäisestä)
  generateId() {
    return (
      't_' +
      Math.random().toString(36).slice(2, 8) +
      Date.now().toString(36).slice(-4)
    );
  }

  // 1. Tehtävän luonti
  createTask(topic, priority, status, description) {
    const now = Date.now();
    const newTask = {
      id: this.generateId(),
      topic,
      priority,
      status,
      description,
      completed: status === 'done', // Logiikka: jos status on done, completed on true
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  // 2. Tehtävien listaus
  getTasks() {
    return this.tasks;
  }

  // 3. Tehtävän päivitys
  updateTask(id, payload) {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return null;

    const currentTask = this.tasks[idx];
    const updatedTask = {
      ...currentTask,
      ...payload,
      completed: payload.status === 'done' ? true : currentTask.completed, // Alkuperäinen logiikka
      updatedAt: Date.now(),
    };

    this.tasks[idx] = updatedTask;
    return updatedTask;
  }

  // 4. Tehtävän poistaminen
  deleteTask(id) {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return false;

    this.tasks.splice(idx, 1);
    return true;
  }
}
