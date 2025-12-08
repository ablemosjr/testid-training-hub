import { MainLayout } from "@/components/layout/MainLayout";

const dataTestItems = [
  { name: "page-campos-problematicos", description: "Container da página de campos problemáticos" },
  { name: "table-campos-problematicos", description: "Tabela com resumo dos campos problemáticos" },
];

export default function CamposProblematicosPage() {
  const rows = [
    { tipo: "Muitos selects", problema: "duplicidade", resolucao: "adicionar contexto" },
    { tipo: "Inputs repetidos", problema: "ambiguidade", resolucao: "escopo ou índice" },
    { tipo: "Campos dinâmicos", problema: "DOM se recria", resolucao: "ID estável ou index" },
    { tipo: "Autocomplete", problema: "opções sem ID", resolucao: "adicionar identificador" },
    { tipo: "Steps/tabs", problema: "elementos iguais em várias telas", resolucao: "nomear por contexto" },
    { tipo: "Botões iguais", problema: "ações diferentes", resolucao: "nomes específicos" },
  ];

  return (
    <MainLayout pageTitle="Campos Problemáticos em Formulários Grandes" dataTestItems={dataTestItems}>
      <div data-test="page-campos-problematicos" className="max-w-4xl mx-auto animate-fade-in">
        <section className="py-8">
          <h1 className="text-2xl font-bold mb-4">Resumo dos Campos Problemáticos em Formulários Grandes</h1>
          <p className="text-sm text-muted-foreground mb-6">Tabela com tipos de campo, problemas comuns e recomendações de resolução.</p>

          <div data-test="table-campos-problematicos" className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-muted/10">
                <tr>
                  <th className="px-4 py-3 font-medium">Tipo de Campo</th>
                  <th className="px-4 py-3 font-medium">Problema</th>
                  <th className="px-4 py-3 font-medium">Como resolver</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-3">{r.tipo}</td>
                    <td className="px-4 py-3">{r.problema}</td>
                    <td className="px-4 py-3">{r.resolucao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
