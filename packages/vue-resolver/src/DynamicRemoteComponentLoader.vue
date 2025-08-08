<template>
  <div>
    <div v-if="error" class="error">
      <h3>Error loading remote component:</h3>
      <pre>{{ error }}</pre>
    </div>
    
    <Suspense v-else>
      <template #default>
        <LazyComponent />
      </template>
      <template #fallback>
        <div>Loading remote component...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'


interface DynamicRemoteLoaderProps {
  url: string
  name: string
  module: string
}

interface RemoteComponentLoaderProps extends DynamicRemoteLoaderProps {}

const props = defineProps<RemoteComponentLoaderProps>()
const error = ref<string | null>(null)

// Function to get federation methods safely
const getFederationMethods = async () => {
  // Try to get federation methods from global scope
  const mf = await import("__federation__" as any)
  
  // Check if federation methods are available in global scope
  if (mf.__federation_method_getRemote && mf.__federation_method_setRemote) {
    return {
      getRemote: mf.__federation_method_getRemote,
      setRemote: mf.__federation_method_setRemote
    }
  }
  return null
}

const LazyComponent = defineAsyncComponent(
  {
    loader: async () => {
      try {
        console.log('Loading remote component:', props.name, props.url, props.module)
        
        // Get federation methods
        const federationMethods = await getFederationMethods()
        
        if (!federationMethods) {
          throw new Error(
            'Module federation is not configured. Please ensure @originjs/vite-plugin-federation is properly set up in your host application. ' +
            'The host application must configure the federation plugin and expose the federation runtime.'
          )
        }
        
        // Set up the remote
        federationMethods.setRemote(props.name, {
          url: () => Promise.resolve(props.url),
          format: "esm",
          from: "vite",
        })
        
        // Get the remote component
        const component = await federationMethods.getRemote(props.name, props.module)
        console.log('Remote component loaded successfully')
        
        return component
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err)
        console.error('Error loading remote component:', err)
        error.value = errorMessage
        throw err
      }
    },
    errorComponent: {
      template: '<div class="error">Failed to load remote component</div>'
    }
  }
)

</script>

<style scoped>
.error {
  color: red;
  padding: 1rem;
  border: 1px solid red;
  border-radius: 4px;
  margin: 1rem 0;
  background-color: #fff5f5;
}

.error pre {
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>