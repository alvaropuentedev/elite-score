import { defineConfig } from 'vite'
import path, { resolve } from 'path'
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const base = mode === 'production' ? '/' + path.basename(process.cwd()) + '/' : '/'
export default defineConfig({
    root: 'src',
    mode,
    base,
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                baseball: resolve(__dirname, 'src/baseball.html'),
                express: resolve(__dirname, 'src/app.js')
            }
        }
    },
    server: {
        // https: true,
        port: 3001,
        host: true
    }
})
