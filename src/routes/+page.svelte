<script lang="ts">
	import { onMount } from 'svelte';
	
	interface TideData {
		time: string;
		height: number;
		type: 'high' | 'low';
		timestamp: number;
	}
	
	interface Beach {
		name: string;
		location: string;
		lat: number;
		lon: number;
		emoji: string;
	}
	
	const beaches: Beach[] = [
        { name: "Cap de l’Homy", location: 'Lit-et-Mixe (Landes)', lat: 44.03895, lon: -1.34023, emoji: '🏄‍♂️' },
        { name: 'La Lette Blanche', location: 'Vielle-Saint-Girons (Landes)', lat: 43.90279, lon: -1.37726, emoji: '🌊' },
        { name: 'Biarritz', location: 'Grande Plage', lat: 43.4831, lon: -1.5586, emoji: '🏄‍♂️' },
        { name: 'Hossegor', location: 'La Centrale', lat: 43.6618, lon: -1.4087, emoji: '🌊' },
        { name: 'Lacanau', location: 'Océan', lat: 45.0045, lon: -1.1966, emoji: '🏖️' },
        { name: 'Capbreton', location: 'Le Santocha', lat: 43.6425, lon: -1.4285, emoji: '🏄‍♀️' },
        { name: 'Anglet', location: "Chambre d'Amour", lat: 43.5065, lon: -1.5315, emoji: '💙' },
        { name: 'La Torche', location: 'Bretagne', lat: 47.8377, lon: -4.3364, emoji: '⚡' },
        { name: 'Guidel', location: 'Plages du Morbihan', lat: 47.7946, lon: -3.5012, emoji: '🌅' }
    ];

	let selectedBeach: Beach = beaches[0];
	let tideData: TideData[] = [];
	let loading = false;
	let currentTime = new Date();
	let nextTide: TideData | null = null;
	
	// Mise à jour de l'heure toutes les secondes
	onMount(() => {
		const interval = setInterval(() => {
			currentTime = new Date();
		}, 1000);
		
		fetchTideData(selectedBeach);
		
		return () => clearInterval(interval);
	});
	
	async function fetchTideData(beach: Beach) {
		loading = true;
		
		try {
			// Simulation de données réalistes pour l'instant
			tideData = generateRealisticTideData();
			findNextTide();
		} catch (err) {
			console.error('Erreur lors de la récupération des données:', err);
			tideData = generateRealisticTideData();
		} finally {
			loading = false;
		}
	}
	
	function generateRealisticTideData(): TideData[] {
		const now = new Date();
		const data: TideData[] = [];
		
		// Génération de marées réalistes sur 24h
		const baseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 15);
		
		for (let i = 0; i < 4; i++) {
			// Marée haute
			const highTime = new Date(baseTime.getTime() + (i * 12.5 + 0) * 60 * 60 * 1000);
			// Marée basse
			const lowTime = new Date(baseTime.getTime() + (i * 12.5 + 6.25) * 60 * 60 * 1000);
			
			data.push({
				time: highTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
				height: 3.8 + Math.random() * 1.2,
				type: 'high',
				timestamp: highTime.getTime()
			});
			
			data.push({
				time: lowTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
				height: 0.3 + Math.random() * 0.7,
				type: 'low',
				timestamp: lowTime.getTime()
			});
		}
		
		return data.sort((a, b) => a.timestamp - b.timestamp);
	}
	
	function findNextTide() {
		const now = currentTime.getTime();
		nextTide = tideData.find(tide => tide.timestamp > now) || null;
	}
	
	function getSurfRating(tide: TideData): number {
		if (tide.type === 'high' && tide.height > 4) return 5;
		if (tide.type === 'high' && tide.height > 3) return 4;
		if (tide.type === 'high' && tide.height > 2) return 3;
		if (tide.type === 'low' && tide.height < 1) return 3;
		return 2;
	}
	
	function getSurfConditionText(rating: number): string {
		switch(rating) {
			case 5: return 'Excellent';
			case 4: return 'Très bon';
			case 3: return 'Bon';
			case 2: return 'Moyen';
			default: return 'Faible';
		}
	}
	
	function getTimeUntilNextTide(): string {
		if (!nextTide) return '';
		
		const now = currentTime.getTime();
		const diff = nextTide.timestamp - now;
		const hours = Math.floor(diff / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		
		if (hours > 0) return `${hours}h ${minutes}min`;
		return `${minutes}min`;
	}
	
	$: if (selectedBeach) {
		fetchTideData(selectedBeach);
	}
	
</script>

<svelte:head>
	<title>🏄‍♂️ Surf Report</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
</svelte:head>

<main>

	<!-- Sélecteur de plage style iOS -->
	<div class="beach-selector">
		<div class="selector-container">
			{#each beaches as beach, index}
				<button 
					class="beach-option" 
					class:selected={beach === selectedBeach}
					on:click={() => selectedBeach = beach}
				>
					<span class="beach-emoji">{beach.emoji}</span>
					<div class="beach-info">
						<div class="beach-name">{beach.name}</div>
						<div class="beach-location">{beach.location}</div>
					</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- Carte principale météo style -->
	<div class="main-card">
		{#if loading}
			<div class="loading-state">
				<div class="loading-spinner"></div>
				<p>Chargement...</p>
			</div>
		{:else}
			<!-- Conditions actuelles -->
			<div class="current-conditions">
				<div class="location-header">
					<h1>{selectedBeach.name}</h1>
					<p>{selectedBeach.location}</p>
				</div>
				
				{#if nextTide}
					<div class="next-tide">
						<div class="tide-time">{nextTide.time}</div>
						<div class="tide-info">
							<span class="tide-type">
								{nextTide.type === 'high' ? 'Marée Haute' : 'Marée Basse'}
							</span>
							<span class="tide-height">{nextTide.height.toFixed(1)}m</span>
						</div>
						<div class="time-until">
							dans {getTimeUntilNextTide()}
						</div>
					</div>
					
					<div class="surf-rating">
						<div class="rating-dots">
							{#each Array(5) as _, i}
								<div class="dot" class:active={i < getSurfRating(nextTide)}></div>
							{/each}
						</div>
						<span class="rating-text">{getSurfConditionText(getSurfRating(nextTide))}</span>
					</div>
				{/if}
			</div>

			<!-- Prévisions horaires -->
			<div class="hourly-forecast">
				<h3>Marées du jour</h3>
				<div class="forecast-scroll">
					{#each tideData as tide}
						<div class="forecast-item" class:next={tide === nextTide}>
							<div class="forecast-time">{tide.time}</div>
							<div class="forecast-icon">
								{tide.type === 'high' ? '⬆️' : '⬇️'}
							</div>
							<div class="forecast-height">{tide.height.toFixed(1)}m</div>
							<div class="forecast-type">
								{tide.type === 'high' ? 'Haute' : 'Basse'}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Conseils surf -->
			<div class="surf-tips">
				<h3>💡 Conseils</h3>
				<div class="tips-grid">
					<div class="tip-item">
						<span class="tip-icon">🌊</span>
						<span class="tip-text">Marée montante = vagues douces</span>
					</div>
					<div class="tip-item">
						<span class="tip-icon">⬆️</span>
						<span class="tip-text">Marée haute = surf expert</span>
					</div>
					<div class="tip-item">
						<span class="tip-icon">⬇️</span>
						<span class="tip-text">Marée basse = débutants</span>
					</div>
					<div class="tip-item">
						<span class="tip-icon">⚠️</span>
						<span class="tip-text">Attention aux rochers</span>
					</div>
				</div>
			</div>
		{/if}
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(180deg, #87CEEB 0%, #4682B4 100%);
		min-height: 100vh;
		color: #000;
		overflow-x: hidden;
	}

	main {
		max-width: 430px;
		margin: 0 auto;
		min-height: 100vh;
		background: linear-gradient(180deg, #87CEEB 0%, #4682B4 50%, #1e3a8a 100%);
		position: relative;
	}

	/* Status bar style iPhone */
	.status-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 20px 8px 20px;
		color: white;
		font-weight: 600;
		font-size: 17px;
		background: rgba(0,0,0,0.1);
		backdrop-filter: blur(10px);
	}

	/* Sélecteur de plage */
	.beach-selector {
		padding: 16px;
	}

	.selector-container {
		display: flex;
		gap: 12px;
		overflow-x: auto;
		padding: 4px 8px;
		scrollbar-width: none;
		-ms-overflow-style: none;
		scroll-snap-type: x mandatory;
	}

	.selector-container::-webkit-scrollbar {
		display: none;
	}

	.beach-option {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
		background: rgba(255,255,255,0.2);
		border: none;
		border-radius: 20px;
		backdrop-filter: blur(10px);
		color: white;
		font-size: 14px;
		cursor: pointer;
		transition: all 0.3s ease;
		white-space: nowrap;
		min-width: 180px;
		flex-shrink: 0;
		scroll-snap-align: start;
	}

	.beach-option.selected {
		background: rgba(255,255,255,0.9);
		color: #1e3a8a;
		box-shadow: 0 4px 20px rgba(0,0,0,0.1);
	}

	.beach-emoji {
		font-size: 20px;
	}

	.beach-info {
		text-align: left;
		flex: 1;
		min-width: 0;
	}

	.beach-name {
		font-weight: 600;
		font-size: 14px;
		line-height: 1.2;
		margin-bottom: 2px;
	}

	.beach-location {
		font-size: 11px;
		opacity: 0.8;
		line-height: 1.2;
	}

	/* Carte principale */
	.main-card {
		margin: 16px;
		background: rgba(255,255,255,0.95);
		border-radius: 24px;
		padding: 24px;
		backdrop-filter: blur(20px);
		box-shadow: 0 8px 32px rgba(0,0,0,0.1);
		min-height: 500px;
	}

	.loading-state {
		text-align: center;
		padding: 60px 20px;
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 3px solid #f3f3f3;
		border-top: 3px solid #4682B4;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 16px;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	/* Conditions actuelles */
	.current-conditions {
		text-align: center;
		margin-bottom: 32px;
	}

	.location-header h1 {
		font-size: 32px;
		font-weight: 300;
		margin: 0 0 4px 0;
		color: #1e3a8a;
	}

	.location-header p {
		font-size: 16px;
		color: #6b7280;
		margin: 0 0 24px 0;
	}

	.next-tide {
		margin-bottom: 24px;
	}

	.tide-time {
		font-size: 48px;
		font-weight: 200;
		color: #1e3a8a;
		margin-bottom: 8px;
	}

	.tide-info {
		display: flex;
		justify-content: center;
		gap: 16px;
		margin-bottom: 8px;
	}

	.tide-type, .tide-height {
		font-size: 18px;
		font-weight: 500;
		color: #374151;
	}

	.time-until {
		font-size: 16px;
		color: #6b7280;
	}

	/* Rating système */
	.surf-rating {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.rating-dots {
		display: flex;
		gap: 6px;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #e5e7eb;
		transition: all 0.3s ease;
	}

	.dot.active {
		background: #3b82f6;
		box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
	}

	.rating-text {
		font-size: 16px;
		font-weight: 500;
		color: #374151;
	}

	/* Prévisions horaires */
	.hourly-forecast {
		margin-bottom: 32px;
	}

	.hourly-forecast h3 {
		font-size: 18px;
		font-weight: 600;
		color: #1e3a8a;
		margin: 0 0 16px 0;
	}

	.forecast-scroll {
		display: flex;
		gap: 12px;
		overflow-x: auto;
		padding: 8px 0;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.forecast-scroll::-webkit-scrollbar {
		display: none;
	}

	.forecast-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 16px 12px;
		background: #f9fafb;
		border-radius: 16px;
		min-width: 80px;
		transition: all 0.3s ease;
	}

	.forecast-item.next {
		background: #dbeafe;
		border: 2px solid #3b82f6;
	}

	.forecast-time {
		font-size: 14px;
		font-weight: 500;
		color: #374151;
	}

	.forecast-icon {
		font-size: 24px;
	}

	.forecast-height {
		font-size: 16px;
		font-weight: 600;
		color: #1e3a8a;
	}

	.forecast-type {
		font-size: 12px;
		color: #6b7280;
	}

	/* Conseils surf */
	.surf-tips h3 {
		font-size: 18px;
		font-weight: 600;
		color: #1e3a8a;
		margin: 0 0 16px 0;
	}

	.tips-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}

	.tip-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px;
		background: #f9fafb;
		border-radius: 12px;
	}

	.tip-icon {
		font-size: 20px;
	}

	.tip-text {
		font-size: 14px;
		color: #374151;
	}

	/* Responsive */
	@media (max-width: 430px) {
		.main-card {
			margin: 12px;
			padding: 20px;
		}

		.tide-time {
			font-size: 40px;
		}

		.location-header h1 {
			font-size: 28px;
		}
	}
</style>
