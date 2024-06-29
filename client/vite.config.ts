import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react({
        babel: {
            plugins: ["istanbul"]
        }
    })],
    server: {
        port: 5173,
    }
})
