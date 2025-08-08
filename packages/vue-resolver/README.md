# Vue Dynamic Remote Component Loader

A Vue.js component for dynamically loading remote components using Module Federation.

## Installation

```bash
npm install @feedma/vue-gen-ui-resolver
```

## Host Application Setup

This package requires the host application to be properly configured with `@originjs/vite-plugin-federation`. Here's how to set it up:

### 1. Install the Federation Plugin

```bash
npm install @originjs/vite-plugin-federation
```

### 2. Configure Vite

In your host application's `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host',
      remotes: {
        // Configure your remotes here
        remote: 'http://localhost:3001/assets/remoteEntry.js'
      },
      shared: ['vue']
    })
  ]
})
```

### 3. Expose Federation Runtime

The host application must expose the federation runtime to the global scope. Add this to your main entry file (e.g., `main.ts`):

```typescript
import { createApp } from 'vue'
import App from './App.vue'


const app = createApp(App)
app.mount('#app')
```

## Usage

### Basic Usage

```vue
<template>
  <div>
    <DynamicRemoteLoader
      url="http://localhost:3001/assets/remoteEntry.js"
      name="remote"
      module="./MyComponent"
    />
  </div>
</template>

<script setup>
import { DynamicRemoteLoader } from '@feedma/vue-gen-ui-resolver'
</script>
```

### With Error Handling

```vue
<template>
  <div>
    <DynamicRemoteLoader
      url="http://localhost:3001/assets/remoteEntry.js"
      name="remote"
      module="./MyComponent"
    />
  </div>
</template>

<script setup>
import { DynamicRemoteLoader } from '@feedma/vue-gen-ui-resolver'
</script>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `url` | `string` | Yes | The URL of the remote entry file |
| `name` | `string` | Yes | The name of the remote module |
| `module` | `string` | Yes | The module path within the remote |

## Error Handling

The component will display an error message if:

1. Module federation is not properly configured in the host application
2. The remote component fails to load
3. The federation runtime is not available

## Troubleshooting

### "Module federation is not configured" Error

This error occurs when the host application doesn't have the federation runtime available. Make sure:

1. `@originjs/vite-plugin-federation` is installed and configured
2. Federation methods are exposed to the global scope
3. The host application is built with the federation plugin

### "Failed to load remote component" Error

This error occurs when the remote component cannot be loaded. Check:

1. The remote URL is correct and accessible
2. The remote module name and path are correct
3. The remote application is running and properly configured

## Example Host Application

Here's a complete example of a host application setup:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host',
      remotes: {
      },
      shared: ['vue']
    })
  ]
})
```

```vue
<!-- App.vue -->
<template>
  <div>
    <h1>Host Application</h1>
    <DynamicRemoteLoader
      url="http://localhost:3001/assets/remoteEntry.js"
      name="remote"
      module="./MyComponent"
    />
  </div>
</template>

<script setup>
import { DynamicRemoteLoader } from '@feedma/vue-gen-ui-resolver'
</script>
```

## License

MIT
