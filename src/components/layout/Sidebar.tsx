import { NavLink } from "@/components/NavLink";
import { 
  LogIn, 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Package, 
  PackageOpen,
  Search,
  Table,
  AlertCircle,
  Home,
  Zap
} from "lucide-react";

const navItems = [
  { to: "/", label: "Início", icon: Home },
  { to: "/login", label: "Login", icon: LogIn },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/usuarios", label: "Lista de Usuários", icon: Users },
  { to: "/usuario/novo", label: "Cadastro de Usuário", icon: UserPlus },
  { to: "/produtos", label: "Lista de Produtos", icon: Package },
  { to: "/produto/1", label: "Detalhes de Produto", icon: PackageOpen },
  { to: "/busca", label: "Autocomplete", icon: Search },
  { to: "/tabela", label: "Tabela Paginada", icon: Table },
  { to: "/modal", label: "Modal de Confirmação", icon: AlertCircle },
  { to: "/formularios", label: "Formulários", icon: PackageOpen },
  { to: "/form-completo", label: "Formulário Completo", icon: PackageOpen },
  { to: "/debug-form", label: "Debug Form", icon: AlertCircle },
  
  { to: "/casos-especiais", label: "Casos Especiais", icon: Zap },
];

export function Sidebar() {
  return (
    <aside 
      data-test="sidebar-navegacao"
      className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col"
    >
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-gradient">data-test</h1>
        <p className="text-xs text-muted-foreground mt-1">Treinamento E2E</p>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                data-test={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                activeClassName="bg-sidebar-accent text-primary font-medium"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="code-block text-xs">
          <span className="text-muted-foreground">Navegue pelas telas</span>
        </div>
      </div>
    </aside>
  );
}
