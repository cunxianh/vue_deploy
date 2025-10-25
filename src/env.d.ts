/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_NAME?: string
  // 其他自定義環境變數...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}