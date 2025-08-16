interface ComponentLoaderProps<TProps = Record<"string", unknown>> {
    url: string;
    name: string;
    module: string;
    props?: TProps;
}
export interface DynamicRemoteComponentLoaderProps extends ComponentLoaderProps {
}
export declare const DynamicRemoteComponentLoader: ({ url, name, module, props, }: DynamicRemoteComponentLoaderProps) => import("react/jsx-runtime").JSX.Element;
export {};
