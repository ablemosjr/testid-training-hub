**Resumo**
- **Objetivo:** Documentar o schema e os requisitos de API necessários para criar e alimentar o backend desta aplicação de exemplo (`testid-training-hub`).
- **Escopo:** modelagem relacional (Postgres) + alternativas (MongoDB), DDL, exemplos de seed, endpoints REST e notas sobre upload de arquivos/auth.

**Entidades Principais**
- `users` — usuários do sistema (login/roles)
- `products` — catálogo de produtos
- `forms` — submissões do `FormCompletoPage` (cada registro representa uma submissão de formulário)
- `form_dependentes` — dependentes associados a uma submissão (1:N)
- `sessions` (opcional) — tokens de sessão

---

**1) Schema Relacional (Postgres) — DDL sugerido**

-- users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(50) NOT NULL DEFAULT 'viewer', -- admin|editor|viewer
  password_hash VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX idx_users_email ON users(email);
```

-- products
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  sku VARCHAR(64),
  preco_cents INTEGER NOT NULL, -- exemplo: R$4.999,00 => 499900
  moeda VARCHAR(8) NOT NULL DEFAULT 'BRL',
  estoque INTEGER NOT NULL DEFAULT 0,
  descricao TEXT,
  images TEXT[], -- array de URLs/paths
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX idx_products_nome ON products USING gin (to_tsvector('portuguese', nome));
```

-- forms (submissões do FormCompletoPage)
```sql
CREATE TABLE forms (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(32),
  idade INTEGER,
  pais VARCHAR(100),
  genero VARCHAR(4),
  interesses TEXT[], -- ex: ARRAY['Newsletter','Promoções']
  observacoes TEXT,
  avatar_path VARCHAR(1000), -- caminho/URL do avatar
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

-- form_dependentes (1:N com forms)
```sql
CREATE TABLE form_dependentes (
  id SERIAL PRIMARY KEY,
  form_id INTEGER NOT NULL REFERENCES forms(id) ON DELETE CASCADE,
  idx INTEGER NOT NULL,
  nome VARCHAR(200) NOT NULL,
  idade INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX idx_form_dependentes_form ON form_dependentes(form_id);
```

-- sessions (opcional)
```sql
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  token VARCHAR(512) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX idx_sessions_user ON sessions(user_id);
```

---

**2) Exemplos de seed (Postgres inserts)**
```sql
-- Users
INSERT INTO users (nome, email, role) VALUES
('João Silva','joao@email.com','admin'),
('Maria Santos','maria@email.com','editor');

-- Products
INSERT INTO products (nome, preco_cents, estoque, descricao) VALUES
('Notebook Pro', 499900, 15, 'Notebook potente...'),
('Mouse Wireless', 14990, 87, 'Mouse sem fio...');

-- Example form submission
INSERT INTO forms (nome, email, telefone, idade, pais, genero, interesses, observacoes, avatar_path)
VALUES ('Teste Automação','teste@example.com','(11) 98765-4321',30,'Brasil','f', ARRAY['Newsletter','Promoções'], 'Observações de teste','/uploads/avatars/exemplo.jpg');

-- Add dependentes for the last inserted form
INSERT INTO form_dependentes (form_id, idx, nome, idade)
VALUES (currval('forms_id_seq'), 0, 'Dependente Um', 10), (currval('forms_id_seq'), 1, 'Dependente Dois', 8);
```

---

**3) JSON / MongoDB document examples (alternativa NoSQL)**

`forms` document example:
```json
{
  "_id": "ObjectId(...)",
  "nome": "Teste Automação",
  "email": "teste@example.com",
  "telefone": "(11) 98765-4321",
  "idade": 30,
  "pais": "Brasil",
  "genero": "f",
  "interesses": ["Newsletter","Promoções"],
  "observacoes": "Observações de teste",
  "avatar_path": "/uploads/avatars/123e4567-exemplo.jpeg",
  "dependentes": [ { "nome": "Dependente Um", "idade": 10 }, { "nome": "Dependente Dois", "idade": 8 } ],
  "createdAt": "2025-12-10T...Z"
}
```

---

**4) API endpoints recomendados**

- Auth (exemplo simples):
  - POST /api/auth/login { email, password } -> { token }
  - POST /api/auth/refresh -> { token }

- Users:
  - GET /api/users
  - POST /api/users
  - GET /api/users/:id
  - PUT /api/users/:id
  - DELETE /api/users/:id

- Products:
  - GET /api/products
  - POST /api/products
  - GET /api/products/:id
  - PUT /api/products/:id
  - DELETE /api/products/:id

- Forms (FormCompleto):
  - POST /api/forms
    - Content-Type: multipart/form-data
    - fields: nome, email, telefone, idade, pais, genero, interesses[] (repetido), observacoes
    - file: avatar
    - field dependentes: JSON string (ex: dependentes=[{"nome":"...","idade":10}, ...])
  - GET /api/forms
  - GET /api/forms/:id

Exemplo curl do POST /api/forms (multipart):
```bash
curl -X POST "http://localhost:3000/api/forms" \
  -F "nome=Teste Automação" \
  -F "email=teste@example.com" \
  -F "telefone=(11) 98765-4321" \
  -F "idade=30" \
  -F "pais=Brasil" \
  -F "interesses[]=Newsletter" -F "interesses[]=Promoções" \
  -F "observacoes=Observações de teste" \
  -F "dependentes=[{\"nome\":\"Dependente Um\",\"idade\":10}]" \
  -F "avatar=@/path/to/avatar.jpeg"
```

---

**5) Uploads / Storage de arquivos**
- Recomendado: armazenar arquivos em object storage (S3, MinIO). Salvar apenas `avatar_path`/URL no banco.
- Para desenvolvimento/CI: guardar uploads em `public/uploads/avatars/` ou usar `cypress/fixtures/` apenas para os testes (não produção).
- Nomeação: gerar UUID para arquivos para evitar colisões: `avatars/{uuid}.jpeg`.

---

**6) Validações & Regras de negócio (resumo)**
- `users.email` deve ser único e validado.
- `forms.nome`, `forms.email` obrigatórios (front já faz validação; validar também no backend).
- `dependente.idade` >= 0.
- `products.preco_cents` int >= 0; `products.estoque` int >= 0.

---

**7) Índices / Performance**
- `users.email` unique index
- Full-text index em `products.nome` / `products.descricao` para busca
- Index em `forms.created_at` para paginação e listagem

---

**8) Requisitos de ambiente / variáveis**
- DB: POSTGRES_URL (ex: postgres://user:pass@host:5432/dbname)
- STORAGE: S3_ENDPOINT, S3_BUCKET, S3_KEY, S3_SECRET (ou caminhos locais)
- AUTH: JWT_SECRET
- APP: PORT (ex: 3000)

---

**9) Seeds / Test fixtures**
- Incluir a seed SQL acima no repositório para inicialização do DB de desenvolvimento.
- Garantir que `cypress/fixtures/avatar.jpeg` existe para os E2E tests (já presente no repo).

---

**10) Próximos passos sugeridos (faça one-by-one)**
1. Construir migrations (ex: Knex, TypeORM, Prisma) com o DDL acima.
2. Implementar endpoint `POST /api/forms` com multer (Express) ou middleware equivalente; armazenar avatar em disk/S3 e criar `forms` + `form_dependentes`.
3. Criar seeds e scripts `npm run db:seed` para popular dados de exemplo.
4. Adicionar testes de integração que executem `POST /api/forms` com arquivos (use fixtures) e verifiquem gravação no DB.

---

Se quiser, eu posso gerar automaticamente:
- Migrations SQL/Prisma schema
- Um endpoint demo em Express (com multer) para `POST /api/forms` e um seed script
- Scripts para rodar migrations e seed localmente

Diga qual artefato prefere que eu gere primeiro e eu implemento (ex.: "Gerar migrations SQL" ou "Criar endpoint Express com upload").
