# Site officiel — Association Elykia
**"Une famille pour ceux qui en ont besoin"**  
Pointe-Noire, République du Congo

---

## Structure des fichiers

```
elykia/
├── index.html               ← Accueil
├── a-propos.html            ← À propos : histoire, vision, mission, présidente, équipe
├── programmes.html          ← Nos programmes : éducation, humanitaire, social, autonomisation
├── realisations.html        ← Nos réalisations : actions passées, photos et bilans
├── evenements.html          ← Nos événements : concert, Grande Célébration 2027
├── partenaires.html         ← Devenir partenaire : formules, dossier PDF, besoins
├── transparence.html        ← Transparence : documents officiels, rapports, bilans
├── don.html                 ← Faire un don
├── contact.html             ← Contact & bénévolat
│
├── assets/
│   ├── css/
│   │   ├── variables.css    ← Couleurs, typos, espacements
│   │   ├── base.css         ← Reset et typographie globale
│   │   ├── components.css   ← Boutons, cartes, documents, événements, dons
│   │   ├── layout.css       ← Header, menu déroulant, footer, grilles, hero
│   │   └── animations.css   ← Transitions et scroll-reveal
│   │
│   ├── js/
│   │   ├── main.js          ← Navigation, menu burger, menu déroulant, compte à rebours
│   │   ├── gallery.js       ← Galerie + lightbox
│   │   ├── counter.js       ← Compteurs animés
│   │   └── form.js          ← Validation formulaires
│   │
│   ├── docs/                ← Vos PDF : statuts, rapports, dossier de sponsoring
│   │
│   └── images/
│       ├── logo.png          ← Logo officiel Elykia
│       ├── hero-garden.svg   ← Feuillage décoratif de la page d'accueil
│       ├── favicon-*.png     ← Icônes du site (voir § 8 ter)
│       ├── hero-bg.jpg       ← Image bannière de la page d'accueil
│       ├── gallery/          ← Vos photos d'actions
│       └── team/             ← Photos de l'équipe (dont presidente.jpg)
│
├── tools/
│   └── generer-feuillage.py ← Redessine hero-garden.svg (voir § 5)
│
├── favicon.ico
└── README.md
```

---

## Plan du site

| Page | Fichier | Contenu |
|---|---|---|
| Accueil | `index.html` | Hero, chiffres, programmes, preuves, événement phare |
| À propos d'Elykia | `a-propos.html` | Histoire, vision, mission, valeurs, présidente, équipe |
| Nos programmes | `programmes.html` | Éducation, aide humanitaire, action sociale, autonomisation |
| Nos réalisations | `realisations.html` | Chiffres, actions passées, galerie photos, bilans |
| Nos événements | `evenements.html` | Grande Célébration 2027, concert, initiatives de l'année |
| Devenir partenaire | `partenaires.html` | Formules, tableau comparatif, besoins, dossier de sponsoring |
| Transparence | `transparence.html` | Documents officiels, rapports d'activité, bilans financiers |
| Faire un don | `don.html` | Impact des montants, moyens de don, dons en nature, engagements |
| Contact | `contact.html` | Coordonnées, candidature bénévole, formulaire de contact |

Dans la barre de navigation, les trois pages **Programmes / Réalisations / Événements** sont
regroupées sous le menu déroulant **« Notre action »** — neuf entrées à plat ne tiennent pas
dans une barre horizontale. Le pied de page, lui, liste les neuf pages.

**Si vous renommez ou ajoutez une page**, pensez à mettre à jour&nbsp;:
le `<nav class="site-nav">` **et** le `<div class="footer-grid footer-grid-4">` de **chaque**
fichier HTML — ces deux blocs sont volontairement identiques partout.

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

Sauvegardez — la galerie de `realisations.html` se met à jour automatiquement au prochain chargement de la page.

---

### 2. Modifier les chiffres d'impact

Les compteurs animés apparaissent sur `index.html` et `realisations.html`.
Cherchez les attributs `data-target` et changez simplement le chiffre :

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

**Email :** l'adresse en place sur tout le site est `wenceslasbouity92@gmail.com` —
celle du responsable de la plateforme, qui reçoit les messages et les transmet au bureau.
Pour en changer, remplacez-la dans les 9 pages HTML (liens `mailto:` et pied de page), puis
adaptez la mention sous l'email dans `contact.html`.  
**WhatsApp :** le numéro de la présidente est déjà en place sur toutes les pages
(`https://wa.me/242068293933`, soit +242 06 829 3933). Pour en changer, remplacez-le
partout — il apparaît dans les boutons WhatsApp, l'icône flottante et le pied de page.

**Téléphone :** `tel:+242068293933` dans `contact.html` et dans le pied de page de chaque page.

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
La grille affiche quatre cartes par ligne et centre automatiquement la dernière ligne quand
elle est incomplète — aucun réglage à faire, quel que soit le nombre de membres.

Photos actuellement en place dans `assets/images/team/` :

| Fichier | Membre | Rôle |
|---|---|---|
| `presidente.jpg` *(à ajouter)* | — | Présidente et fondatrice |
| `dan-carel.jpeg` | Dan Carel | Vice-président |
| `naholie-mbenze.jpeg` | Naholie MBENZE | Secrétaire générale |
| `dailey-medzelo.jpeg` | Dailey MEDZELO | Trésorier |
| `junior-hubert.jpeg` | Junior HUBERT | Responsable des activités |
| `benjamin-gnina.jpeg` | Benjamin GNINA | Responsable de la communication |
| `wenceslas-bouity.jpeg` | Wenceslas BOUITY | Responsable informatique |
| `henoc-ngoma.jpeg` | Henoc NGOMA | Responsable des programmes et actions sociales |
| `premice-apoyolo.jpeg` | Prémice APOYOLO | Responsable des médias |

Évitez les espaces et les accents dans les noms de fichiers : ils compliquent les URL une
fois le site en ligne.

La photo de la présidente apparaît à **deux endroits** de `a-propos.html` :
dans la section « Le mot de la présidente » (`id="presidente"`) et dans la grille d'équipe.
Les deux pointent vers `assets/images/team/presidente.jpg`.

---

### 4 bis. Personnaliser le mot de la présidente

Dans `a-propos.html`, section `id="presidente"` : remplacez la citation entre guillemets,
le texte marqué `[Message de la présidente à personnaliser.]` et le bloc de signature
`[Prénom Nom]`.

---

### 5. Le décor du hero (page d'accueil)

Le grand bandeau d'accueil n'utilise **aucune photo** : tout est dessiné, donc net sur tous les
écrans et léger à charger. Il est composé de six couches, de l'arrière vers l'avant :

| Couche | Rôle | Où la modifier |
|---|---|---|
| `.hero-bg` | dégradés : aube dorée en haut, vert profond, lueur chaude à l'horizon | `layout.css` |
| `.hero-rays` | rayons de soleil (rotation très lente) | `layout.css` |
| `.hero-glow` | halo doré derrière le logo (respiration lente) | `layout.css` |
| `.hero-overlay` | voile sombre général | `layout.css` |
| `.hero-foliage` | palmes, lianes et fleurs | `assets/images/hero-garden.svg` |
| `.hero-sparkles` | lucioles dorées | `layout.css` |

**Changer les couleurs** : tout part des dégradés de `.hero-bg`. Pour un décor plus clair,
augmentez les pourcentages d'opacité des `radial-gradient` dorés.

**Changer le feuillage** : `assets/images/hero-garden.svg` est un SVG ordinaire, modifiable
dans n'importe quel éditeur vectoriel (Figma, Illustrator, Inkscape). Les quatre plans de
palmes y sont rangés dans des groupes séparés, du plus lointain au plus proche.

Il a été dessiné par un script, conservé dans `tools/generer-feuillage.py`. Pour obtenir une
autre composition (densité, hauteurs, couleurs, nombre de fleurs), modifiez les paramètres en
bas du fichier puis relancez :

```bash
python tools/generer-feuillage.py
```

Changer la valeur de `random.seed(7)` suffit à tirer un jardin entièrement différent.

**Remettre une photo** : ajoutez `url('../images/hero-bg.jpg')` en première valeur de
`background-image` dans `.hero-bg`, et retirez `.hero-foliage` du HTML si elle fait doublon.
Recommandation : image ≥ 1920×1080 px, optimisée (< 500 Ko).

**Animations** : elles s'arrêtent automatiquement si le visiteur a activé « réduire les
animations » dans son système.

---

### 6. Modifier le compte à rebours

Deux comptes à rebours pointent vers le **concert du 22 novembre 2026** :

- `index.html`, section « Projet vedette »
- `evenements.html`, section `id="concert"`

La date se change directement dans le HTML :

```html
<div class="countdown" data-date="2026-11-22"></div>
<!-- format : 'AAAA-MM-JJ' -->
```

**La Grande Célébration 2027 n'a pas de compte à rebours** : seule l'année est connue, et un
compteur exige une date exacte. Dès que le jour sera fixé, un commentaire HTML dans
`evenements.html` (section `id="celebration"`) indique le bloc à remettre en place.

Sans attribut `data-date`, un compteur utilise la date par défaut définie en haut de
`assets/js/main.js` :

```js
const DEFAULT_EVENT_DATE = '2027-09-04';
```

---

### 7. Ajouter une nouvelle page

1. Dupliquez `contact.html` et renommez-la (ex : `nouveaute.html`)
2. Modifiez le contenu `<main>` de la nouvelle page
3. Dans le `<nav class="site-nav">` de **toutes les pages HTML**, ajoutez le lien :

```html
<a href="nouveaute.html" class="nav-link">Nouveauté</a>
```

Pour l'ajouter plutôt dans le menu déroulant « Notre action », insérez-le dans
`<div class="nav-dropdown">` :

```html
<a href="nouveaute.html">Nouveauté<span>Courte description</span></a>
```

4. Ajoutez-le aussi dans le `footer-grid` de toutes les pages (colonne « Découvrir »
   ou « S'engager »).

---

### 8. Mettre à jour les liens réseaux sociaux

Quatre icônes sont en place : **Facebook, Instagram, TikTok et WhatsApp** (logos officiels en
SVG, dans le pied de page des 9 pages et dans `contact.html`).

| Réseau | Lien |
|---|---|
| TikTok | `https://www.tiktok.com/@elykia00` ✅ |
| WhatsApp | `https://wa.me/242068293933` ✅ |
| Facebook | `href="#"` — à renseigner |
| Instagram | `href="#"` — à renseigner |

Cherchez les `href="#"` restants et remplacez-les par vos URL :

```html
<a href="https://facebook.com/elykia" class="social-link" aria-label="Facebook">
<a href="https://instagram.com/elykia" class="social-link" aria-label="Instagram">
```

Sur fond clair (page Contact), les icônes portent en plus la classe `social-link-light`.

---

### 8 ter. Le favicon

L'icône du site est découpée dans le **E** du logo `assets/images/ell.png` :

```
favicon.ico                      ← racine du site (16, 32 et 48 px)
assets/images/favicon-32.png     ← onglet navigateur
assets/images/favicon-180.png    ← écran d'accueil iPhone / iPad
assets/images/favicon-192.png    ← écran d'accueil Android
```

Pour la régénérer à partir d'une autre image (ffmpeg requis) :

```bash
ffmpeg -i assets/images/ell.png -vf "crop=145:145:300:178,scale=32:32:flags=lanczos" assets/images/favicon-32.png
```

Les balises correspondantes sont dans le `<head>` de chaque page, juste sous la balise
`viewport`, avec la couleur de thème mobile (`theme-color`).

---

### 8 bis. Réception des formulaires (Formspree)

Les deux formulaires de `contact.html` (candidature bénévole et contact général) envoient
leurs messages via **Formspree**, sans serveur à gérer :

```html
<form data-elykia-form action="https://formspree.io/f/xoejpawl" method="POST" ...>
```

- Les messages arrivent sur l'adresse du compte Formspree
  (aujourd'hui `wenceslasbouity92@gmail.com`).
- L'envoi se fait en arrière-plan : le visiteur reste sur la page et voit le message de
  confirmation. En cas d'échec, un encart rouge propose l'email et WhatsApp.
- Le champ caché `_subject` définit l'objet du mail reçu ; le champ caché `_gotcha` est un
  piège anti-spam (laissé vide par les humains, rempli par les robots).
- Le champ `email` du formulaire sert d'adresse de réponse : un simple « Répondre » suffit.

**Pour changer de destinataire**, créez un formulaire sur [formspree.io](https://formspree.io)
et remplacez l'URL dans les deux attributs `action` de `contact.html`.

**Premier message** : Formspree demande une confirmation par email avant d'activer un
nouveau formulaire — envoyez-vous un message de test dès la mise en ligne.

---

### 9. Publier un document PDF (transparence, dossier de sponsoring)

**Étape 1** — Déposez le fichier dans `assets/docs/`, par exemple :
```
assets/docs/elykia-statuts.pdf
assets/docs/elykia-dossier-sponsoring.pdf
```

**Étape 2** — Dans `transparence.html` (ou `partenaires.html`, section `id="dossier"`),
chaque carte de document contient un commentaire HTML indiquant le bouton de remplacement.
Remplacez le bouton « Demander » par :

```html
<a href="assets/docs/elykia-statuts.pdf" class="btn btn-secondary btn-sm" download>
  Télécharger<i data-lucide="download"></i>
</a>
```

**Étape 3** — Mettez à jour la mention `Sur demande` / `En cours de rédaction` du bloc
`doc-meta` juste au-dessus (par exemple : `Mis à jour en janvier 2027`).

Tant qu'aucun PDF n'est en ligne, les boutons ouvrent un email pré-rempli vers
`wenceslasbouity92@gmail.com` : rien n'est cassé, le document est simplement envoyé à la demande.

---

### 10. Éléments à compléter avant mise en ligne

Cherchez les crochets `[...]` dans les fichiers HTML — ils marquent les informations
encore manquantes :

- `don.html` — numéro Mobile Money, coordonnées bancaires (le numéro de la présidente,
  +242 06 829 3933, sert déjà au téléphone et à WhatsApp — précisez s'il vaut aussi pour
  le Mobile Money)
- `a-propos.html` — nom de la présidente et son message
- `realisations.html` — date d'arrêté des chiffres
- `evenements.html` — date de la Grande Célébration 2027 (seule l'année est connue ;
  voir §6), salle et programmation du concert du 22 novembre 2026, visuel
  `assets/images/gallery/concert.jpg`
- Toutes les pages — liens Facebook et Instagram (`href="#"`) ; une adresse email propre à l'association
  (type `contact@elykia.org`) remplacera à terme celle du responsable de la plateforme

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
