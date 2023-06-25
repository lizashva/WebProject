import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
console.log("sharon")
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
})
