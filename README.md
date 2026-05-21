# DiverTask API - Back-End

Back-end do aplicativo **DiverTask**, um gerenciador de tarefas e atividades rotineiras focado em acessibilidade para pessoas com neurodivergências. Esta API RESTful fornece a infraestrutura de persistência de dados, autenticação e segurança para a aplicação mobile.

## Tecnologias Utilizadas

* **Node.js & Express:** Roteamento e arquitetura do servidor web.
* **MySQL & Sequelize (ORM):** Banco de dados relacional e mapeamento objeto-relacional.
* **JSON Web Token (JWT):** Autenticação stateless e proteção de rotas.
* **Bcrypt:** Criptografia de senhas via hash irreversível.

## Como Executar Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) (v14 ou superior)
* Servidor [MySQL](https://www.mysql.com/) ativo

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/DevVitorH/divertask-backend.git](https://github.com/DevVitorH/divertask-backend.git)
   cd divertask-backend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto e configure as credenciais do banco e a chave JWT:
   ```env
   PORT=3000
   DB_HOST=127.0.0.1
   DB_USER=seu_usuario_mysql
   DB_PASS=sua_senha_mysql
   DB_NAME=divertask_db
   JWT_SECRET=sua_chave_secreta_super_segura
   ```

4. **Inicie o servidor:**
   ```bash
   npm run dev
   ```
   > **Nota:** O Sequelize sincronizará e criará as tabelas no banco de dados automaticamente na primeira execução.

---

## Endpoints da API

**Atenção:** Rotas marcadas com 🔒 exigem autenticação. O Token JWT deve ser enviado no cabeçalho da requisição no formato `Authorization: Bearer <token>`.

### Autenticação e Usuários
| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/register` | Cria uma nova conta de usuário. | Público |
| `POST` | `/api/login` | Autentica o usuário e retorna o Token JWT. | Público |
| `GET` | `/api/user/me` | Retorna o `username` e a `fotoPerfil` do usuário logado. | 🔒 Privado |
| `POST` | `/api/perfil/foto` | Salva a foto de perfil do usuário (Base64). | 🔒 Privado |

### Tarefas (Tasks)
| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Lista todas as tarefas do usuário logado. | 🔒 Privado |
| `POST` | `/api/tasks` | Cria uma nova tarefa. | 🔒 Privado |
| `PUT` | `/api/tasks/:id` | Atualiza os dados de uma tarefa específica. | 🔒 Privado |
| `DELETE` | `/api/tasks/:id` | Exclui uma tarefa específica. | 🔒 Privado |

### Atividades Rotineiras
| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/activities` | Lista as atividades recorrentes do usuário. | 🔒 Privado |
| `POST` | `/api/activities` | Cria uma nova atividade rotineira. | 🔒 Privado |
| `PUT` | `/api/activities/:id` | Atualiza uma atividade rotineira. | 🔒 Privado |
| `DELETE` | `/api/activities/:id` | Exclui uma atividade rotineira. | 🔒 Privado |

---

## Segurança e Arquitetura

O desenvolvimento seguiu princípios de Clean Code e Segurança da Informação:
* **Criptografia:** Senhas protegidas no banco de dados utilizando `bcrypt` (salt + hash).
* **Padrão MVC:** Lógica de negócios (`controllers`), acesso a dados (`models`) e exposição de endpoints (`routes`) estritamente separados.
* **Middlewares de Segurança:** Uso de `authMiddleware.js` para interceptar e validar requisições privadas, garantindo a integridade da sessão via JWT.
