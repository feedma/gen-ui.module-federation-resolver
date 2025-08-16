import { lazy, Suspense } from "react";

// Function to get federation methods safely
const getFederationMethods = async () => {
  // Try to get federation methods from global scope
  const mf = await import("__federation__" as any);

  // Check if federation methods are available in global scope
  if (mf.__federation_method_getRemote && mf.__federation_method_setRemote) {
    return {
      getRemote: mf.__federation_method_getRemote,
      setRemote: mf.__federation_method_setRemote,
    };
  }
  return null;
};

interface ComponentLoaderProps<TProps = Record<"string", unknown>> {
  url: string;
  name: string;
  module: string;
  props?: TProps;
}

const ComponentLoader = ({ url, name, module }: ComponentLoaderProps) => {
  return lazy(async () => {
    const federationMethods = await getFederationMethods();

    if (!federationMethods) {
      throw new Error(
        "Module federation is not configured. Please ensure @originjs/vite-plugin-federation is properly set up in your host application. " +
          "The host application must configure the federation plugin and expose the federation runtime."
      );
    }

    federationMethods.setRemote(name, {
      url: () => Promise.resolve(url),
      format: "esm",
      from: "vite",
    });

    return federationMethods.getRemote(name, module);
  });
};

export interface DynamicRemoteComponentLoaderProps
  extends ComponentLoaderProps {}

export const DynamicRemoteComponentLoader = ({
  url,
  name,
  module,
  props,
}: DynamicRemoteComponentLoaderProps) => {
  return (
    <Suspense fallback={<div>Loading remote component...</div>}>
      {(() => {
        const LazyComponent = ComponentLoader({
          url,
          name,
          module,
        });
        return <LazyComponent {...props} />;
      })()}
    </Suspense>
  );
};
