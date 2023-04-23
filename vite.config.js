import { defineConfig } from 'vite'
import path from 'path'
// import mkcert from 'vite-plugin-mkcert'
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const base = mode === 'production' ? '/' + path.basename(process.cwd()) + '/' : '/'
export default defineConfig({
    root: 'src',
    base,
    mode,
    build: {
        outDir: '../dist'
    },
    server: {
        // https: true,
        port: 8080,
        host: true
    }
    // plugins: [mkcert()]
})
