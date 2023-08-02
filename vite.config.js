import { defineConfig } from 'vite'
export default defineConfig({
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        base: 'public'
    },
    server: {
        // https: true,
        port: 3001,
        host: true
    }
})
