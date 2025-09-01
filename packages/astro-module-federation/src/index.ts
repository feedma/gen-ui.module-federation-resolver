import federationPlugin from "@originjs/vite-plugin-federation";
import type { VitePluginFederationOptions } from "@originjs/vite-plugin-federation";
import type { AstroIntegration } from "astro";

export const federation = (options: VitePluginFederationOptions): AstroIntegration => {
  return {
    name: "feedma:astro-module-federation",
    hooks: {
      "astro:config:setup": ({ command, updateConfig }) => {
        if (command === "dev") {
          updateConfig({
            vite: {
              plugins: [federationPlugin(options)],
              optimizeDeps: {
                exclude: ["__federation__"],
              },
            },
          });
        }
      },
      "astro:build:setup": ({ vite, target }) => {
        if (target === "client") {
          if (!vite.plugins) {
            vite.plugins = [];
          }
          vite.plugins.push(federationPlugin(options));
        }
      },
    },
  };
};