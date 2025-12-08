import { MainLayout } from "@/components/layout/MainLayout";
import { useState } from "react";
import { toast } from "sonner";

const dataTestItems = [
  { name: "page-form-completo", description: "Container do formulário completo" },
  { name: "form-cadastro", description: "Formulário principal" },
  { name: "input-form-nome", description: "Campo nome (obrigatório)" },
  { name: "input-form-email", description: "Campo email (obrigatório)" },
  { name: "input-form-telefone", description: "Campo telefone" },
  { name: "input-form-idade", description: "Campo idade (number)" },
  { name: "select-form-pais", description: "Select país" },
  { name: "radio-form-genero", description: "Radio grupo gênero" },
  { name: "checkbox-form-interesse", description: "Checkbox interesses" },
  { name: "textarea-form-observacoes", description: "Observações" },
  { name: "input-form-avatar", description: "Upload de avatar" },
  { name: "button-adicionar-dependente", description: "Adicionar dependente" },
  { name: "dependente-row-{index}", description: "Dependente - linha indexada" },
  { name: "pagination-info", description: "(placeholder)" },
];

type Dependente = { nome: string; idade: number | "" };

export default function FormCompletoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    idade: "",
    pais: "",
    genero: "",
    observacoes: "",
  });

  const [interesses, setInteresses] = useState<string[]>([]);
  const [avatarName, setAvatarName] = useState("");
  const [dependentes, setDependentes] = useState<Dependente[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const paises = ["Brasil", "Portugal", "Espanha", "Estados Unidos"];
  const opInteresses = ["Newsletter", "Promoções", "Parcerias"];

  const applyPhoneMask = (val: string) => {
    const numbers = val.replace(/\D/g, "");
    return numbers
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  };

  function toggleInteresse(value: string) {
    setInteresses((prev) => (prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]));
  }

  function addDependente() {
    setDependentes((prev) => [...prev, { nome: "", idade: "" }]);
  }

  function removeDependente(index: number) {
    setDependentes((prev) => prev.filter((_, i) => i !== index));
  }

  function updateDependente(index: number, key: keyof Dependente, value: any) {
    setDependentes((prev) => prev.map((d, i) => (i === index ? { ...d, [key]: value } : d)));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!formData.nome.trim()) e.nome = "Nome é obrigatório";
    if (!formData.email.trim()) e.email = "Email é obrigatório";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // apenas dar feedback — não persiste
    toast.success("Formulário enviado com sucesso!");
  }

  return (
    <MainLayout pageTitle="Formulário Completo" dataTestItems={dataTestItems}>
      <div data-test="page-form-completo" className="max-w-3xl mx-auto animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Formulário Completo</h1>
          <p className="text-muted-foreground mt-1">Contém todos os tipos de campos para testes E2E</p>
        </div>

        <form data-test="form-cadastro" onSubmit={handleSubmit} className="p-6 rounded-xl bg-card border border-border space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome completo</label>
            <input
              data-test="input-form-nome"
              type="text"
              value={formData.nome}
              onChange={(ev) => setFormData({ ...formData, nome: ev.target.value })}
              placeholder="Nome"
              className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-sm"
            />
            {errors.nome && <div data-test="error-form-nome" className="text-destructive text-sm mt-1">{errors.nome}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              data-test="input-form-email"
              type="email"
              value={formData.email}
              onChange={(ev) => setFormData({ ...formData, email: ev.target.value })}
              placeholder="email@exemplo.com"
              className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-sm"
            />
            {errors.email && <div data-test="error-form-email" className="text-destructive text-sm mt-1">{errors.email}</div>}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Telefone</label>
              <input
                data-test="input-form-telefone"
                type="tel"
                value={formData.telefone}
                onChange={(ev) => setFormData({ ...formData, telefone: applyPhoneMask(ev.target.value) })}
                placeholder="(xx) xxxxx-xxxx"
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Idade</label>
              <input data-test="input-form-idade" type="number" min={0} step={1} value={formData.idade} onChange={(ev) => setFormData({ ...formData, idade: ev.target.value })} className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">País</label>
              <select data-test="select-form-pais" value={formData.pais} onChange={(ev) => setFormData({ ...formData, pais: ev.target.value })} className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-sm">
                <option value="">Selecione um país</option>
                {paises.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gênero</label>
            <div className="flex gap-4" role="radiogroup" aria-label="Gênero">
              <label className="flex items-center gap-2">
                <input data-test="radio-form-genero-m" type="radio" name="genero" value="m" checked={formData.genero === "m"} onChange={(ev) => setFormData({ ...formData, genero: ev.target.value })} />
                <span>Masculino</span>
              </label>
              <label className="flex items-center gap-2">
                <input data-test="radio-form-genero-f" type="radio" name="genero" value="f" checked={formData.genero === "f"} onChange={(ev) => setFormData({ ...formData, genero: ev.target.value })} />
                <span>Feminino</span>
              </label>
              <label className="flex items-center gap-2">
                <input data-test="radio-form-genero-o" type="radio" name="genero" value="o" checked={formData.genero === "o"} onChange={(ev) => setFormData({ ...formData, genero: ev.target.value })} />
                <span>Outro</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Interesses (múltipla escolha)</label>
            <div className="flex gap-4">
              {opInteresses.map((i, idx) => (
                <label key={i} className="flex items-center gap-2">
                  <input data-test={`checkbox-form-interesse-${idx}`} type="checkbox" checked={interesses.includes(i)} onChange={() => toggleInteresse(i)} />
                  <span>{i}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Observações</label>
            <textarea data-test="textarea-form-observacoes" value={formData.observacoes} onChange={(ev) => setFormData({ ...formData, observacoes: ev.target.value })} className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-sm" rows={4} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Avatar (simulado)</label>
            <input data-test="input-form-avatar" type="file" onChange={(ev) => setAvatarName(ev.target.files && ev.target.files[0] ? ev.target.files[0].name : "")} className="w-full text-sm" />
            {avatarName && <div data-test="info-form-avatar" className="text-sm mt-1">Arquivo: {avatarName}</div>}
          </div>

          <div className="pt-2">
            <h3 className="font-medium mb-2">Dependentes</h3>
            <div className="flex gap-2 mb-3">
              <button data-test="button-adicionar-dependente" type="button" onClick={addDependente} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">Adicionar Dependente</button>
            </div>

            <div className="space-y-3">
              {dependentes.map((d, idx) => (
                <div key={idx} data-test={`dependente-row-${idx}`} className="p-3 rounded-lg bg-secondary border border-border">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm mb-1 block">Nome</label>
                      <input data-test={`input-dependente-nome-${idx}`} type="text" value={d.nome} onChange={(ev) => updateDependente(idx, 'nome', ev.target.value)} className="w-full px-3 py-2 rounded-lg bg-card border border-border text-sm" />
                    </div>
                    <div>
                      <label className="text-sm mb-1 block">Idade</label>
                      <input data-test={`input-dependente-idade-${idx}`} type="number" min={0} value={d.idade as any} onChange={(ev) => updateDependente(idx, 'idade', ev.target.value === '' ? '' : Number(ev.target.value))} className="w-full px-3 py-2 rounded-lg bg-card border border-border text-sm" />
                    </div>
                    <div className="flex items-end">
                      <button data-test={`button-remover-dependente-${idx}`} type="button" onClick={() => removeDependente(idx)} className="px-3 py-2 rounded-lg bg-destructive text-destructive-foreground">Remover</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button data-test="button-salvar-form" type="submit" className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground">Salvar</button>
            <button data-test="button-limpar-form" type="button" onClick={() => { setFormData({ nome: '', email: '', telefone: '', idade: '', pais: '', genero: '', observacoes: '' }); setInteresses([]); setDependentes([]); setAvatarName(''); setErrors({}); }} className="flex-1 py-3 rounded-lg bg-secondary">Limpar</button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
