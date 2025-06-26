Feature: Cadastro de usuários via interface administrativa

  Scenario: Cadastrar um novo usuário com sucesso
    When o administrador acessa a página de cadastro de usuários
    And preenche o nome, e-mail, senha e marca o checkbox de administrador
    And envia o formulário de cadastro
    Then deve ser exibida a mensagem "Cadastro realizado com sucesso"
    And o novo usuário deve estar visível na listagem de usuários

  Scenario: Exibir erro ao tentar cadastrar usuário com e-mail já utilizado
    Given que já existe um usuário cadastrado com um e-mail específico
    When o administrador tenta cadastrar um novo usuário com o mesmo e-mail
    Then deve ser exibida a mensagem "Este email já está sendo usado"