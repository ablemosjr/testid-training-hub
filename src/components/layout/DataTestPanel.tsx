import { Code2, Copy, Check } from "lucide-react";
import { useState } from "react";

interface DataTestItem {
  name: string;
  description: string;
}

interface DataTestPanelProps {
  title: string;
  items: DataTestItem[];
}

export function DataTestPanel({ title, items }: DataTestPanelProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(`[data-test="${text}"]`);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div 
      data-test="panel-data-test"
      className="fixed right-0 top-0 h-screen w-80 bg-card border-l border-border flex flex-col"
    >
      <div className="p-4 border-b border-border flex items-center gap-2">
        <Code2 className="w-5 h-5 text-primary" />
        <h2 className="font-semibold text-sm">{title}</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-xs text-muted-foreground mb-4">
          Atributos data-test usados nesta tela:
        </p>
        
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li 
              key={item.name}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-2">
                <button
                  onClick={() => copyToClipboard(item.name, index)}
                  className="flex-1 text-left p-2 rounded-md bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <code className="text-xs font-mono text-primary block">
                    data-test="{item.name}"
                  </code>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {item.description}
                  </span>
                </button>
                <button
                  onClick={() => copyToClipboard(item.name, index)}
                  className="p-2 rounded-md hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100"
                  title="Copiar seletor"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Uso no Cypress:</p>
          <code className="code-block block text-[10px] mt-2">
            cy.get('[data-test="..."]')
          </code>
        </div>
      </div>
    </div>
  );
}
