import type { Plugin } from "vite";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import fs from "fs"; 

export function removeDataTest(): Plugin {
  return {
    name: "remove-data-test",
    enforce: "post",
    apply: "build",
    closeBundle() {
      const outDir = resolve("dist/assets");
      const files = fs
        .readdirSync(outDir)
        .filter((f: string) => f.endsWith(".js"));

      let total = 0;

      for (const file of files) {
        const filePath = resolve(outDir, file);
        const original = readFileSync(filePath, "utf-8");
        const cleaned = original.replace(/"data-test":"[^"]*",?\s*/g, "");

        if (original !== cleaned) {
          writeFileSync(filePath, cleaned, "utf-8");
          total++;
        }
      }
    },
  };
}
