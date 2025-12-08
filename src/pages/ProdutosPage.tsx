import { MainLayout } from "@/components/layout/MainLayout";
import { Search, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const dataTestItems = [
  { name: "page-produtos", description: "Container da página de produtos" },
  { name: "input-busca-produto", description: "Campo de busca" },
  { name: "table-produtos", description: "Tabela de produtos" },
  { name: "produto-row-{id}", description: "Linha de produto específico" },
  { name: "button-editar-produto-{id}", description: "Botão editar produto" },
  { name: "button-excluir-produto-{id}", description: "Botão excluir produto" },
];

const mockProducts = [
  { id: 1, nome: "Notebook Pro", preco: "R$ 4.999,00", estoque: 15 },
  { id: 2, nome: "Mouse Wireless", preco: "R$ 149,90", estoque: 87 },
  { id: 3, nome: "Teclado Mecânico", preco: "R$ 349,00", estoque: 32 },
  { id: 4, nome: "Monitor 27\"", preco: "R$ 1.899,00", estoque: 8 },
  { id: 5, nome: "Headset Gamer", preco: "R$ 299,00", estoque: 45 },
];

export default function ProdutosPage() {
  const [busca, setBusca] = useState("");
  const [products, setProducts] = useState(mockProducts);

  const filteredProducts = products.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Produto excluído com sucesso!");
  };

  return (
    <MainLayout pageTitle="Lista de Produtos" dataTestItems={dataTestItems}>
      <div data-test="page-produtos" className="max-w-3xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Produtos</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie o catálogo de produtos
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            data-test="input-busca-produto"
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border overflow-hidden">
          <table data-test="table-produtos" className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Produto</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Preço</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Estoque</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((product) => (
                <tr 
                  key={product.id} 
                  data-test={`produto-row-${product.id}`}
                  className="bg-card hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium">{product.nome}</td>
                  <td className="px-4 py-3 text-sm text-success font-medium">{product.preco}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      product.estoque > 20 ? "bg-success/10 text-success" :
                      product.estoque > 10 ? "bg-warning/10 text-warning" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {product.estoque} un.
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/produto/${product.id}`}
                        data-test={`button-editar-produto-${product.id}`}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        data-test={`button-excluir-produto-${product.id}`}
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
