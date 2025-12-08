import { MainLayout } from "@/components/layout/MainLayout";

const dataTestItems = [
  { name: "page-formularios-exemplo", description: "Container da página de formulários" },
  { name: "form-cadastro-completo", description: "Formulário de exemplo com vários campos" },
  { name: "select-endereco-entrega-estado", description: "Select de estado (endereço de entrega)" },
  { name: "select-endereco-cobranca-estado", description: "Select de estado (endereço de cobrança)" },
  { name: "select-endereco-adicional-estado-0", description: "Select de estado adicional (índice 0)" },
  { name: "select-endereco-adicional-estado-1", description: "Select de estado adicional (índice 1)" },
  { name: "input-contato-whatsapp", description: "Campo de contato - WhatsApp" },
  { name: "input-contato-telefone-comercial", description: "Campo de contato - telefone comercial" },
  { name: "input-dependente-nome-0", description: "Nome do dependente (input-dependente-nome-{index})" },
  { name: "input-dependente-nome-1", description: "Nome do dependente (input-dependente-nome-{index})" },
  { name: "input-dependente-idade-0", description: "Idade do dependente (input-dependente-idade-{index})" },
  { name: "input-dependente-idade-1", description: "Idade do dependente (input-dependente-idade-{index})" },
  { name: "button-salvar-rascunho", description: "Botão para salvar rascunho" },
  { name: "button-salvar-definitivo", description: "Botão para salvar definitivo" },
  { name: "autocomplete-opcao-0", description: "Opção de autocomplete (autocomplete-opcao-{id})" },
  { name: "autocomplete-opcao-1", description: "Opção de autocomplete (autocomplete-opcao-{id})" },
  { name: "input-email-step-1", description: "Campo de email no step 1" },
  { name: "input-email-confirmacao-step-2", description: "Campo de confirmação de email no step 2" },
];

export default function FormulariosPage() {
  return (
    <MainLayout pageTitle="Formulários — Exemplos" dataTestItems={dataTestItems}>
      <div data-test="page-formularios-exemplo" className="max-w-4xl mx-auto animate-fade-in p-6">
        <h1 className="text-2xl font-bold mb-4">Formulários — Campos com `data-test`</h1>

        <form data-test="form-cadastro-completo" className="space-y-6">
          <section className="p-4 rounded-lg border border-border bg-card">
            <h2 className="font-semibold mb-2">Endereços com selects de estado</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Endereço de entrega</label>
                <div data-test="endereco-entrega" className="flex gap-2">
                  <select data-test="select-endereco-entrega-estado" className="w-full px-3 py-2 rounded border bg-secondary">
                    <option value="">-- Estado --</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Endereço de cobrança</label>
                <div data-test="endereco-cobranca" className="flex gap-2">
                  <select data-test="select-endereco-cobranca-estado" className="w-full px-3 py-2 rounded border bg-secondary">
                    <option value="">-- Estado --</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-muted-foreground">Exemplo por índice (quando inevitável):</p>
              <div className="flex gap-2 mt-2">
                  <select data-test="select-endereco-adicional-estado-0" className="px-3 py-2 rounded border bg-secondary">
                  <option value="">-- Estado A --</option>
                </select>
                <select data-test="select-endereco-adicional-estado-1" className="px-3 py-2 rounded border bg-secondary">
                  <option value="">-- Estado B --</option>
                </select>
              </div>
            </div>
          </section>

          <section className="p-4 rounded-lg border border-border bg-card">
            <h2 className="font-semibold mb-2">Telefones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">WhatsApp</label>
                <input data-test="input-contato-whatsapp" className="w-full px-3 py-2 rounded border bg-secondary" />
              </div>
              <div>
                <label className="block text-sm mb-1">Comercial</label>
                <input data-test="input-contato-telefone-comercial" className="w-full px-3 py-2 rounded border bg-secondary" />
              </div>
            </div>
          </section>

          <section className="p-4 rounded-lg border border-border bg-card">
            <h2 className="font-semibold mb-2">Dependentes (repetição dinâmica)</h2>
            <div className="space-y-3">
              <div data-test="dependente-0" className="p-2 rounded bg-secondary/5 flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Dependente 1 - Nome</label>
                  <input data-test="input-dependente-nome-0" className="w-full px-3 py-2 rounded border bg-secondary" />
                </div>
                <div className="w-36">
                  <label className="block text-sm mb-1">Idade</label>
                  <input
                    data-test="input-dependente-idade-0"
                    type="number"
                    min={0}
                    step={1}
                    onInput={(e) => {
                      const t = e.currentTarget as HTMLInputElement;
                      if (t.value !== "" && Number(t.value) < 0) t.value = "0";
                    }}
                    className="w-full px-3 py-2 rounded border bg-secondary"
                  />
                </div>
                <button data-test="button-remover-dependente-0" type="button" className="px-3 py-2 rounded bg-destructive text-destructive-foreground">Remover</button>
              </div>

              <div data-test="dependente-1" className="p-2 rounded bg-secondary/5 flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Dependente 2 - Nome</label>
                  <input data-test="input-dependente-nome-1" className="w-full px-3 py-2 rounded border bg-secondary" />
                </div>
                <div className="w-36">
                  <label className="block text-sm mb-1">Idade</label>
                  <input
                    data-test="input-dependente-idade-1"
                    type="number"
                    min={0}
                    step={1}
                    onInput={(e) => {
                      const t = e.currentTarget as HTMLInputElement;
                      if (t.value !== "" && Number(t.value) < 0) t.value = "0";
                    }}
                    className="w-full px-3 py-2 rounded border bg-secondary"
                  />
                </div>
                <button data-test="button-remover-dependente-1" type="button" className="px-3 py-2 rounded bg-destructive text-destructive-foreground">Remover</button>
              </div>
            </div>
          </section>

          <section className="p-4 rounded-lg border border-border bg-card">
            <h2 className="font-semibold mb-2">Autocomplete (exemplo)</h2>
            <div className="relative">
              <input placeholder="Digite..." className="w-full px-3 py-2 rounded border bg-secondary" />
                <ul className="absolute left-0 right-0 mt-1 bg-card border rounded shadow-sm">
                <li data-test="autocomplete-opcao-0" className="px-3 py-2">Opção A</li>
                <li data-test="autocomplete-opcao-1" className="px-3 py-2">Opção B</li>
              </ul>
            </div>
          </section>

          <section className="p-4 rounded-lg border border-border bg-card">
            <h2 className="font-semibold mb-2">Steps / Tabs (campos com mesmo nome)</h2>
            <div className="space-y-3">
                <div data-test="step-1" className="p-2 rounded bg-secondary/5">
                <label className="block text-sm mb-1">Email (step 1)</label>
                <input data-test="input-email-step-1" className="w-full px-3 py-2 rounded border bg-secondary" />
              </div>
              <div data-test="step-2" className="p-2 rounded bg-secondary/5">
                <label className="block text-sm mb-1">Confirmação (step 2)</label>
                <input data-test="input-email-confirmacao-step-2" className="w-full px-3 py-2 rounded border bg-secondary" />
              </div>
            </div>
          </section>

          <div className="flex items-center gap-3">
            <button data-test="button-salvar-rascunho" type="button" className="px-4 py-2 rounded bg-secondary">Salvar rascunho</button>
            <button data-test="button-salvar-definitivo" type="submit" className="px-4 py-2 rounded bg-primary text-primary-foreground">Salvar definitivo</button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
