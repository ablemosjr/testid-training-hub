import { MainLayout } from "@/components/layout/MainLayout";
import { ShoppingCart, Package } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const dataTestItems = [
  { name: "page-detalhes-produto", description: "Container da página de detalhes" },
  { name: "image-produto", description: "Imagem do produto" },
  { name: "title-produto", description: "Título/nome do produto" },
  { name: "price-produto", description: "Preço do produto" },
  { name: "button-adicionar-carrinho", description: "Botão de adicionar ao carrinho" },
];

const mockProduct = {
  id: 1,
  nome: "Notebook Pro 15",
  preco: "R$ 4.999,00",
  descricao: "Notebook de alta performance com processador de última geração, 16GB de RAM e SSD de 512GB. Ideal para desenvolvedores e profissionais criativos.",
  specs: [
    "Processador Intel Core i7 12ª Gen",
    "16GB RAM DDR5",
    "SSD NVMe 512GB",
    "Tela 15.6\" Full HD IPS",
    "GPU NVIDIA RTX 3060",
  ],
};

export default function ProdutoDetalhePage() {
  const { id } = useParams();

  const handleAddToCart = () => {
    toast.success("Produto adicionado ao carrinho!");
  };

  return (
    <MainLayout pageTitle="Detalhes do Produto" dataTestItems={dataTestItems}>
      <div data-test="page-detalhes-produto" className="max-w-3xl mx-auto animate-fade-in">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div 
            data-test="image-produto"
            className="aspect-square rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center"
          >
            <Package className="w-24 h-24 text-muted-foreground" />
          </div>

          {/* Info */}
          <div>
            <h1 
              data-test="title-produto"
              className="text-3xl font-bold mb-2"
            >
              {mockProduct.nome}
            </h1>
            
            <p 
              data-test="price-produto"
              className="text-2xl font-bold text-success mb-4"
            >
              {mockProduct.preco}
            </p>

            <p className="text-muted-foreground mb-6">
              {mockProduct.descricao}
            </p>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Especificações:</h3>
              <ul className="space-y-2">
                {mockProduct.specs.map((spec, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <button
              data-test="button-adicionar-carrinho"
              onClick={handleAddToCart}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
