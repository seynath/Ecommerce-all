// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
//   // Load env file based on the current mode (`.env`, `.env.production`, `.env.development`, etc.)
//   const env = loadEnv(mode, process.cwd());

//   return {
//     plugins: [react()],
//     define: {
//       'process.env.VITE_BASE_URL': JSON.stringify(env.VITE_BASE_URL),
//     },
//   };
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
