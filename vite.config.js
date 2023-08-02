import { defineConfig } from 'vite'
import { resolve } from 'path'
export default defineConfig({
    root: 'src',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {

                main: resolve(__dirname, 'src/index.html'),
                baseball: resolve(__dirname, 'src/baseball.html'),
                express: resolve(__dirname, 'server/app.js')

            }
        }
    },
    server: {
        // https: true,
        port: 3001,
        host: true
    }
})
