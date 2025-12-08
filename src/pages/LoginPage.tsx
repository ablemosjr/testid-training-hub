import { MainLayout } from "@/components/layout/MainLayout";
import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";

const dataTestItems = [
  { name: "page-login", description: "Container da página de login" },
  { name: "input-email", description: "Campo de email" },
  { name: "input-senha", description: "Campo de senha" },
  { name: "button-login", description: "Botão de submit do login" },
  { name: "link-esqueci-senha", description: "Link para recuperação" },
  { name: "alert-erro-login", description: "Mensagem de erro" },
  { name: "button-toggle-senha", description: "Botão para mostrar/ocultar senha" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    setTimeout(() => {
      if (email === "admin@teste.com" && senha === "123456") {
        toast.success("Login realizado com sucesso!");
        setErro("");
      } else {
        setErro("Email ou senha inválidos");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <MainLayout pageTitle="Tela de Login" dataTestItems={dataTestItems}>
      <div 
        data-test="page-login" 
        className="max-w-md mx-auto mt-12 animate-fade-in"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-highlight-muted flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Entrar na Plataforma</h1>
          <p className="text-muted-foreground mt-2">
            Use admin@teste.com / 123456 para testar
          </p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="p-6 rounded-xl bg-card border border-border space-y-5"
        >
          {erro && (
            <div 
              data-test="alert-erro-login"
              className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-destructive" />
              {erro}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              data-test="input-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Senha</label>
            <div className="relative">
              <input
                data-test="input-senha"
                type={showSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm pr-12"
              />
              <button
                type="button"
                data-test="button-toggle-senha"
                onClick={() => setShowSenha(!showSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showSenha ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            data-test="button-login"
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 glow-sm"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div className="text-center">
            <a
              data-test="link-esqueci-senha"
              href="#"
              className="text-sm text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Link de recuperação enviado!");
              }}
            >
              Esqueci minha senha
            </a>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
