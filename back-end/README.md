# API de Produtos (Node.js + Express + PostgreSQL)

Esta é uma API RESTful para gerenciamento de produtos, desenvolvida em Node.js com Express e banco de dados PostgreSQL. Ela foi preparada para atuar exclusivamente como backend, e já possui configuração de **CORS** para ser facilmente consumida por aplicações Frontend, como React/Vite.

## 🚀 Tecnologias Utilizadas

- **Node.js** com **Express**
- **PostgreSQL** (com pacote `pg` para a conexão via pool)
- **Dotenv** para variáveis de ambiente
- **CORS** para permissão de chamadas Cross-Origin

## ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

## 🛠️ Configuração e Execução

### 1. Clonar e Instalar as Dependências

No terminal do diretório raiz do projeto, instale os pacotes necessários:

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (você pode se basear no arquivo `.env.example`, caso exista). O arquivo deve conter os seguintes dados, de acordo com o seu banco PostgreSQL:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=api_produtos
DB_PASSWORD=sua_senha_aqui
DB_PORT=5432
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 3. Banco de Dados

Crie um banco de dados vazio chamado `api_produtos` no seu PostgreSQL.

Ao rodar a aplicação, a **tabela `produtos` será criada automaticamente** pela própria aplicação caso ainda não exista. Caso você prefira criá-la e inserir alguns dados fictícios de forma manual, utilize o arquivo `script.sql` disponibilizado na raiz do projeto, rodando-o pelo **pgAdmin** ou **DBeaver**.

### 4. Rodar a API

Inicie o servidor com o comando:

```bash
npm run dev
```

Se tudo der certo, você verá uma mensagem no console dizendo que o servidor está rodando na porta `3000` (ou a definida no `.env`) e que está conectado ao banco de dados PostgreSQL.

---

## 📡 Endpoints da API

A URL base para a API é `http://localhost:3000/produtos`.

| Método | Rota | Descrição |
|--------|------|-----------|
| **GET** | `/produtos` | Lista todos os produtos cadastrados |
| **GET** | `/produtos/buscar/nome/:nome` | Busca produtos de forma flexível pelo nome |
| **GET** | `/produtos/buscar/id/:id` | Busca os dados de um único produto através do ID |
| **POST** | `/produtos` | Cria um novo produto |
| **PUT** | `/produtos/:id` | Atualiza os dados completos de um produto específico |
| **DELETE**| `/produtos/:id` | Remove um produto do banco de dados |

### Estrutura (JSON) de um Produto

Quando você buscar (`GET`), enviar (`POST`) ou atualizar (`PUT`) um produto, o formato dos dados trafegados no corpo da requisição deverá seguir esta estrutura:

```json
{
  "nome": "Fresa de Topo Metal Duro 10mm",
  "preco": 120.50,
  "estoque": 40,
  "categoria": "Ferramentas de Corte"
}
```

---

*Backend estruturado e simplificado, ideal para integração com seu Front-End em React!*

<!-- CHECKPOINT id="ckpt_moij7qy3_9vwzep" time="2026-04-28T11:17:31.563Z" note="auto" fixes=0 questions=0 highlights=0 sections="" -->
