# 🏄‍♂️ Surf Report PWA

Une Progressive Web App (PWA) gratuite et moderne pour consulter les horaires de marées des principales plages de surf françaises.

## ✨ Fonctionnalités

- 🏖️ **Plages populaires** : Accès aux données de marée des spots de surf les plus prisés de France
- ⏰ **Horaires précis** : Consultez les heures exactes des marées hautes et basses
- 🏄‍♀️ **Conseils de surf** : Recommandations adaptées selon les conditions de marée
- 📱 **PWA** : Installation possible sur votre téléphone comme une app native
- 🔄 **Mise à jour automatique** : Données actualisées automatiquement toutes les 30 minutes
- 💰 **100% Gratuit** : Aucun coût, aucune inscription, aucune publicité
- 🌐 **Fonctionne hors ligne** : Cache intelligent pour consulter les dernières données

## 🏖️ Plages disponibles

### Pays Basque
- Biarritz - Grande Plage
- Anglet - Chambre d'Amour
- Bidart

### Landes
- Hossegor - La Centrale
- Capbreton
- Seignosse
- Les Estagnots

### Gironde
- Lacanau Océan

### Bretagne
- La Torche
- Guidel

## 🛠️ Technologies utilisées

- **Frontend** : Svelte + SvelteKit
- **Langage** : TypeScript
- **PWA** : Service Worker, Manifest
- **Build** : Vite
- **APIs** : WorldTides (fallback sur données simulées)

## 🚀 Installation et développement

### Prérequis
- Node.js 18+ 
- npm

### Installation
```bash
# Cloner le repository
git clone <votre-repo>
cd surf_report

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version production
npm run preview
```

### Build Windows
```bash
# Utiliser le script de build automatique
build.bat
```

## 📱 Installation comme PWA

1. Ouvrez l'application dans votre navigateur
2. Recherchez l'option "Installer l'application" ou "Ajouter à l'écran d'accueil"
3. Suivez les instructions de votre navigateur
4. L'application sera disponible comme une app native sur votre appareil

## 📊 Sources de données

Les données de marée sont obtenues via :
1. **API WorldTides** (version gratuite/démo)
2. **Fallback** : Données simulées réalistes basées sur les cycles de marée semi-diurnes

En cas d'indisponibilité de l'API, l'application génère automatiquement des données de marée simulées qui respectent les cycles naturels des marées françaises.

## ⚠️ Avertissement sécurité

**Cette application est à des fins informatives uniquement.**

Les conditions de surf dépendent de nombreux facteurs :
- Hauteur et période des vagues
- Direction et force du vent
- Courants marins
- Conditions météorologiques

**Toujours vérifier :**
- Les conditions locales en temps réel
- Votre niveau de surf
- Les consignes de sécurité
- Les réglementations locales

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Ajouter de nouvelles plages
- Améliorer la documentation

## 📄 Licence

Ce projet est open source et gratuit d'utilisation.

## 🔮 Roadmap

- [ ] Ajout de prévisions météo
- [ ] Notifications push pour les conditions optimales
- [ ] Mode sombre
- [ ] Géolocalisation automatique
- [ ] Historique des sessions
- [ ] Partage de spots
- [ ] Webcams en temps réel

---

Made with 🌊 for the French surf community

