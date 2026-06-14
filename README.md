# Site officiel — Association Elykia
**"Une famille pour ceux qui en ont besoin"**  
Pointe-Noire, République du Congo

---

## Structure des fichiers

```
elykia/
├── index.html               ← Page d'accueil
├── a-propos.html            ← À propos / identité
├── actions.html             ← Nos actions & projets
├── partenaires.html         ← Devenir partenaire
├── galerie.html             ← Galerie photos
├── contact.html             ← Contact & bénévolat
│
├── assets/
│   ├── css/
│   │   ├── variables.css    ← Couleurs, typos, espacements
│   │   ├── base.css         ← Reset et typographie globale
│   │   ├── components.css   ← Boutons, cartes, formulaires
│   │   ├── layout.css       ← Header, footer, grilles, hero
│   │   └── animations.css   ← Transitions et scroll-reveal
│   │
│   ├── js/
│   │   ├── main.js          ← Navigation, menu burger, scroll
│   │   ├── gallery.js       ← Galerie + lightbox
│   │   ├── counter.js       ← Compteurs animés
│   │   └── form.js          ← Validation formulaires
│   │
│   └── images/
│       ├── logo.png          ← Logo officiel Elykia (à placer ici)
│       ├── hero-bg.jpg       ← Image bannière de la page d'accueil
│       ├── gallery/          ← Vos photos d'actions
│       └── team/             ← Photos de l'équipe
│
└── README.md
```

---

## Guide de mise à jour

### 1. Ajouter une photo à la galerie

**Étape 1** — Copiez votre fichier `.jpg` ou `.png` dans le dossier :
```
assets/images/gallery/
```

**Étape 2** — Ouvrez le fichier `assets/js/gallery.js` et ajoutez votre photo dans le tableau `photos` (au début du fichier) :

```js
const photos = [
  { src: "assets/images/gallery/ma-photo.jpg", caption: "Description de la photo" },
  { src: "assets/images/gallery/photo-02.jpg", caption: "Autre description" },
];
```

Sauvegardez — la galerie se met à jour automatiquement au prochain chargement de la page.

---

### 2. Modifier les chiffres d'impact (page d'accueil)

Ouvrez `index.html` et cherchez les attributs `data-target`. Changez simplement le chiffre :

```html
<!-- Exemple : passer de 300 à 450 kits -->
<div class="impact-number" data-target="450">0</div>
```

---

### 3. Modifier les coordonnées contact

Les coordonnées apparaissent dans deux endroits :
- `contact.html` — section "Nos coordonnées"
- Footer de chaque page HTML

Cherchez les textes entre crochets `[zone à remplir]` et remplacez-les par vos vraies informations.

**Email :** cherchez `contact@elykia.org` et remplacez par votre email réel.  
**WhatsApp :** cherchez `https://wa.me/` et remplacez par votre numéro au format international, ex : `https://wa.me/242060000000`

---

### 4. Ajouter une photo de l'équipe

**Étape 1** — Placez la photo dans `assets/images/team/`

**Étape 2** — Dans `a-propos.html`, trouvez la carte du membre et modifiez :

```html
<div class="team-card">
  <div class="team-photo image-zone">
    <!-- Remplacez par le bon chemin et le bon nom : -->
    <img src="assets/images/team/prenom-nom.jpg" alt="Prénom Nom">
  </div>
  <div class="team-info">
    <h4>Prénom Nom</h4>
    <p>Son rôle dans l'association</p>
  </div>
</div>
```

Pour ajouter un membre supplémentaire, copiez-collez une `team-card` complète et adaptez.

---

### 5. Changer l'image de fond du hero

Remplacez le fichier `assets/images/hero-bg.jpg` par votre propre image (gardez le même nom de fichier, ou modifiez la référence dans `assets/css/layout.css` dans la règle `.hero-bg`).

Recommandation : image ≥ 1920×1080px, optimisée (< 500 Ko).

---

### 6. Modifier le compte à rebours

Le compte à rebours pointe vers le **6 septembre 2026**. Pour changer la date cible, ouvrez `assets/js/main.js` et modifiez :

```js
const target = new Date('2026-09-06T00:00:00').getTime();
// Remplacez par votre date, format : 'AAAA-MM-JJ'
```

---

### 7. Ajouter une nouvelle page

1. Dupliquez `contact.html` et renommez-la (ex : `nouveaute.html`)
2. Modifiez le contenu `<main>` de la nouvelle page
3. Dans le `<nav>` de **toutes les pages HTML**, ajoutez le lien :

```html
<a href="nouveaute.html" class="nav-link">Nouveauté</a>
```

---

### 8. Mettre à jour les liens réseaux sociaux

Dans chaque footer de page HTML, cherchez :

```html
<a href="#" aria-label="Facebook">📘</a>
<a href="#" aria-label="Instagram">📸</a>
```

Remplacez `#` par l'URL de votre page (ex : `https://facebook.com/elykia`).

---

## Déploiement

Le site est **100% statique** — aucun serveur requis.

### Option A — GitHub Pages (gratuit)
1. Créez un dépôt GitHub
2. Uploadez tous les fichiers à la racine
3. Activez GitHub Pages dans les réglages du dépôt
4. Votre site est en ligne sur `https://votre-pseudo.github.io/elykia/`

### Option B — Netlify (gratuit)
1. Allez sur [netlify.com](https://netlify.com)
2. Glissez-déposez le dossier `Elykia site officiel` dans l'interface
3. Votre site est en ligne instantanément

### Option C — Local (pour tester)
Double-cliquez simplement sur `index.html` pour ouvrir le site dans votre navigateur.

---

## Compatibilité navigateurs

- Chrome / Edge (2 dernières versions) ✅
- Firefox (2 dernières versions) ✅
- Safari macOS / iOS ✅
- Chrome Android ✅

## Performance

- Zéro dépendance JavaScript externe
- Google Fonts uniquement (chargement asynchrone)
- Images avec `loading="lazy"` pour les performances
- Score Lighthouse visé : > 90/100

---

*Association Elykia — "Une famille pour ceux qui en ont besoin"*
