# React Dynamic Remote Component Loader

A React component for dynamically loading remote components using Module Federation.

## Installation

```bash
npm install @feedma/react-gen-ui-resolver
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
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {},
      shared: ['react', 'react-dom']
    })
  ]
})
```

### 3. Expose Federation Runtime

The host application must expose the federation runtime to the global scope. The federation plugin will automatically handle this when properly configured.

## Usage

### Basic Usage

```tsx
import React from 'react';
import { DynamicRemoteComponentLoader } from '@feedma/react-gen-ui-resolver';

function App() {
  return (
    <div>
      <DynamicRemoteComponentLoader
        url="http://localhost:3001/assets/remoteEntry.js"
        name="remote"
        module="./MyComponent"
      />
    </div>
  );
}

export default App;
```

### With Props

```tsx
import React from 'react';
import { DynamicRemoteComponentLoader } from '@feedma/react-gen-ui-resolver';

function App() {
  const componentProps = {
    title: 'Hello World',
    count: 42
  };

  return (
    <div>
      <DynamicRemoteComponentLoader
        url="http://localhost:3001/assets/remoteEntry.js"
        name="remote"
        module="./MyComponent"
        props={componentProps}
      />
    </div>
  );
}

export default App;
```

### With Custom Loading State

```tsx
import React from 'react';
import { DynamicRemoteComponentLoader } from '@feedma/react-gen-ui-resolver';

function App() {
  return (
    <div>
      <DynamicRemoteComponentLoader
        url="http://localhost:3001/assets/remoteEntry.js"
        name="remote"
        module="./MyComponent"
        props={{ title: 'Custom Component' }}
      />
    </div>
  );
}

export default App;
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `url` | `string` | Yes | The URL of the remote entry file |
| `name` | `string` | Yes | The name of the remote module |
| `module` | `string` | Yes | The module path within the remote |
| `props` | `Record<string, unknown>` | No | Props to pass to the remote component |

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
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {},
      shared: ['react', 'react-dom']
    })
  ]
})
```

```tsx
// App.tsx
import React from 'react';
import { DynamicRemoteComponentLoader } from '@feedma/react-gen-ui-resolver';

function App() {
  return (
    <div>
      <h1>Host Application</h1>
      <DynamicRemoteComponentLoader
        url="http://localhost:3001/assets/remoteEntry.js"
        name="remote"
        module="./MyComponent"
        props={{ title: 'Remote Component' }}
      />
    </div>
  );
}

export default App;
```

### License
MIT
