**Visão Geral**

Este repositório contém uma aplicação de exemplo (Vite + React + TypeScript) projetada como um "training hub" para ensinar o uso de atributos `data-test` em testes E2E. A aplicação fornece demonstrações de telas comuns (login, dashboard, listas, detalhes, tabela paginada, autocomplete, modais, etc.) e um painel que lista os seletores `data-test` de cada página.

**Stack / Tecnologias**

- **Bundler:** `Vite`
- **Linguagem:** `TypeScript` + `React` (v18)
- **Estilização:** `Tailwind CSS` (+ animações utilitárias)
- **Componentes / UI:** `shadcn` / Radix UI primitives (via dependências do projeto)
- **Rotas:** `react-router-dom`
- **Data fetching / state:** `@tanstack/react-query`
- **Outros:** `react-hook-form`, `zod`, `sonner` (toasts), `lucide-react` (ícones)

**Objetivo do sistema**

Servir como uma sandbox / material didático para demonstrar como nomear e usar atributos `data-test` de forma semântica e estável para testes automatizados (E2E), sem depender de classes ou texto visível.

**Como rodar (desenvolvimento)**

No PowerShell, a partir da raiz do projeto (`testid-training-hub`):

```powershell
Set-Location -LiteralPath 'C:\Users\priig\OneDrive\Área de Trabalho\MIND\data-test\testid-training-hub'
npm install
npm run dev
```

Scripts úteis (em `package.json`):
- `npm run dev` : inicia o servidor de desenvolvimento (Vite)
- `npm run build` : gera build de produção
- `npm run preview` : visualiza o build gerado localmente

**Estrutura principal do projeto**

- `index.html` : ponto de entrada HTML
- `package.json` : dependências e scripts
- `vite.config.ts` : configuração do Vite
- `src/main.tsx` : bootstrap da aplicação
- `src/App.tsx` : provedor de rotas e providers (QueryClient, Tooltips, Toasters)
- `src/pages/*` : páginas principais (Index, LoginPage, DashboardPage, Produtos, Usuários, etc.)
- `src/components/*` : componentes reutilizáveis (layout, painel de `data-test`, NavLink, UI wrappers)
- `src/lib/*` : utilitários / helpers (se presentes)

Exemplo de arquivos importantes:
- `src/components/layout/MainLayout.tsx` : layout principal com `Sidebar` e `DataTestPanel`.
- `src/components/layout/Sidebar.tsx` : navegação lateral com links para as demos.
- `src/pages/Index.tsx` : página inicial com exemplos de `data-test` e explicações.
- `src/pages/LoginPage.tsx` : página de login demo (usa credenciais `admin@teste.com` / `123456`).

**Principais páginas e o que demonstram**

- `Index` : introdução ao formato `data-test` e benefícios. Exibe exemplos de `data-test` em hero, botões e cards.
- `LoginPage` : formulário com inputs e validação mínima; mostra `data-test` em campo email, senha, botão e alertas.
- `DashboardPage` / `UsuariosPage` / `ProdutosPage` : exemplos de telas de listagem, paginação e detalhe (úteis para treinar seletores em tabelas e cards).
- `AutocompletePage`, `TabelaPaginadaPage`, `ModalPage`, `CasosEspeciaisPage` : casos específicos para testar seletores em comportamentos JS (autocomplete, modais, tabelas paginadas, etc.).

**Convenções `data-test` adotadas**

O projeto usa um formato consistente para `data-test` que facilita identificar elementos em testes E2E:

Formato base:
```
data-test="tipo-nome[-detalhe-opcional]"
```

Regras comuns observadas no código:
- `kebab-case` (minúsculas com hífen)
- sem acentos
- específico e descritivo (evitar nomes genéricos)

Exemplos encontrados:
- `data-test="page-login"`
- `data-test="input-email"`
- `data-test="button-login"`
- `data-test="card-beneficio-performance"`

Essas convenções ajudam a criar seletores resilientes que não quebram com mudanças de CSS ou de texto.

**Providers e infraestrutura do App**

- `QueryClientProvider` (react-query) : cache de requisições e estado remoto
- `TooltipProvider`, `Toaster` e `Sonner` : UI para tooltips e notificações
- `BrowserRouter` / `Routes` : roteamento das páginas

**Build e Deploy**

1. Gerar build de produção:

```powershell
npm run build
```

2. Servir a build localmente para pré-visualizar:

```powershell
npm run preview
```

O projeto é compatível com hosts estáticos modernos (Vercel, Netlify, GitHub Pages se configurado), já que gera uma saída estática via Vite.

**Testes e qualidade**

Não há testes automatizados (unit / e2e) incluídos neste repositório por padrão. Recomendações rápidas:
- Adicionar testes E2E com Playwright ou Cypress focando nos `data-test` como seletores.
- Adicionar lint/typecheck CI via `npm run lint` e `tsc --noEmit`.

**Sugestões / Próximos passos**

- Incluir um conjunto de testes E2E (Playwright) demonstrando seletores `data-test` nas páginas principais.
- Adicionar um script `npm run test:e2e` e exemplos de testes no diretório `tests/e2e`.
- Documentar as regras de naming (ex.: um `CONTRIBUTING.md` com convenções `data-test`).

**Arquivo para referência rápida**

- Leia a `README.md` (base do projeto) e este `SISTEMA.md` para uma visão rápida.

---

Se quiser, eu posso:
- gerar um `CONTRIBUTING.md` com as convenções `data-test`;
- adicionar um exemplo básico de teste E2E com Playwright;
- rodar `npm install` e `npm run dev` aqui no workspace.
