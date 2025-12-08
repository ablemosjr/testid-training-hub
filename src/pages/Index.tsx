import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowRight, CheckCircle2, Code2, Shield, Zap, Book } from "lucide-react";
import { Link } from "react-router-dom";

const dataTestItems = [
  { name: "page-home", description: "Container principal da página inicial" },
  { name: "hero-titulo", description: "Título principal do hero" },
  { name: "hero-subtitulo", description: "Subtítulo do hero" },
  { name: "button-comecar", description: "Botão para iniciar treinamento" },
  { name: "card-beneficio-estabilidade", description: "Card de benefício" },
  { name: "card-beneficio-semantica", description: "Card de benefício" },
  { name: "card-beneficio-performance", description: "Card de benefício" },
];

const benefits = [
  {
    icon: Shield,
    title: "Estabilidade",
    description: "Testes não quebram com mudanças de CSS ou texto",
    id: "estabilidade",
  },
  {
    icon: Code2,
    title: "Semântica",
    description: "Identifica claramente o propósito do elemento",
    id: "semantica",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Removido automaticamente em produção",
    id: "performance",
  },
];

const Index = () => {
  return (
    <MainLayout pageTitle="Página Inicial" dataTestItems={dataTestItems}>
      <div data-test="page-home" className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <section className="text-center py-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight-muted text-primary text-sm font-medium mb-6">
            <Book className="w-4 h-4" />
            Treinamento Interativo
          </div>
          
          <h1 
            data-test="hero-titulo"
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Domine os atributos{" "}
            <span className="text-gradient">data-test</span>
          </h1>
          
          <p 
            data-test="hero-subtitulo"
            className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto"
          >
            Aprenda a criar seletores estáveis e semânticos para automação de testes E2E com exemplos práticos.
          </p>

          <Link 
            to="/login"
            data-test="button-comecar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow"
          >
            Começar Treinamento
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Benefits */}
        <section className="py-12">
          <h2 className="text-xl font-semibold text-center mb-8">Por que usar data-test?</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.id}
                data-test={`card-beneficio-${benefit.id}`}
                className="p-6 rounded-xl bg-card border border-border card-hover animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-highlight-muted flex items-center justify-center mb-4">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Format */}
        <section className="py-12">
          <h2 className="text-xl font-semibold mb-6">Formato Base</h2>
          
          <div className="code-block">
            <code className="text-primary">
              data-test="<span className="text-accent">tipo</span>-<span className="text-success">nome</span>[-<span className="text-warning">detalhe-opcional</span>]"
            </code>
          </div>

          <div className="mt-6 space-y-3">
            {[
              "kebab-case: sempre minúsculas com hífen",
              "Sem acentos: botao-salvar ✓",
              "Específico: evite nomes genéricos",
              "Descritivo: indica a função do elemento",
            ].map((rule, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 text-sm animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 text-center">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-highlight-muted/50 to-accent/10 border border-border">
            <h2 className="text-2xl font-bold mb-2">Pronto para praticar?</h2>
            <p className="text-muted-foreground mb-6">
              Explore as telas de demonstração no menu lateral.
            </p>
            <Link 
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
            >
              Ir para Login Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
