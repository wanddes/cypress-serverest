describe("API - Produtos", () => {
  let produtoId;

  before(() => {
    cy.loginApi();
  });

  it("Deve cadastrar um novo produto com sucesso", () => {
    cy.request({
      method: "POST",
      url: "/produtos",
      headers: {
        Authorization: Cypress.env("token"),
      },
      body: {
        nome: `Produto API ${Date.now()}`,
        preco: 150,
        descricao: "Descrição do produto de teste",
        quantidade: 10,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
      produtoId = response.body._id;
    });
  });

  it("Deve editar o produto criado", () => {
    expect(produtoId).to.not.be.undefined;

    cy.request({
      method: "PUT",
      url: `/produtos/${produtoId}`,
      headers: {
        Authorization: Cypress.env("token"),
      },
      body: {
        nome: `Produto API Editado ${Date.now()}`,
        preco: 200,
        descricao: "Descrição do produto editado",
        quantidade: 5,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Registro alterado com sucesso");
    });
  });

  it("Deve listar todos os produtos", () => {
    cy.request({
      method: "GET",
      url: "/produtos",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.produtos).to.be.an("array");
    });
  });

  it("Deve excluir um produto cadastrado", () => {
    cy.request({
      method: "POST",
      url: "/produtos",
      headers: {
        Authorization: Cypress.env("token"),
      },
      body: {
        nome: `Produto Exclusao ${Date.now()}`,
        preco: 100,
        descricao: "Produto para exclusão",
        quantidade: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      const produtoIdExcluir = response.body._id;
      cy.request({
        method: "DELETE",
        url: `/produtos/${produtoIdExcluir}`,
        headers: {
          Authorization: Cypress.env("token"),
        },
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
        expect(deleteResponse.body.message).to.eq(
          "Registro excluído com sucesso"
        );
      });
    });
  });

  it("Não deve permitir cadastrar um produto com nome já existente", () => {
    const nomeRepetido = `Produto Repetido ${Date.now()}`;

    cy.request({
      method: "POST",
      url: "/produtos",
      headers: {
        Authorization: Cypress.env("token"),
      },
      body: {
        nome: nomeRepetido,
        preco: 150,
        descricao: "Produto repetido teste",
        quantidade: 10,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);

      cy.request({
        method: "POST",
        url: "/produtos",
        headers: {
          Authorization: Cypress.env("token"),
        },
        body: {
          nome: nomeRepetido,
          preco: 180,
          descricao: "Produto repetido teste 2",
          quantidade: 5,
        },
        failOnStatusCode: false,
      }).then((response2) => {
        expect(response2.status).to.eq(400);
        expect(response2.body.message).to.include(
          "Já existe produto com esse nome"
        );
      });
    });
  });
});
