# @feedma/astro-module-federation

[![npm version](https://img.shields.io/npm/v/@feedma/astro-module-federation.svg)](https://www.npmjs.com/package/@feedma/astro-module-federation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A seamless Astro integration for Module Federation that enables dynamic loading of remote components and micro-frontend architecture in Astro applications.

## ✨ Features

- **Minimal-config setup** - Simple integration with your existing Astro configuration
- **Development & Production support** - Works in both dev and build modes
- **TypeScript support** - Full type safety with TypeScript
- **Framework agnostic** - Compatible with React, Vue, and other frameworks
- **Built on Vite** - Leverages the power of Vite and `@originjs/vite-plugin-federation`

## 🚀 Installation

```bash
npm install @feedma/astro-module-federation
```

**Note**: This package requires `@originjs/vite-plugin-federation` as a peer dependency:

```bash
npm install @originjs/vite-plugin-federation
```

## 📖 Usage

### Basic Configuration

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import { federation } from '@feedma/astro-module-federation';
import node from "@astrojs/node";
import react from "@astrojs/react";
import vue from "@astrojs/vue";

export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),

  integrations: [
    vue(),
    react(),
    federation({
      name: "shell",
      remotes: {
        _: "",
      },
      shared: ["react", "react-dom", "vue"],
    }),
  ],
});
```

### Advanced Configuration

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import { federation } from '@feedma/astro-module-federation';
import react from "@astrojs/react";

export default defineConfig({
  integrations: [
    react(),
    federation({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        "remote-app": "http://localhost:3001/assets/remoteEntry.js",
      },
      shared: {
        react: {
          // Your customizations
        },
        "react-dom": {
          // your customizations
        },
      },
    }),
  ],
});
```

## 🔧 Configuration Options

The `federation` function accepts all options from `@originjs/vite-plugin-federation`. Here are the most common ones:

### Core Options

| Option | Type | Description |
|--------|------|-------------|
| `name` | `string` | The name of your application (required) |
| `filename` | `string` | The filename for the remote entry (default: "remoteEntry.js") |
| `remotes` | `Record<string, string>` | Remote applications to consume |
| `exposes` | `Record<string, string>` | Components to expose to other applications |
| `shared` | `string[] \| Record<string, any>` | Dependencies to share between applications |

### Remote Configuration

```js
remotes: {
  // Simple remote
  "app1": "http://localhost:3001/assets/remoteEntry.js",
  
  // Remote with custom entry
  "app2": {
    external: "http://localhost:3002/assets/remoteEntry.js",
    format: "esm",
  },
}
```

### Shared Dependencies

```js
shared: {
  // Simple array of package names
  ["react", "react-dom", "vue"],
  
  // Or detailed configuration
  react: {
    singleton: true,
    requiredVersion: "^18.0.0",
    eager: false,
  },
}
```

## 🏗️ Architecture

This integration works by:

1. **Development Mode**: Configures Vite with the federation plugin during `astro:config:setup`
2. **Build Mode**: Applies federation configuration during `astro:build:setup` for client builds
3. **Optimization**: Excludes `__federation__` from dependency optimization for better performance

## 📱 Example Use Cases

### Micro-Frontend Architecture
Build large applications by composing smaller, independently deployable frontends.

### Component Library
Share reusable components across multiple Astro applications.

### Dynamic Feature Loading
Load features on-demand from remote applications.

### Multi-Team Development
Enable different teams to work on separate applications while maintaining a unified user experience.

## 🚨 Important Notes

- **Development Mode**: Federation is only active in development mode (`astro dev`)
- **Build Mode**: Federation is applied to client-side builds only
- **SSR Considerations**: Remote components are loaded client-side only
- **Network Requirements**: Remote applications must be accessible during build and runtime

## 🔍 Troubleshooting

### Common Issues

1. **Remote not loading**: Ensure the remote application is running and accessible
2. **Build errors**: Check that all remote URLs are correct and accessible
3. **Type errors**: Verify that shared dependencies versions are compatible

### Debug Mode

Enable debug logging by setting the `debug` option:

```js
federation({
  name: "shell",
  debug: true,
  // ... other options
})
```

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Links

- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [Vite Plugin Federation](https://github.com/originjs/vite-plugin-federation)
- [Astro Documentation](https://docs.astro.build/)
- [Project Repository](https://github.com/feedma/gen-ui.module-federation-resolver)

## 📞 Support

If you encounter any issues or have questions:

- [Open an issue](https://github.com/feedma/gen-ui.module-federation-resolver/issues)
- [Check existing issues](https://github.com/feedma/gen-ui.module-federation-resolver/issues)
- [Read the documentation](https://github.com/feedma/gen-ui.module-federation-resolver#readme)
