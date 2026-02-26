import type { Plugin } from "vite";

export function removeDataTest(): Plugin {
  return {
    name: "remove-data-test",
    renderChunk(code: string) {
      const cleaned = code.replace(/"data-test":"[^"]*",?\s*/g, "");
      return { code: cleaned, map: null };
    },
  };
}