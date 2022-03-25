# Backend Gerenciamento de tarefas

### Instalação

- Faça o clone.
- Dentro da pasta execute `yarn install` ou `npm install`.
- Faça uma copia do conteudo do arquivo `.env.example` e crie o arquivo `.env` e altere os valores das váriaveis.
- Crie um banco de dados mysql com o mesmo nome do que está no arquvio `.env`
- Execute o comando `node ace migration:run` para criar os dados
- Execute o comando `node ace db:seed` para povoar o banco com dados testes
- Execute `yarn dev` ou `npm run dev` para iniciar o servidor.


### Funcionalidades

- Criar projetos
- Atribuir usuários ao projeto
- Ter controle do tempo gasto do projeto
- Gerenciar inicio e fim e prazo de entrega para o projeto.
- Criar tarefas
- Gerenciar inicio e fim e prazo de entrega para a tarefa
- Gerenciar listas no board


### Observações
