describe("Cadastrar usuário", () => {
  const senha = "123456";
  const nome = "Usuário Teste";
  const email = `teste_${Date.now()}@email.com`;

  beforeEach(() => {
    cy.login();
  });

  it("Deve cadastrar um novo usuário com sucesso", () => {
    cy.visit("/cadastrarusuarios");

    cy.get('input[name="nome"]').type(nome);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);
    cy.get('input[type="checkbox"]').check();

    cy.get('button[type="submit"]').click();

    cy.contains("Cadastro realizado com sucesso").should("be.visible");

    cy.visit("/admin/listarusuarios");
    cy.contains(email).should("be.visible");
  });

  it("Deve exibir mensagem de erro ao tentar cadastrar usuário com email já existente", () => {
    cy.visit("/cadastrarusuarios");

    cy.get('input[name="nome"]').type(nome);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);
    cy.get('input[type="checkbox"]').check();

    cy.get('button[type="submit"]').click();

    cy.contains("Este email já está sendo usado").should("be.visible");
  });
});
