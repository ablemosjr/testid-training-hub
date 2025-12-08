import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import UsuariosPage from "./pages/UsuariosPage";
import UsuarioFormPage from "./pages/UsuarioFormPage";
import ProdutosPage from "./pages/ProdutosPage";
import ProdutoDetalhePage from "./pages/ProdutoDetalhePage";
import AutocompletePage from "./pages/AutocompletePage";
import TabelaPaginadaPage from "./pages/TabelaPaginadaPage";
import ModalPage from "./pages/ModalPage";
import CasosEspeciaisPage from "./pages/CasosEspeciaisPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/usuario/:id" element={<UsuarioFormPage />} />
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/produto/:id" element={<ProdutoDetalhePage />} />
          <Route path="/busca" element={<AutocompletePage />} />
          <Route path="/tabela" element={<TabelaPaginadaPage />} />
          <Route path="/modal" element={<ModalPage />} />
          <Route path="/casos-especiais" element={<CasosEspeciaisPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
