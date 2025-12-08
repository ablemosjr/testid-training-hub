import { MainLayout } from "@/components/layout/MainLayout";
import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const dataTestItems = [
  { name: "button-abrir-modal", description: "Botão que abre o modal" },
  { name: "modal-confirmacao", description: "Container do modal" },
  { name: "message-confirmacao", description: "Mensagem do modal" },
  { name: "button-confirmar", description: "Botão de confirmar ação" },
  { name: "button-cancelar", description: "Botão de cancelar" },
  { name: "modal-overlay", description: "Overlay/backdrop do modal" },
];

export default function ModalPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    toast.success("Ação confirmada com sucesso!");
    setIsOpen(false);
  };

  return (
    <MainLayout pageTitle="Modal de Confirmação" dataTestItems={dataTestItems}>
      <div className="max-w-xl mx-auto animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Modal de Confirmação</h1>
          <p className="text-muted-foreground mt-1">
            Exemplo de modal com ações de confirmar/cancelar
          </p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border text-center">
          <p className="text-muted-foreground mb-4">
            Clique no botão abaixo para abrir o modal de confirmação
          </p>
          <button
            data-test="button-abrir-modal"
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 rounded-lg bg-destructive text-destructive-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Excluir Item
          </button>
        </div>

        {/* Modal */}
        {isOpen && (
          <>
            {/* Overlay */}
            <div 
              data-test="modal-overlay"
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Modal Content */}
            <div 
              data-test="modal-confirmacao"
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 rounded-xl bg-card border border-border shadow-2xl z-50 animate-fade-in"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 p-1 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>

                <h2 className="text-xl font-bold mb-2">Confirmar Exclusão</h2>
                
                <p 
                  data-test="message-confirmacao"
                  className="text-muted-foreground mb-6"
                >
                  Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.
                </p>

                <div className="flex gap-3 w-full">
                  <button
                    data-test="button-cancelar"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    data-test="button-confirmar"
                    onClick={handleConfirm}
                    className="flex-1 py-3 rounded-lg bg-destructive text-destructive-foreground font-medium hover:opacity-90 transition-opacity"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Info */}
        <div className="mt-8 p-4 rounded-lg bg-card border border-border">
          <h3 className="font-medium mb-2">Como testar modais:</h3>
          <div className="code-block text-xs">
            <pre className="text-muted-foreground">
{`// Cypress
cy.get('[data-test="button-abrir-modal"]').click();
cy.get('[data-test="modal-confirmacao"]').should('be.visible');
cy.get('[data-test="message-confirmacao"]').should('contain', 'excluir');
cy.get('[data-test="button-confirmar"]').click();`}
            </pre>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
