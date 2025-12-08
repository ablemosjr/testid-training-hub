import { MainLayout } from "@/components/layout/MainLayout";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const dataTestItems = [
  { name: "table-itens", description: "Tabela de itens" },
  { name: "pagination-prev", description: "Botão página anterior" },
  { name: "pagination-next", description: "Botão próxima página" },
  { name: "item-row-{id}", description: "Linha de item específico" },
  { name: "pagination-info", description: "Info de paginação" },
];

const allItems = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  nome: `Item ${i + 1}`,
  categoria: ["Eletrônicos", "Roupas", "Livros", "Casa"][i % 4],
  data: new Date(2024, 0, i + 1).toLocaleDateString("pt-BR"),
}));

const ITEMS_PER_PAGE = 5;

export default function TabelaPaginadaPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = allItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <MainLayout pageTitle="Tabela Paginada" dataTestItems={dataTestItems}>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Tabela com Paginação</h1>
          <p className="text-muted-foreground mt-1">
            Navegue entre páginas de dados
          </p>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border overflow-hidden">
          <table data-test="table-itens" className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">ID</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Nome</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Categoria</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentItems.map((item) => (
                <tr 
                  key={item.id} 
                  data-test={`item-row-${item.id}`}
                  className="bg-card hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-mono text-muted-foreground">#{item.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{item.nome}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded bg-secondary font-medium">
                      {item.categoria}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{item.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p data-test="pagination-info" className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, allItems.length)} de {allItems.length} itens
          </p>
          
          <div className="flex items-center gap-2">
            <button
              data-test="pagination-prev"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === i + 1
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              data-test="pagination-next"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
