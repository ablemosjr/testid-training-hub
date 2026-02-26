import type { Plugin } from "vite";

export function removeDataTest(): Plugin {
  return {
    name: "remove-data-test",
    renderChunk(code: string) {
      const before = (code.match(/"data-test":"[^"]*"/g) || []).length;
      const cleaned = code.replace(/"data-test":"[^"]*",?\s*/g, "");
      if (before > 0) {
        console.log(`[remove-data-test] Removidos ${before} atributos`);
      }
      return { code: cleaned, map: null };
    },
  };
}