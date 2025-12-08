import { MainLayout } from "@/components/layout/MainLayout";
import { Search, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const dataTestItems = [
  { name: "page-usuarios", description: "Container da página de usuários" },
  { name: "input-busca-usuario", description: "Campo de busca" },
  { name: "table-usuarios", description: "Tabela de usuários" },
  { name: "user-row-{id}", description: "Linha de usuário específico" },
  { name: "button-editar-usuario-{id}", description: "Botão editar usuário" },
  { name: "button-excluir-usuario-{id}", description: "Botão excluir usuário" },
];

const mockUsers = [
  { id: 1, nome: "João Silva", email: "joao@email.com", tipo: "Admin" },
  { id: 2, nome: "Maria Santos", email: "maria@email.com", tipo: "Editor" },
  { id: 3, nome: "Pedro Costa", email: "pedro@email.com", tipo: "Viewer" },
  { id: 4, nome: "Ana Oliveira", email: "ana@email.com", tipo: "Editor" },
  { id: 5, nome: "Lucas Ferreira", email: "lucas@email.com", tipo: "Viewer" },
];

export default function UsuariosPage() {
  const [busca, setBusca] = useState("");
  const [users, setUsers] = useState(mockUsers);

  const filteredUsers = users.filter(
    (u) =>
      u.nome.toLowerCase().includes(busca.toLowerCase()) ||
      u.email.toLowerCase().includes(busca.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.success("Usuário excluído com sucesso!");
  };

  return (
    <MainLayout pageTitle="Lista de Usuários" dataTestItems={dataTestItems}>
      <div data-test="page-usuarios" className="max-w-3xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Usuários</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie os usuários da plataforma
            </p>
          </div>
          <Link
            to="/usuario/novo"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            + Novo Usuário
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            data-test="input-busca-usuario"
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome ou email..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border overflow-hidden">
          <table data-test="table-usuarios" className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Nome</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Email</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Tipo</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  data-test={`user-row-${user.id}`}
                  className="bg-card hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium">{user.nome}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      user.tipo === "Admin" ? "bg-accent/10 text-accent" :
                      user.tipo === "Editor" ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {user.tipo}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/usuario/${user.id}`}
                        data-test={`button-editar-usuario-${user.id}`}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        data-test={`button-excluir-usuario-${user.id}`}
                        onClick={() => handleDelete(user.id)}
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

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Nenhum usuário encontrado
          </div>
        )}
      </div>
    </MainLayout>
  );
}
