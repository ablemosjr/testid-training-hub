import { MainLayout } from "@/components/layout/MainLayout";
import { useState } from "react";

export default function DebugFormPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState("200");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [breakOnError, setBreakOnError] = useState(false);

  const urlForMode = (m: string) => {
    switch (m) {
      case "200":
        return "https://httpstat.us/200?sleep=500"; // success
      case "400":
        return "https://httpstat.us/400"; // bad request
      case "500":
        return "https://httpstat.us/500"; // server error
      case "slow":
        return "https://httpstat.us/200?sleep=10000"; // slow response
      default:
        return "https://httpstat.us/200";
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOutput(null);
    setLoading(true);
    const url = urlForMode(mode);

    // set a 3s timeout for fetch
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const text = await res.text();
      const info = `status:${res.status}\nok:${res.ok}\nbody:${text.slice(0, 200)}`;
      setOutput(info);

      if (!res.ok) {
        // simulate handling error
        throw new Error(`Request failed with status ${res.status}`);
      }
    } catch (err: any) {
      clearTimeout(timeout);
      const errMsg = err?.name === 'AbortError' ? 'Request aborted (timeout)' : err?.message || String(err);
      setOutput(`ERROR: ${errMsg}`);
      if (breakOnError) {
        // trigger debugger to allow breakpoint inspection (DevTools/VS Code will stop here if attached)
        // eslint-disable-next-line no-debugger
        debugger;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout pageTitle="Debug Form" dataTestItems={[{ name: "page-debug-form", description: "Formulário para debug de requests" }] }>
      <div data-test="page-debug-form" className="max-w-3xl mx-auto animate-fade-in">
        <h2 className="text-xl font-semibold mb-4">Formulário de Debug</h2>
        <form data-test="form-debug" onSubmit={handleSubmit} className="p-4 bg-card rounded space-y-4 border border-border">
          <div>
            <label className="block text-sm mb-1">Nome</label>
            <input data-test="input-debug-nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full px-3 py-2 rounded bg-secondary border border-border" />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input data-test="input-debug-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded bg-secondary border border-border" />
          </div>

          <div>
            <label className="block text-sm mb-1">Simular resposta</label>
            <select data-test="select-debug-mode" value={mode} onChange={(e) => setMode(e.target.value)} className="w-full px-3 py-2 rounded bg-secondary border border-border">
              <option value="200">200 - OK (rápido)</option>
              <option value="400">400 - Bad Request</option>
              <option value="500">500 - Server Error</option>
              <option value="slow">200 - Lento (timeout possível)</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              <input data-test="checkbox-debug-break" type="checkbox" checked={breakOnError} onChange={(e) => setBreakOnError(e.target.checked)} />
              <span className="text-sm">Parar (debugger) em erro</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button data-test="button-debug-submit" type="submit" disabled={loading} className="px-4 py-2 bg-primary text-primary-foreground rounded">{loading ? 'Enviando...' : 'Enviar'}</button>
            <button data-test="button-debug-clear" type="button" onClick={() => setOutput(null)} className="px-4 py-2 bg-secondary rounded">Limpar</button>
          </div>
        </form>

        <div className="mt-4">
          <h3 className="font-medium mb-2">Saída / Logs</h3>
          <pre data-test="pre-debug-output" className="p-3 bg-muted/10 rounded text-sm whitespace-pre-wrap">{output ?? 'Nenhuma ação ainda'}</pre>
        </div>
      </div>
    </MainLayout>
  );
}
