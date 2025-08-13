<script lang="ts">
</script>

<svelte:head>
	<title>À propos - Surf Report</title>
</svelte:head>

<main>
	<header>
		<h1>🏄‍♂️ À propos de Surf Report</h1>
		<a href="/" class="back-link">← Retour aux marées</a>
	</header>

	<div class="container">
		<section class="intro">
			<h2>🌊 Votre compagnon de surf gratuit</h2>
			<p>
				Surf Report est une Progressive Web App (PWA) gratuite et open-source 
				qui vous aide à planifier vos sessions de surf en consultant les horaires 
				de marées des principales plages françaises.
			</p>
		</section>

		<section class="features">
			<h2>✨ Fonctionnalités</h2>
			<div class="features-grid">
				<div class="feature">
					<div class="feature-icon">🏖️</div>
					<h3>Plages populaires</h3>
					<p>Accès aux données de marée des spots de surf les plus prisés de France</p>
				</div>
				<div class="feature">
					<div class="feature-icon">⏰</div>
					<h3>Horaires précis</h3>
					<p>Consultez les heures exactes des marées hautes et basses</p>
				</div>
				<div class="feature">
					<div class="feature-icon">🏄‍♀️</div>
					<h3>Conseils de surf</h3>
					<p>Recommandations adaptées selon les conditions de marée</p>
				</div>
				<div class="feature">
					<div class="feature-icon">📱</div>
					<h3>PWA</h3>
					<p>Installation possible sur votre téléphone comme une app native</p>
				</div>
				<div class="feature">
					<div class="feature-icon">🔄</div>
					<h3>Mise à jour auto</h3>
					<p>Données actualisées automatiquement toutes les 30 minutes</p>
				</div>
				<div class="feature">
					<div class="feature-icon">💰</div>
					<h3>100% Gratuit</h3>
					<p>Aucun coût, aucune inscription, aucune publicité</p>
				</div>
			</div>
		</section>

		<section class="tech">
			<h2>🛠️ Technologies utilisées</h2>
			<div class="tech-list">
				<span class="tech-item">Svelte</span>
				<span class="tech-item">SvelteKit</span>
				<span class="tech-item">TypeScript</span>
				<span class="tech-item">PWA</span>
				<span class="tech-item">Vite</span>
			</div>
		</section>

		<section class="disclaimer">
			<h2>⚠️ Avertissement</h2>
			<p>
				<strong>Cette application est à des fins informatives uniquement.</strong><br>
				Les conditions de surf dépendent de nombreux facteurs (vagues, vent, courants, etc.). 
				Vérifiez toujours les conditions locales et votre niveau avant d'entrer dans l'eau. 
				Respectez les consignes de sécurité et les réglementations locales.
			</p>
		</section>

		<section class="data-sources">
			<h2>📊 Sources de données</h2>
			<p>
				Les données de marée sont obtenues via des APIs gratuites. En cas d'indisponibilité 
				de l'API, l'application utilise des données simulées réalistes basées sur les 
				cycles de marée semi-diurnes typiques des côtes françaises.
			</p>
		</section>
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background: linear-gradient(135deg, #4A90E2 0%, #7B68EE 100%);
		min-height: 100vh;
		color: #333;
	}

	main {
		max-width: 1000px;
		margin: 0 auto;
		padding: 20px;
	}

	header {
		text-align: center;
		color: white;
		margin-bottom: 2rem;
	}

	header h1 {
		font-size: 2.5rem;
		margin: 0 0 1rem 0;
		text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
	}

	.back-link {
		color: white;
		text-decoration: none;
		padding: 0.5rem 1rem;
		background: rgba(255,255,255,0.2);
		border-radius: 20px;
		transition: background-color 0.3s ease;
	}

	.back-link:hover {
		background: rgba(255,255,255,0.3);
	}

	.container {
		background: white;
		border-radius: 15px;
		padding: 2rem;
		box-shadow: 0 10px 30px rgba(0,0,0,0.2);
	}

	section {
		margin-bottom: 2rem;
	}

	section:last-child {
		margin-bottom: 0;
	}

	h2 {
		color: #4A90E2;
		margin-bottom: 1rem;
	}

	.intro p {
		font-size: 1.1rem;
		line-height: 1.6;
		color: #555;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-top: 1rem;
	}

	.feature {
		background: #f8f9fa;
		padding: 1.5rem;
		border-radius: 12px;
		text-align: center;
		transition: transform 0.3s ease;
	}

	.feature:hover {
		transform: translateY(-5px);
	}

	.feature-icon {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.feature h3 {
		color: #4A90E2;
		margin-bottom: 0.5rem;
	}

	.feature p {
		color: #666;
		line-height: 1.5;
		margin: 0;
	}

	.tech-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.tech-item {
		background: #4A90E2;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: bold;
	}

	.disclaimer {
		background: #fff3cd;
		border: 1px solid #ffeaa7;
		border-radius: 8px;
		padding: 1.5rem;
	}

	.disclaimer h2 {
		color: #856404;
		margin-top: 0;
	}

	.disclaimer p {
		color: #856404;
		margin: 0;
		line-height: 1.5;
	}

	.data-sources {
		background: #e9ecef;
		border-radius: 8px;
		padding: 1.5rem;
	}

	.data-sources h2 {
		margin-top: 0;
	}

	.data-sources p {
		color: #555;
		margin: 0;
		line-height: 1.5;
	}

	@media (max-width: 768px) {
		main {
			padding: 10px;
		}

		header h1 {
			font-size: 2rem;
		}

		.container {
			padding: 1rem;
		}

		.features-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
