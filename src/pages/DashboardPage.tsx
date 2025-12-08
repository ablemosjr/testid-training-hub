import { MainLayout } from "@/components/layout/MainLayout";
import { Users, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const dataTestItems = [
  { name: "page-dashboard", description: "Container principal do dashboard" },
  { name: "card-resumo-usuarios", description: "Card com total de usuários" },
  { name: "card-resumo-vendas", description: "Card com total de vendas" },
  { name: "card-resumo-crescimento", description: "Card com taxa de crescimento" },
  { name: "button-ir-para-relatorios", description: "Botão para ir aos relatórios" },
];

const stats = [
  {
    id: "usuarios",
    label: "Total de Usuários",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
    color: "primary",
  },
  {
    id: "vendas",
    label: "Vendas do Mês",
    value: "R$ 48.500",
    change: "+8.2%",
    icon: DollarSign,
    color: "success",
  },
  {
    id: "crescimento",
    label: "Taxa de Crescimento",
    value: "23.5%",
    change: "+4.1%",
    icon: TrendingUp,
    color: "accent",
  },
];

export default function DashboardPage() {
  return (
    <MainLayout pageTitle="Dashboard" dataTestItems={dataTestItems}>
      <div data-test="page-dashboard" className="max-w-3xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral dos principais indicadores
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              data-test={`card-resumo-${stat.id}`}
              className="p-6 rounded-xl bg-card border border-border card-hover animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  stat.color === "primary" ? "bg-highlight-muted" :
                  stat.color === "success" ? "bg-success/10" :
                  "bg-accent/10"
                }`}>
                  <stat.icon className={`w-5 h-5 ${
                    stat.color === "primary" ? "text-primary" :
                    stat.color === "success" ? "text-success" :
                    "text-accent"
                  }`} />
                </div>
                <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h2 className="font-semibold mb-4">Ações Rápidas</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/usuarios"
              data-test="button-ir-para-relatorios"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Ver Relatórios
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/usuario/novo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors"
            >
              Novo Usuário
            </Link>
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors"
            >
              Ver Produtos
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
