import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni()],
    server: {
        hmr: true,
        proxy: {
            '/api': {
                // target: 'http://192.168.1.207:8000',
                target: 'http://192.168.1.218:8000',
                // target: 'http://192.168.1.253:8000',
                // target: 'https://shortvideo.sealh.cn:44',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }
})
