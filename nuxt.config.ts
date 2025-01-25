// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  // (optional) Enable the Nuxt devtools
  devtools: { enabled: true },

  // Enable SSG
  ssr: false,

  // Enables the development server to be discoverable by other devices when running on iOS physical devices
  devServer: { host: process.env.TAURI_DEV_HOST || 'localhost' },

  vite: {
    optimizeDeps: { esbuildOptions: { target: "esnext" } },
    // Better support for Tauri CLI output
    clearScreen: false,
    // Enable environment variables
    // Additional environment variables can be found at
    // https://v2.tauri.app/reference/environment-variables/
    envPrefix: ['VITE_', 'TAURI_'],
    server: {
      // Tauri requires a consistent port
      strictPort: true,
    },
    build: {
      target: 'esnext',
    },
  },

  telemetry: false,
  compatibilityDate: '2025-01-03',
});