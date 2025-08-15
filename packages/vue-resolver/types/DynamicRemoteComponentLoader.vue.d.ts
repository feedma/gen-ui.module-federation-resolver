interface DynamicRemoteLoaderProps {
    url: string;
    name: string;
    module: string;
    attributes: Record<string, any>;
}
interface RemoteComponentLoaderProps extends DynamicRemoteLoaderProps {
}
declare const _default: import("vue").DefineComponent<RemoteComponentLoaderProps, void, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<RemoteComponentLoaderProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
