import { MainLayout } from "@/components/layout/MainLayout";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const dataTestItems = [
  { name: "form-usuario", description: "Formulário de cadastro/edição" },
  { name: "input-nome", description: "Campo de nome" },
  { name: "input-email", description: "Campo de email" },
  { name: "select-tipo-usuario", description: "Dropdown de tipo de usuário" },
  { name: "button-salvar", description: "Botão salvar" },
  { name: "button-cancelar", description: "Botão cancelar" },
];

export default function UsuarioFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id && id !== "novo";

  const [formData, setFormData] = useState({
    nome: isEditing ? "João Silva" : "",
    email: isEditing ? "joao@email.com" : "",
    tipo: isEditing ? "admin" : "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isEditing ? "Usuário atualizado!" : "Usuário cadastrado!");
    navigate("/usuarios");
  };

  return (
    <MainLayout 
      pageTitle={isEditing ? "Editar Usuário" : "Novo Usuário"} 
      dataTestItems={dataTestItems}
    >
      <div className="max-w-xl mx-auto animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {isEditing ? "Editar Usuário" : "Novo Usuário"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? "Atualize os dados do usuário" : "Preencha os dados do novo usuário"}
          </p>
        </div>

        <form 
          data-test="form-usuario"
          onSubmit={handleSubmit}
          className="p-6 rounded-xl bg-card border border-border space-y-5"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Nome Completo</label>
            <input
              data-test="input-nome"
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Nome do usuário"
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              data-test="input-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@exemplo.com"
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tipo de Usuário</label>
            <select
              data-test="select-tipo-usuario"
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
            >
              <option value="">Selecione o tipo</option>
              <option value="admin">Administrador</option>
              <option value="editor">Editor</option>
              <option value="viewer">Visualizador</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              data-test="button-cancelar"
              onClick={() => navigate("/usuarios")}
              className="flex-1 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              data-test="button-salvar"
              className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-sm"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
