/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHOP_CLIENT_ID: string
  readonly VITE_WHOP_CLIENT_SECRET: string
  readonly VITE_WHOP_COMPANY_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
