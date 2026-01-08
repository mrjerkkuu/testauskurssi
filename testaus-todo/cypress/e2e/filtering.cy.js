/// <reference types="Cypress" />

describe('ToDo App - Filtering', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('http://localhost:5173');

    // Create initial data: 3 tasks with different priorities
    // Task 1: Low
    createTask('Low Task', 'low');
    // Task 2: Medium
    createTask('Medium Task', 'medium');
    // Task 3: High
    createTask('High Task', 'high');
  });

  it('Shows all tasks by default', () => {
    cy.get('.task').should('have.length', 3);
  });

  it('Filters by Low priority', () => {
    cy.get('#filter-low').click();

    // Should show 1 task
    cy.get('.task').should('have.length', 1);
    // That task should be Low
    cy.get('.task').first().find('.prio-low').should('exist');
    cy.get('.task').contains('Low Task');
  });

  it('Filters by Medium priority', () => {
    cy.get('#filter-medium').click();

    cy.get('.task').should('have.length', 1);
    cy.get('.task').first().find('.prio-medium').should('exist');
    cy.get('.task').contains('Medium Task');
  });

  it('Filters by High priority', () => {
    cy.get('#filter-high').click();

    cy.get('.task').should('have.length', 1);
    cy.get('.task').first().find('.prio-high').should('exist');
    cy.get('.task').contains('High Task');
  });

  it('Resets to show all tasks', () => {
    // First filter to High
    cy.get('#filter-high').click();
    cy.get('.task').should('have.length', 1);

    // Then click All
    cy.get('#filter-all').click();

    // Should show 3 again
    cy.get('.task').should('have.length', 3);
  });
});

function createTask(title, priority) {
  cy.get('#topic').type(title);
  cy.get('#priority').select(priority); // value is lowercase 'low', 'medium', 'high'
  // Note: select takes the value or text. The options are 'low', 'medium', 'high'.
  // But wait, in index.html, values are lowercase, texts are Title Case.
  // <option value="low">Low</option>
  // .select('low') works with value.

  cy.get('#save-btn').click();
  // Ensure form is cleared or wait for list update
  cy.get('#topic').should('have.value', '');
}
