import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/scss/chat.scss', 'resources/js/app.js', 'resources/css/app.css'],
            refresh: true,
        }),
    ],
});
