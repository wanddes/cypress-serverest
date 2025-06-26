describe("API - Usuários", () => {
  let usuarioId;
  it("Deve cadastrar um novo usuário com sucesso", () => {
    cy.request({
      method: "POST",
      url: "/usuarios",
      body: {
        nome: "Usuário API",
        email: `usuario_api_${Date.now()}@teste.com`,
        password: "123456",
        administrador: "true",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
      usuarioId = response.body._id;
    });
  });

  it("Não deve permitir cadastrar com email já existente", () => {
    cy.request({
      method: "POST",
      url: "https://serverest.dev/usuarios",
      body: {
        nome: "Usuário Repetido",
        email: "fulano@qa.com",
        password: "123456",
        administrador: "false",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.include(
        "Este email já está sendo usado"
      );
    });
  });

  it("Deve editar o usuário criado", () => {
    expect(usuarioId).to.not.be.undefined;

    cy.request({
      method: "PUT",
      url: `/usuarios/${usuarioId}`,
      body: {
        nome: "Usuário API Editado",
        email: `usuario_api_editado_${Date.now()}@teste.com`,
        password: "654321",
        administrador: "false",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Registro alterado com sucesso");
    });
  });

  it("Deve listar todos os usuários", () => {
    cy.request({
      method: "GET",
      url: "/usuarios",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.usuarios).to.be.an("array");
    });
  });

  it("Deve excluir um usuário cadastrado", () => {
    cy.request({
      method: "POST",
      url: "/usuarios",
      body: {
        nome: "Usuário para exclusão",
        email: `usuario_exclusao_${Date.now()}@teste.com`,
        password: "123456",
        administrador: "true",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      const usuarioIdExcluir = response.body._id;

      cy.request({
        method: "DELETE",
        url: `/usuarios/${usuarioIdExcluir}`,
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
        expect(deleteResponse.body.message).to.eq(
          "Registro excluído com sucesso"
        );
      });
    });
  });
});
