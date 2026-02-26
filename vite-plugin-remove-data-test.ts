import type { Plugin } from "vite";

export function removeDataTest(): Plugin {
  return {
    name: "remove-data-test",
    transform(code: string, id: string) {
      if (process.env.NODE_ENV !== "production") return;
      if (!id.match(/\.(tsx|jsx|ts|js)$/)) return;

      const cleaned = code.replace(/"data-test":\s*"[^"]*",?\s*/g, "");
      return { code: cleaned, map: null };
    },
  };
}