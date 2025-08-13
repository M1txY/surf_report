<script lang="ts">
	import { onMount } from 'svelte';
	
	onMount(() => {
		// Enregistrement du service worker pour la PWA
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/sw.js')
				.then((registration) => {
					console.log('Service Worker enregistré:', registration);
				})
				.catch((error) => {
					console.log('Erreur Service Worker:', error);
				});
		}
	});
</script>

<slot />

<style>
	:global(*) {
		box-sizing: border-box;
	}
	
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
