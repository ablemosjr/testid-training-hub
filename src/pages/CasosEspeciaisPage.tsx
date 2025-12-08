import { MainLayout } from "@/components/layout/MainLayout";
import { useState } from "react";
import { ChevronDown, Check, AlertTriangle, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dataTestItems = [
  { name: "section-inputs-lib", description: "Seção de inputs de libs" },
  { name: "wrapper-input-cpf", description: "Wrapper do input mascarado" },
  { name: "input-cpf", description: "Input real com máscara de CPF" },
  { name: "wrapper-input-telefone", description: "Wrapper do input telefone" },
  { name: "input-telefone", description: "Input real com máscara de telefone" },
  { name: "section-campos-dinamicos", description: "Seção de campos dinâmicos" },
  { name: "select-tipo-pessoa", description: "Select que controla campos" },
  { name: "campo-cnpj", description: "Campo CNPJ (aparece se PJ)" },
  { name: "campo-cpf-pf", description: "Campo CPF (aparece se PF)" },
  { name: "section-select-customizado", description: "Seção de select customizado" },
  { name: "select-estado", description: "Trigger do select customizado" },
  { name: "select-option-sp", description: "Opção São Paulo" },
  { name: "select-option-rj", description: "Opção Rio de Janeiro" },
  { name: "select-option-mg", description: "Opção Minas Gerais" },
  { name: "select-option-rs", description: "Opção Rio Grande do Sul" },
  { name: "section-shadow-dom", description: "Seção sobre Shadow DOM" },
];

// Simula um input com máscara (wrapper pattern)
function MaskedInput({ 
  label, 
  mask, 
  wrapperTestId, 
  inputTestId,
  placeholder 
}: { 
  label: string;
  mask: string;
  wrapperTestId: string;
  inputTestId: string;
  placeholder: string;
}) {
  const [value, setValue] = useState("");

  const applyMask = (val: string) => {
    const numbers = val.replace(/\D/g, "");
    if (mask === "cpf") {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .slice(0, 14);
    }
    if (mask === "telefone") {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
    }
    return val;
  };

  return (
    <div data-test={wrapperTestId} className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <div className="relative">
        {/* Este é o input REAL onde colocamos o data-test */}
        <input
          data-test={inputTestId}
          type="text"
          value={value}
          onChange={(e) => setValue(applyMask(e.target.value))}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-mono"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        ⚠️ data-test no input real, não no wrapper decorativo
      </p>
    </div>
  );
}

export default function CasosEspeciaisPage() {
  const [tipoPessoa, setTipoPessoa] = useState<string>("");
  const [estado, setEstado] = useState<string>("");

  return (
    <MainLayout pageTitle="Casos Especiais" dataTestItems={dataTestItems}>
      <div className="max-w-3xl mx-auto animate-fade-in space-y-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Casos Especiais</h1>
          <p className="text-muted-foreground mt-1">
            Cenários problemáticos e como resolver com data-test
          </p>
        </div>

        {/* INPUTS DE LIBS / MASCARADOS */}
        <section data-test="section-inputs-lib" className="p-6 rounded-xl bg-card border border-border space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-warning" />
            </div>
            <div>
              <h2 className="font-semibold">Inputs de Libs / Mascarados</h2>
              <p className="text-xs text-muted-foreground">DOM diferente do esperado, campo invisível</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-warning/5 border border-warning/20 text-sm">
            <p className="text-muted-foreground">
              <strong className="text-foreground">Problema:</strong> Libs como IMask, react-input-mask criam estruturas DOM complexas. 
              O input visível pode não ser o elemento real do formulário.
            </p>
            <p className="mt-2 text-muted-foreground">
              <strong className="text-foreground">Solução:</strong> Sempre adicione data-test no input real que recebe o valor, 
              e opcionalmente um data-test no wrapper para contexto.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <MaskedInput
              label="CPF"
              mask="cpf"
              wrapperTestId="wrapper-input-cpf"
              inputTestId="input-cpf"
              placeholder="000.000.000-00"
            />
            <MaskedInput
              label="Telefone"
              mask="telefone"
              wrapperTestId="wrapper-input-telefone"
              inputTestId="input-telefone"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="code-block text-xs">
            <pre className="text-muted-foreground">
{`// Cypress - Acessando input mascarado
cy.get('[data-test="input-cpf"]')
  .type('12345678900')
  .should('have.value', '123.456.789-00');`}
            </pre>
          </div>
        </section>

        {/* CAMPOS DINÂMICOS */}
        <section data-test="section-campos-dinamicos" className="p-6 rounded-xl bg-card border border-border space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <ChevronDown className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h2 className="font-semibold">Campos Dinâmicos</h2>
              <p className="text-xs text-muted-foreground">Campos que aparecem/desaparecem baseado em condição</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 text-sm">
            <p className="text-muted-foreground">
              <strong className="text-foreground">Problema:</strong> Campos condicionais podem não existir no DOM quando o teste roda.
            </p>
            <p className="mt-2 text-muted-foreground">
              <strong className="text-foreground">Solução:</strong> Sempre adicione data-test no componente base. 
              O teste deve primeiro interagir com o controle que revela o campo.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Pessoa</label>
              <select
                data-test="select-tipo-pessoa"
                value={tipoPessoa}
                onChange={(e) => setTipoPessoa(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
              >
                <option value="">Selecione...</option>
                <option value="pf">Pessoa Física</option>
                <option value="pj">Pessoa Jurídica</option>
              </select>
            </div>

            {/* Campo condicional - PF */}
            {tipoPessoa === "pf" && (
              <div data-test="campo-cpf-pf" className="animate-fade-in">
                <label className="block text-sm font-medium mb-2">
                  CPF <span className="text-xs text-success">(campo dinâmico)</span>
                </label>
                <input
                  type="text"
                  placeholder="Digite o CPF"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-success/50 focus:border-success focus:ring-1 focus:ring-success outline-none transition-all text-sm"
                />
              </div>
            )}

            {/* Campo condicional - PJ */}
            {tipoPessoa === "pj" && (
              <div data-test="campo-cnpj" className="animate-fade-in">
                <label className="block text-sm font-medium mb-2">
                  CNPJ <span className="text-xs text-success">(campo dinâmico)</span>
                </label>
                <input
                  type="text"
                  placeholder="Digite o CNPJ"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-success/50 focus:border-success focus:ring-1 focus:ring-success outline-none transition-all text-sm"
                />
              </div>
            )}
          </div>

          <div className="code-block text-xs">
            <pre className="text-muted-foreground">
{`// Cypress - Campos dinâmicos
cy.get('[data-test="select-tipo-pessoa"]').select('pj');
cy.get('[data-test="campo-cnpj"]').should('be.visible');
cy.get('[data-test="campo-cpf-pf"]').should('not.exist');`}
            </pre>
          </div>
        </section>

        {/* SELECT CUSTOMIZADO */}
        <section data-test="section-select-customizado" className="p-6 rounded-xl bg-card border border-border space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Select Customizado (Radix)</h2>
              <p className="text-xs text-muted-foreground">Opções renderizadas fora do DOM principal</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-sm">
            <p className="text-muted-foreground">
              <strong className="text-foreground">Problema:</strong> Selects customizados (Radix, Headless UI) renderizam opções em portals, 
              fora da hierarquia DOM normal.
            </p>
            <p className="mt-2 text-muted-foreground">
              <strong className="text-foreground">Solução:</strong> Adicione data-test no trigger E em cada opção individualmente.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Estado</label>
            <Select value={estado} onValueChange={setEstado}>
              <SelectTrigger data-test="select-estado" className="w-full bg-secondary">
                <SelectValue placeholder="Selecione um estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem data-test="select-option-sp" value="sp">
                  São Paulo
                </SelectItem>
                <SelectItem data-test="select-option-rj" value="rj">
                  Rio de Janeiro
                </SelectItem>
                <SelectItem data-test="select-option-mg" value="mg">
                  Minas Gerais
                </SelectItem>
                <SelectItem data-test="select-option-rs" value="rs">
                  Rio Grande do Sul
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {estado && (
            <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-sm">
              Selecionado: <strong className="text-success">{estado.toUpperCase()}</strong>
            </div>
          )}

          <div className="code-block text-xs">
            <pre className="text-muted-foreground">
{`// Cypress - Select customizado (Radix)
cy.get('[data-test="select-estado"]').click();
cy.get('[data-test="select-option-sp"]').click();

// Verificar valor selecionado
cy.get('[data-test="select-estado"]')
  .should('contain.text', 'São Paulo');`}
            </pre>
          </div>
        </section>

        {/* SHADOW DOM */}
        <section data-test="section-shadow-dom" className="p-6 rounded-xl bg-card border border-border space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-semibold">Shadow DOM</h2>
              <p className="text-xs text-muted-foreground">Componentes encapsulados que não são acessíveis diretamente</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border border-border text-sm">
            <p className="text-muted-foreground">
              <strong className="text-foreground">Problema:</strong> Web Components com Shadow DOM encapsulam seus elementos internos, 
              tornando-os inacessíveis por seletores CSS normais.
            </p>
            <p className="mt-2 text-muted-foreground">
              <strong className="text-foreground">Solução:</strong> Use o comando .shadow() do Cypress para penetrar o Shadow DOM.
            </p>
          </div>

          <div className="code-block text-xs">
            <pre className="text-muted-foreground">
{`// Cypress - Acessando Shadow DOM
cy.get('my-web-component')
  .shadow()
  .find('[data-test="botao-interno"]')
  .click();

// Com múltiplos níveis de Shadow DOM
cy.get('outer-component')
  .shadow()
  .find('inner-component')
  .shadow()
  .find('[data-test="elemento-profundo"]');`}
            </pre>
          </div>

          <div className="p-4 rounded-lg bg-warning/5 border border-warning/20 text-sm">
            <p className="text-warning font-medium">⚠️ Atenção</p>
            <p className="text-muted-foreground mt-1">
              Shadow DOM é menos comum em aplicações React/Vue, mas aparece em Web Components nativos 
              e algumas libs de UI. Sempre verifique se o componente usa Shadow DOM antes de tentar acessá-lo.
            </p>
          </div>
        </section>

        {/* RESUMO */}
        <section className="p-6 rounded-xl bg-highlight-muted border border-primary/20">
          <h3 className="font-semibold mb-4">📋 Resumo - Checklist de Casos Especiais</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-medium">Componente</th>
                  <th className="text-left py-2 pr-4 font-medium">Problema</th>
                  <th className="text-left py-2 font-medium">Solução</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4">Inputs de libs</td>
                  <td className="py-2 pr-4">DOM diferente</td>
                  <td className="py-2">data-test no wrapper</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4">Campos dinâmicos</td>
                  <td className="py-2 pr-4">Desaparecem/duplicam</td>
                  <td className="py-2">data-test no componente base</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4">Listas</td>
                  <td className="py-2 pr-4">IDs repetidos</td>
                  <td className="py-2">incluir ID no data-test</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4">Botões iguais</td>
                  <td className="py-2 pr-4">Ambiguidade</td>
                  <td className="py-2">adicionar id dinâmico</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4">Inputs mascarados</td>
                  <td className="py-2 pr-4">Campo invisível</td>
                  <td className="py-2">data-test no input real</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4">Selects customizados</td>
                  <td className="py-2 pr-4">Opções fora do DOM</td>
                  <td className="py-2">data-test nas opções</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4">Shadow DOM</td>
                  <td className="py-2 pr-4">Não acessa direto</td>
                  <td className="py-2">usar .shadow() no teste</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Autocomplete</td>
                  <td className="py-2 pr-4">Timing</td>
                  <td className="py-2">loading com data-test</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
