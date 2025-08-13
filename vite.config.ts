import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
			},
			manifest: {
				name: 'Surf Report PWA',
				short_name: 'SurfReport',
				description: 'Application de surf pour consulter les marées',
				theme_color: '#4A90E2',
				background_color: '#ffffff',
				display: 'standalone',
				scope: '/',
				start_url: '/',
				icons: [
					{
						src: '/icon-192.svg',
						sizes: '192x192',
						type: 'image/svg+xml'
					},
					{
						src: '/icon-512.svg',
						sizes: '512x512',
						type: 'image/svg+xml'
					}
				]
			}
		})
	]
});
