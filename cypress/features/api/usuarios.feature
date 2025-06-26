Feature: Gerenciamento de usuários via API

  Scenario: Cadastrar um novo usuário com sucesso
    When o usuário envia os dados de um novo usuário válido
    Then o sistema deve retornar status 201
    And deve exibir a mensagem "Cadastro realizado com sucesso"

  Scenario: Não permitir cadastro com e-mail já existente
    Given que já existe um usuário com o e-mail "fulano@qa.com"
    When o usuário tenta cadastrar outro com o mesmo e-mail
    Then o sistema deve retornar status 400
    And deve exibir a mensagem "Este email já está sendo usado"

  Scenario: Editar o usuário criado
    Given que um usuário foi previamente cadastrado
    When o usuário envia dados atualizados para esse usuário
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Registro alterado com sucesso"

  Scenario: Listar todos os usuários
    When o usuário consulta a listagem de usuários
    Then o sistema deve retornar status 200
    And deve retornar uma lista de usuários

  Scenario: Excluir um usuário cadastrado
    Given que um usuário foi criado para exclusão
    When o usuário solicita a exclusão desse usuário
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Registro excluído com sucesso"