Feature: Login no sistema Serverest

  Scenario: Realizar login com sucesso
    Given que o usuário está na página de login
    When ele insere o e-mail "fulano@qa.com" e a senha "teste"
    And clica no botão de login
    Then ele deve ser redirecionado para a página "/admin/home"

  Scenario: Exibir erro ao logar com credenciais inválidas
    Given que o usuário está na página de login
    When ele insere o e-mail "teste@teste.com" e a senha "senhaerrada"
    And clica no botão de login
    Then deve ser exibida a mensagem "Email e/ou senha inválidos"
    And ele não deve ser redirecionado para a página "/admin/home"