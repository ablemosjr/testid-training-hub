import { MainLayout } from "@/components/layout/MainLayout";
import { Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const dataTestItems = [
  { name: "input-busca", description: "Campo de busca com autocomplete" },
  { name: "autocomplete-option-{id}", description: "Opção do autocomplete" },
  { name: "loading-busca", description: "Indicador de carregamento" },
];

const mockSuggestions = [
  { id: 1, text: "React hooks tutorial" },
  { id: 2, text: "React testing library" },
  { id: 3, text: "React router dom" },
  { id: 4, text: "React query" },
  { id: 5, text: "React native" },
  { id: 6, text: "Redux toolkit" },
  { id: 7, text: "Tailwind CSS" },
  { id: 8, text: "TypeScript basics" },
];

export default function AutocompletePage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof mockSuggestions>([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const filtered = mockSuggestions.filter((s) =>
          s.text.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered);
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (text: string) => {
    setSelectedValue(text);
    setQuery(text);
    setSuggestions([]);
  };

  return (
    <MainLayout pageTitle="Autocomplete / Busca" dataTestItems={dataTestItems}>
      <div className="max-w-xl mx-auto animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Busca Avançada</h1>
          <p className="text-muted-foreground mt-1">
            Autocomplete com sugestões dinâmicas
          </p>
        </div>

        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              data-test="input-busca"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite para buscar..."
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
            />
            {isLoading && (
              <div data-test="loading-busca" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              </div>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-card border border-border shadow-xl overflow-hidden z-10">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  data-test={`autocomplete-option-${suggestion.id}`}
                  onClick={() => handleSelect(suggestion.text)}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-secondary transition-colors flex items-center gap-3"
                >
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <span>{suggestion.text}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedValue && (
          <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/20">
            <p className="text-sm">
              <span className="text-muted-foreground">Valor selecionado: </span>
              <span className="font-medium text-success">{selectedValue}</span>
            </p>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-4 rounded-lg bg-card border border-border">
          <h3 className="font-medium mb-2">Como usar nos testes:</h3>
          <div className="code-block text-xs">
            <pre className="text-muted-foreground">
{`// Cypress
cy.get('[data-test="input-busca"]').type('react');
cy.get('[data-test="loading-busca"]').should('exist');
cy.get('[data-test="autocomplete-option-1"]').click();`}
            </pre>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
