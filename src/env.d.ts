/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_VERSION: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
