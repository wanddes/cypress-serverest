Feature: Gerenciamento de produtos via API

  Background:
    Given que o usuário está autenticado via API

  Scenario: Cadastrar um novo produto com sucesso
    When o usuário envia os dados de um novo produto válido
    Then o sistema deve retornar status 201
    And deve exibir a mensagem "Cadastro realizado com sucesso"

  Scenario: Editar um produto existente
    Given que um produto foi previamente cadastrado
    When o usuário altera os dados do produto
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Registro alterado com sucesso"

  Scenario: Listar todos os produtos
    When o usuário consulta a listagem de produtos
    Then o sistema deve retornar status 200
    And deve retornar uma lista de produtos

  Scenario: Excluir um produto cadastrado
    Given que um produto foi criado para exclusão
    When o usuário solicita a exclusão do produto
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Registro excluído com sucesso"

  Scenario: Não permitir cadastro de produto com nome duplicado
    Given que um produto com um determinado nome já existe
    When o usuário tenta cadastrar outro produto com o mesmo nome
    Then o sistema deve retornar status 400
    And deve exibir a mensagem informando que o nome já existe