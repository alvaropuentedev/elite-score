import { defineConfig } from 'vite'
import path from 'path'
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const base = mode === 'production' ? '/' + path.basename(process.cwd()) + '/' : '/'
export default defineConfig({
    root: 'src',
    build: {
        outDir: '../dist'
    },
    server: {
        // https: true,
        port: 3001,
        host: true
    }
})
