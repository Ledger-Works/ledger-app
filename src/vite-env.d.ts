/* eslint-disable */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />


// Mock all files ending in `.vue` showing them as plain vue instances
declare module 'material/*' {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, {}>
    export default component;
}