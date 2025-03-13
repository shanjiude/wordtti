import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/scss/chat.scss', 'resources/js/app.js', 'resources/css/app.css'],
            refresh: true,
        }),
    ],
    server: {
        https: true, // ローカル環境でも HTTPS を有効にする
    },
    base: '/build/', // アセットの URL を明示的に設定
});
