/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
declare module "lodash-es/*"

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_ID: string
  readonly VITE_API_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}