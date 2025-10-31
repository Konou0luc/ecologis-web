# 🌐 Site Web Ecopower

Site de présentation officiel de l'application Ecopower - Solution de gestion de consommation électrique.

## 🎨 Design

### Palette de Couleurs
- **Orange Principal**: `#FFA800`
- **Orange Foncé**: `#E69500`
- **Gris Foncé**: `#262626`
- **Jaune Accent**: `#FFD700`
- **Vert Succès**: `#4CAF50`
- **Bleu Info**: `#2196F3`

### Typographie
- **Police**: Inter (Google Fonts)
- **Tailles Responsive**: Utilisation de `clamp()` pour une adaptation fluide

## 📱 Responsive Design

Le site est optimisé pour tous les appareils :

### 📱 Mobile (< 640px)
- Layout en colonne unique
- Boutons pleine largeur
- Texte et espacements adaptés
- Touch targets optimisés (44px minimum)

### 📱 Tablette (640px - 1023px)
- Grids en 2 colonnes
- Navigation desktop activée à partir de 768px
- Espacement intermédiaire

### 💻 Desktop (≥ 1024px)
- Layout en 2 colonnes pour le hero
- Grids en 3 colonnes pour les features
- Espacements généreux
- Effets hover enrichis

## 🚀 Démarrage

### Installation

```bash
npm install
```

### Développement

```bash
npm start
```

Le site sera accessible sur `http://localhost:3000`

### Build Production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `build/`

## 📦 Structure

```
ecopower-website/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   ├── Benefits.tsx
│   │   └── Footer.tsx
│   ├── App.tsx
│   └── index.css
├── package.json
└── README.md
```

## ✨ Fonctionnalités

### Sections
1. **Hero** - Présentation principale avec CTA
2. **Features** - 9 fonctionnalités détaillées
3. **Pricing** - 3 plans d'abonnement (Basic, Premium, Enterprise)
4. **Benefits** - Avantages et statistiques
5. **Footer** - Liens et contact

### Caractéristiques Techniques
- ✅ 100% Responsive
- ✅ Animations fluides
- ✅ Accessibilité (WCAG 2.1)
- ✅ Performance optimisée
- ✅ SEO-friendly
- ✅ Cross-browser compatible

## 🎯 Plans d'Abonnement

### Basic - 500 FCFA/mois
- Jusqu'à 5 résidents
- Génération de factures
- Historique des consommations
- Notifications WhatsApp

### Premium - 1000 FCFA/mois ⭐
- Jusqu'à 15 résidents
- Tout du plan Basic
- Statistiques avancées
- Support prioritaire 24/7

### Enterprise - 2000 FCFA/mois
- Jusqu'à 50 résidents
- Tout du plan Premium
- API personnalisée
- Formation dédiée

## 🌓 Thème Clair/Sombre

Le site dispose d'un système de thème complet :

### Fonctionnalités
- ✅ Détection automatique de la préférence système
- ✅ Sauvegarde dans localStorage
- ✅ Bouton de basculement (visible desktop + mobile)
- ✅ Transitions fluides (0.3s)
- ✅ Meta theme-color pour mobile

### Palette Thème Sombre
- Fond principal : `#0f0f0f`
- Fond secondaire : `#1a1a1a`
- Texte principal : `#FFFFFF`
- Texte secondaire : `#CCCCCC`
- Bordures : `#333333`
- Accent : `#FFA800` (orange)

### Contraste
Tous les éléments respectent les normes WCAG 2.1 :
- Titres : Contraste AAA
- Textes : Contraste AA minimum
- Boutons : Contraste AAA

## 🔧 Technologies

- **React** 18.x
- **TypeScript**
- **CSS3** (avec CSS Variables et Clamp)
- **Lucide React** (Icônes)
- **Context API** (Gestion du thème)

## 📊 Performance

- ⚡ First Contentful Paint < 1.5s
- ⚡ Largest Contentful Paint < 2.5s
- ⚡ Time to Interactive < 3.5s
- ✅ Mobile-friendly score > 95
- ✅ Accessibility score > 90

## 🌐 Compatibilité Navigateurs

- ✅ Chrome (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (dernières versions)
- ✅ Edge (dernières versions)
- ✅ iOS Safari
- ✅ Chrome Android

## 📝 Licence

© 2025 Ecopower. Tous droits réservés.

## 📞 Contact

- **Email**: contact@ecopower.tg
- **Téléphone**: (+228) 98 75 45 25 / 96 18 59 19
- **Adresse**: Lomé, Togo

---

Développé avec ❤️ pour Ecopower
